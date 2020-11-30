import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { CheckBox, Icon } from 'react-native-elements';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import TasksContainerStyles from './TasksContainerStyles';
import api from '../../services/api';

const TasksContainer = ({ navigation }) => {
    const [tasks, setTasks] = useState([{ description: "New task", priority: "medium" }]);
    const [checked, setChecked] = useState(false);
    const [searchText, setSearchText] = useState('');

    const colors = {
        "low": "#f7e90c",
        "medium": "#ede913",
        "high": "#f54433"
    };

    async function loadTasks() {
        api.get('/tasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch((err) => {
                console.error("Ops! Ocorreu um erro" + err);
            });

    };

    useEffect(() => {
        console.log("Use effect from tasks container...");
        loadTasks();
    }, []);

    const handleSearchTextChange = (text) => {
        setSearchText(text);
        api.get('/searchTask', { params: { keywords: text } })
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
                                    checked={checked}
                                    onPress={() => setChecked(!checked)}
                                    iconType="ionicon"
                                    uncheckedIcon="ellipse-outline"
                                    checkedIcon="checkmark-outline"
                                    uncheckedColor="#0070c9"
                                    checkedColor="#0070c9"
                                />

                                <Text>{task.description}</Text>
                            </View>

                            <View style={[TasksContainerStyles.priorityBar, { backgroundColor: colors[task.priority] }]}>
                            </View>
                        </View>
                    ))}

            </ScrollView>
            <TouchableOpacity style={TasksContainerStyles.floatingButton} onPress={() => {
                navigation.navigate('Add task')
            }}>
                <Icon type="ionicon" name="add-outline" size={34} iconStyle={TasksContainerStyles.textFloatingButton} />
            </TouchableOpacity>
        </View >
    )
}

export default TasksContainer;