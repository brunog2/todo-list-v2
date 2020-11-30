import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import PrimaryTextInput from '../../components/UI/PrimaryTextInput/PrimaryTextInput';
import AddTaskStyles from './AddTaskStyles';

const AddTask: () => React$Node = ({ navigation }) => {
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

    };

    return (
        <View style={AddTaskStyles.mainContainer}>
            <View style={AddTaskStyles.elementscontainer}>
                <View style={AddTaskStyles.formContainer}>
                    <PrimaryTextInput style={AddTaskStyles.inputText} placeholder="Task Title"></PrimaryTextInput>
                </View>

                <View style={AddTaskStyles.containerPriority}>
                    <View style={AddTaskStyles.borderButtonPriority}></View>

                    <TouchableOpacity style={[AddTaskStyles.buttonPriority, { backgroundColor: bgPriorityBtColor.low }]} onPress={() => handlePriorityBtPress("low")}>
                        <Text style={{ color: textsPriorityBtColor.low, fontSize: 16 }}>Low</Text>
                    </TouchableOpacity>

                    <View style={AddTaskStyles.borderButtonPriority}></View>

                    <TouchableOpacity style={[AddTaskStyles.buttonPriority, { backgroundColor: bgPriorityBtColor.medium }]} onPress={() => handlePriorityBtPress("medium")}>
                        <Text style={{ color: textsPriorityBtColor.medium, fontSize: 16 }}>Medium</Text>
                    </TouchableOpacity>

                    <View style={AddTaskStyles.borderButtonPriority}></View>
                    <TouchableOpacity style={[AddTaskStyles.buttonPriority, { backgroundColor: bgPriorityBtColor.high }]} onPress={() => handlePriorityBtPress("high")}>
                        <Text style={{ color: textsPriorityBtColor.high, fontSize: 16 }}>High</Text>
                    </TouchableOpacity>

                    <View style={AddTaskStyles.borderButtonPriority}></View>
                </View>
            </View>

            <CustomButton style={AddTaskStyles.btAddTask} text="Add task"
                onPress={() => {
                    navigation.navigate('Tasks')
                }}>
            </CustomButton>
        </View>
    )
};

export default AddTask;