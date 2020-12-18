import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { CheckBox, Icon } from 'react-native-elements';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import TasksContainerStyles from './TasksContainerStyles';
import api from '../../services/api';

import firestore from '@react-native-firebase/firestore';
const tasksCollection = firestore().collection('Tasks');

let timer;


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
        console.log("o id do usuário: ", id);
        let newTasks = [];
        await tasksCollection.where('userId', '==', id)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                  console.log('No matching documents.');
                  return;
                }
                snapshot.forEach(doc => {
                  //console.log(doc.id, '=>', doc.data());
                  newTasks.push({...doc.data(), id:doc.id});
                });
              })
            .catch(err => {
                console.log('Error getting documents', err);
            }
        );
        setTasks(newTasks);
        // await api.get('/tasks', { params: { userId: id } })
        //     .then(response => {
        //         setTasks(response.data);
        //     })
        //     .catch((err) => {
        //         console.error("Ops! Ocorreu um erro" + err);
        //     });
    };

    useFocusEffect(
        React.useCallback(() => {
            loadTasks();
            return () => {
            };
        }, [])
    );

    const handleSearch = async () => {
        await loadTasks();
        let newTasks = [];
        for(let i in tasks){
            let text = tasks[i].description;
            let exists = text.includes(searchText);
            if(exists){
                newTasks.push(tasks[i]);
            }
        }
        setTasks(newTasks);
    }

    useEffect(()=>{
        if(timer){
            clearTimeout(timer);
        }

        timer = setTimeout(handleSearch, 2000);
    }, [searchText]);

    const handleSearchTextChange = (text) => {
        setSearchText(text);
        // api.get('/searchTask', { params: { keywords: text, userId: id } })
        //     .then(response => {
        //         setTasks(response.data);
        //     })
        //     .catch((err) => {
        //         console.error("Ops! Ocorreu um erro" + err);
        //     });
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
      
        await tasksCollection.doc(tasks[index].id).delete().then(()=>console.log('Task concluída')).catch((err)=>Alert.alert('ERROR', err));
        loadTasks();
     
        // var newTasks = [...tasks];
        // var { _id } = newTasks[index];

        // await api.delete('/deleteTask', { data: { taskId: _id } }).then((res) => {

        // });
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

                                <Text style={{marginRight: 35, textDecorationLine: task.done ? 'line-through' : 'none' }}>{task.description}</Text>
                            </View>

                            <View style={[TasksContainerStyles.priorityBar, { backgroundColor: colors[task.priority] }]}>
                            </View>
                            <Icon type="ionicon" 
                            iconStyle={{ color: "black", marginLeft: 15}} 
                            name="create-outline" 
                            onPress={() => {
                                navigation.navigate('Edit task', { tasks: tasks, task: tasks[index], userId: id })
                            }}/>
                        </View>
                    ))}

            </ScrollView>
            <TouchableOpacity style={TasksContainerStyles.floatingButton} onPress={() => {
                navigation.navigate('Add task', { tasks: tasks, userId: id })
            }}>
                <Icon type="ionicon" name="add-outline" iconStyle={TasksContainerStyles.textFloatingButton} />
            </TouchableOpacity>
        </View >
    )
}

export default TasksContainer;