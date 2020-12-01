import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { CheckBox, Icon } from 'react-native-elements';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import TasksContainerStyles from './TasksContainerStyles';
import api from '../../services/api';

const TasksContainer = (props) => {
    const [tasks, setTasks] = useState([]);
    const [searchText, setSearchText] = useState('');

    const colors = {
        "low": "#f7e90c",
        "medium": "#fdaf3d",
        "high": "#f54433"
    };

    const { navigation } = props;
    const id = props.userId;

    async function loadTasks() {
        console.log("o id do usuário: ", id)
        await api.get('/tasks', { params: { userId: id } })
            .then(response => {
                setTasks(response.data);
            })
            .catch((err) => {
                console.error("Ops! Ocorreu um erro" + err);
            });
    };

    useFocusEffect(
        React.useCallback(() => {
            loadTasks();
            return () => {
            };
        }, [])
    );

    const handleSearchTextChange = (text) => {
        setSearchText(text);
        api.get('/searchTask', { params: { keywords: text, userId: id } })
            .then(response => {
                setTasks(response.data);
            })
            .catch((err) => {
                console.error("Ops! Ocorreu um erro" + err);
            });
    };

    const handleDeleteTextButtonPress = () => {
        setSearchText('');
        loadTasks();
    };

    const handleTaskDone = async (index) => {
        var newTasks = [...tasks];
        var index = index;

        newTasks[index].done = true;
        setTasks(newTasks);

        function timeout(delay) {
            return new Promise(res => setTimeout(res, delay));

        };
        await timeout(500);

        var newTasks = [...tasks];
        var { _id } = newTasks[index];

        await api.delete('/deleteTask', { data: { taskId: _id } }).then((res) => {

        });
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    return (
        <View style={TasksContainerStyles.mainContainer}>
            <View style={TasksContainerStyles.searchContainer}>
                <TextInput value={searchText} onChangeText={(text) => handleSearchTextChange(text)} placeholder="Search" style={TasksContainerStyles.searchInput} />
                <Icon type="ionicon" size={28} iconStyle={{ color: "#b8bcc2", }} name="close-outline" onPress={() => handleDeleteTextButtonPress()} />
            </View>
            <ScrollView style={TasksContainerStyles.scrollTasksContainer}>
                {
                    tasks.map((task, index) => (
                        <View key={index} style={TasksContainerStyles.containerTask}>
                            <View style={TasksContainerStyles.containerTaskDescription}>
                                <CheckBox
                                    containerStyle={{ margin: 0, padding: 0, marginLeft: 0 }}
                                    checked={task.done}
                                    onPress={() => handleTaskDone(index)}
                                    iconType="ionicon"
                                    uncheckedIcon="ellipse-outline"
                                    checkedIcon="checkmark-outline"
                                    uncheckedColor="#0070c9"
                                    checkedColor="#0070c9"
                                />

                                <Text style={{ textDecorationLine: task.done ? 'line-through' : 'none' }}>{task.description}</Text>
                            </View>

                            <View style={[TasksContainerStyles.priorityBar, { backgroundColor: colors[task.priority] }]}>
                            </View>
                        </View>
                    ))}

            </ScrollView>
            <TouchableOpacity style={TasksContainerStyles.floatingButton} onPress={() => {
                navigation.navigate('Add task', { tasks: tasks, userId: id })
            }}>
                <Icon type="ionicon" name="add-outline" size={34} iconStyle={TasksContainerStyles.textFloatingButton} />
            </TouchableOpacity>
        </View >
    )
}

export default TasksContainer;