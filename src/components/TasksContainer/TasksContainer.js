import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { CheckBox, Icon } from 'react-native-elements';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import TasksContainerStyles from './TasksContainerStyles';
import api from '../../services/api';

const TasksContainer = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);
    const [searchText, setSearchText] = useState('');

    const colors = {
        "low": "#f7e90c",
        "medium": "#fdaf3d",
        "high": "#f54433"
    };

    async function loadTasks() {
        await api.get('/tasks')
            .then(response => {
                setTasks(response.data);
                console.log("setando tarefas: ", console.log)
            })
            .catch((err) => {
                console.error("Ops! Ocorreu um erro" + err);
            });

    };

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            console.log("hook das tarefas");
            loadTasks();
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );

    const handleSearchTextChange = (text) => {
        setSearchText(text);
        api.get('/searchTask', { params: { keywords: text } })
            .then(response => {
                setTasks(response.data);
                console.log("joao")
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
        console.log(index, tasks);
        var newTasks = [...tasks];
        var index = index;
        console.log("endereço/", index);
    
        newTasks[index].done = true;
        console.log(newTasks[index].done)
        setTasks(newTasks);
    
        function timeout(delay) {
          return new Promise(res => setTimeout(res, delay));
    
        };
        await timeout(500);
    
        var newTasks = [...tasks];
        var taskDescription = newTasks[index].description;
    
        await api.post('/deleteTask', { description: taskDescription });
        newTasks.splice(index, 1);
        setTasks(newTasks);
    
    
    
      }
    

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
                navigation.navigate('Add task', { tasks: tasks })
            }}>
                <Icon type="ionicon" name="add-outline" size={34} iconStyle={TasksContainerStyles.textFloatingButton} />
            </TouchableOpacity>
        </View >
    )
}

export default TasksContainer;