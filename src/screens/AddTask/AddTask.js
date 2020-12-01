import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import AddTaskStyles from './AddTaskStyles';
import api from '../../services/api';

const AddTask: () => React$Node = ({ route, navigation }) => {
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState('low');
    const [bgPriorityBtColor, setBgPriorityBtColor] = useState({
        "low": "",
        "medium": "",
        "high": "",
    });
    const [textsPriorityBtColor, setTextsPriorityBtColor] = useState({
        "low": "#ede615",
        "medium": "#fdaf3d",
        "high": "#e76256",
    });
    const colors = {
        "low": "#ede615",
        "medium": "#fdaf3d",
        "high": "#e76256",
    };

    const { tasks, userId } = route.params;
   
    const handleOnAddTaskBtPress = async () => {
        for (var task in tasks) {
            if (tasks[task].description.toLowerCase() == taskDescription.toLowerCase()) {
                Alert.alert(
                    "Error",
                    "Task already exists!",
                    [
                        { text: "OK" }
                    ],
                    { cancelable: false }
                );
                return;
            }
        };

        var newTask = {
            userId: userId,
            description: taskDescription,
            priority: taskPriority,
            done: false,
        };

        await api.post('/addTask', newTask).then((response) => {

        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });

        setTaskDescription('');
        navigation.navigate("Tasks");
    };

    const handlePriorityBtPress = (colorPriority) => {
        var buttonsBgs = { ...bgPriorityBtColor };
        var textColors = { ...textsPriorityBtColor };

        for (var color in buttonsBgs) {
            buttonsBgs[color] = "#fff";
        }

        buttonsBgs[colorPriority] = colors[colorPriority];
        setBgPriorityBtColor(buttonsBgs);

        for (var color in textColors) {
            if (textColors[color] == "#fff" && buttonsBgs[color] == "#fff") {
                textColors[color] = colors[color];
            }
        }

        textColors[colorPriority] = "#fff";
        setTextsPriorityBtColor(textColors);
        setTaskPriority(colorPriority);

    };

    return (
        <View style={AddTaskStyles.mainContainer}>
            <View style={AddTaskStyles.elementsContainer}>
                <View style={AddTaskStyles.searchContainer}>
                    <TextInput value={taskDescription} onChangeText={text => setTaskDescription(text)} placeholder="Task name" style={AddTaskStyles.searchInput} />
                    <Icon type="ionicon" name="add-circle-outline" style={AddTaskStyles.btAddTask} onPress={() => handleOnAddTaskBtPress()} />
                </View>

                <View style={AddTaskStyles.containerPriority}>
                    <TouchableOpacity style={[AddTaskStyles.buttonPriority, { backgroundColor: bgPriorityBtColor.low }]} onPress={() => handlePriorityBtPress("low")}>
                        <Text style={{ color: textsPriorityBtColor.low, fontSize: 14 }}>Low</Text>
                    </TouchableOpacity>

                    <View style={AddTaskStyles.borderButtonPriority}></View>

                    <TouchableOpacity style={[AddTaskStyles.buttonPriority, { backgroundColor: bgPriorityBtColor.medium }]} onPress={() => handlePriorityBtPress("medium")}>
                        <Text style={{ color: textsPriorityBtColor.medium, fontSize: 14 }}>Medium</Text>
                    </TouchableOpacity>

                    <View style={AddTaskStyles.borderButtonPriority}></View>
                    <TouchableOpacity style={[AddTaskStyles.buttonPriority, { backgroundColor : bgPriorityBtColor.high }]} onPress={() => handlePriorityBtPress("high")}>
                        <Text style={{ color: textsPriorityBtColor.high, fontSize: 14 }}>High</Text>
                    </TouchableOpacity>
                </View>

            </View>


        </View>
    )
};

export default AddTask;