import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Icon } from 'react-native-elements';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { ScrollView, View, Text, BackHandler, Alert, SafeAreaView, Dimensions, Image } from 'react-native';
import {
  createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Login/Login';
import TasksStyles from './TasksStyles';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{marginLeft: "auto", marginRight: "auto", justifyContent: "center", height: 120, width: 120, borderColor: "#d9d9d9", borderWidth: 1, borderRadius: 60}}>
        <Text style={{textAlign: "center"}}>Logo here</Text>

      </View>
      <ScrollView contentContainerStyle={{flex: 1, justifyContent: "space-between"}} {...props}>
        <DrawerItemList {...props} />

        <DrawerItem label="Log out" onPress={() => alert('Logging out...')} />
      </ScrollView>
    </SafeAreaView>
  );
}


const TasksView = () => {
  return (
    
    <View style={TasksStyles.mainContainer}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Your tasks here</Text>
      </View>
    </View>
  )
}

const stackTasks = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={Tasks => {
        const { toggleDrawer } = Tasks.navigation // <-- drawer's navigation (not from stack)
        return {
          headerLeft: () => <View style={{marginLeft: 15}}><Icon size={28} name="menu" onPress={toggleDrawer} /></View>,
          headerTitleAlign: 'center'
        }
      }} name="Tasks" component={TasksView}>

      </Stack.Screen>
    </Stack.Navigator>

  )
}

const Tasks: () => React$Node = ({ navigation }) => {

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hey!", "Are you sure you want exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Container Tasks" component={stackTasks} />
    </Drawer.Navigator>

  )
};

export default Tasks;