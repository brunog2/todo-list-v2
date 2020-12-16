import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import EditTaskStyles from './EditTaskStyles';
import api from '../../services/api';

const EditTask: () => React$Node = ({ route, navigation }) => {
    const { tasks, task, userId } = route.params;
    const colors = {
        "low": "#ede615",
        "medium": "#fdaf3d",
        "high": "#e76256",
    };
    const [taskDescription, setTaskDescription] = useState(task.description);
    const [taskPriority, setTaskPriority] = useState(task.priority);
    const [bgPriorityBtColor, setBgPriorityBtColor] = useState({
        "low": task.priority == "low" ? colors["low"] : "",
        "medium": task.priority == "medium" ? colors["medium"] : "",
        "high": task.priority == "high" ? colors["high"] : "",
    });
    const [textsPriorityBtColor, setTextsPriorityBtColor] = useState({
        "low": task.priority == "low" ? "#fff" : "#ede615",
        "medium": task.priority == "medium" ? "#fff" : "#fdaf3d",
        "high": task.priority == "high" ? "#fff" : "#e76256",
    });

    const handleOnEditTaskBtPress = async () => {
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

        // requisição pra editar tarefa

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
        <View style={EditTaskStyles.mainContainer}>
            <View style={EditTaskStyles.elementsContainer}>
                <View style={EditTaskStyles.addContainer}>
                    <TextInput value={taskDescription} onChangeText={text => setTaskDescription(text)} placeholder="Task name" style={EditTaskStyles.addInput} />
                    <Icon type="ionicon" name="enter-outline" style={EditTaskStyles.btEditTask} onPress={() => handleOnEditTaskBtPress()} />
                </View>

                <View style={EditTaskStyles.containerPriority}>
                    <TouchableOpacity style={[EditTaskStyles.buttonPriority, { backgroundColor: bgPriorityBtColor.low }]} onPress={() => handlePriorityBtPress("low")}>
                        <Text style={{ color: textsPriorityBtColor.low, fontSize: 14 }}>Low</Text>
                    </TouchableOpacity>

                    <View style={EditTaskStyles.borderButtonPriority}></View>

                    <TouchableOpacity style={[EditTaskStyles.buttonPriority, { backgroundColor: bgPriorityBtColor.medium }]} onPress={() => handlePriorityBtPress("medium")}>
                        <Text style={{ color: textsPriorityBtColor.medium, fontSize: 14 }}>Medium</Text>
                    </TouchableOpacity>

                    <View style={EditTaskStyles.borderButtonPriority}></View>
                    <TouchableOpacity style={[EditTaskStyles.buttonPriority, { backgroundColor: bgPriorityBtColor.high }]} onPress={() => handlePriorityBtPress("high")}>
                        <Text style={{ color: textsPriorityBtColor.high, fontSize: 14 }}>High</Text>
                    </TouchableOpacity>
                </View>

            </View>


        </View>
    )
};

export default EditTask;