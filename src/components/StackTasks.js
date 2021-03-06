import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import TasksContainer from './TasksContainer/TasksContainer';

const Stack = createStackNavigator();

const StackTasks = (props, { navigation }) => {
    var toggleDrawer = null;

    const id = props.userId;
    
    return (
        <Stack.Navigator>
            <Stack.Screen options={Tasks => {
                toggleDrawer = Tasks.navigation.toggleDrawer
                return {
                    headerTitleAlign: "center",
                    headerTitle: "Tasks",
                    headerLeft: () => <View ><Icon name="menu" size={28} onPress={toggleDrawer} /></View>,
                    headerLeftContainerStyle: { marginLeft: 15 },
                }
            }} name="Tasks" children={(props) => <TasksContainer {...props}  userId={id}/>} >
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default StackTasks;
