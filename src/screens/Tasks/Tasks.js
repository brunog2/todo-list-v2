import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Icon, CheckBox } from 'react-native-elements';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView, TextInput, View, Text, BackHandler, Alert, SafeAreaView, Dimensions, Image } from 'react-native';
import {
  createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import TasksStyles from './TasksStyles';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginLeft: "auto", marginRight: "auto", justifyContent: "center", height: 120, width: 120, borderColor: "#d9d9d9", borderWidth: 1, borderRadius: 60 }}>
        <Text style={{ textAlign: "center" }}>Logo here</Text>

      </View>
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "space-between" }} {...props}>
        <DrawerItemList  {...props} />

        <DrawerItem labelStyle={{ color: "red" }} label="Sign out" onPress={() => {
          props.navigation.navigate('Login')
        }} />
      </ScrollView>
    </SafeAreaView>
  );
}


const TasksView = () => {
  const [tasks, setTasks] = useState([{description: "New task", priority: "medium"}]);
  const [checked, setChecked] = useState(false);

  const colors = {
    "low": "yellow",
    "medium": "orange",
    "high": "red"
  }

  

  useEffect(() => {
    console.log("efeito...")
    async function loadTasks() {
      axios.get('http://young-lowlands-55392.herokuapp.com/tasks')
        .then(response => {
          setTasks(response.data);
        })
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
  
    };
    loadTasks();
  }, [])

  return (
    <View style={TasksStyles.mainContainer}>
      <ScrollView style={{ width: "100%" }}>
        {
          tasks.map((task, index) => (
            <View key={index} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
                <CheckBox
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

              <View style={{ marginRight: 20, width: "10%", borderRadius: 3, height: 7, backgroundColor: colors[task.priority] }}>
              </View>
            </View>
          ))}
      </ScrollView>
    </View >
  )
}

const StackTasks = ({ navigation }) => {
  const [activeHeader, setActiveHeader] = useState({});
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setActiveHeader(defaultHeader);
    console.log("primeiro use effect")
  }, []);

  useEffect(() => { console.log("estado atualizado: ", searchText) }, [searchText])

  var toggleDrawer = null;

  const defaultHeader = {
    headerTitle: "Tasks",
    headerTitleContainerStyle: {},
    headerLeft: () => <View ><Icon size={28} name="menu" onPress={toggleDrawer} /></View>,
    headerLeftContainerStyle: { marginLeft: 15 },
    headerRight: () => <View style={{ marginRight: 15 }}><Icon size={28} name="search" onPress={() => handleSearchButton()} /></View>,
    headerRightContainerStyle: { marginRight: 15 }
  };

  const searchHeader = {
    headerTitle: () => <TextInput editable={true} onChange={(e) => handleSearchTextChange(e.nativeEvent.text)} placeholder="Search" style={{ flex: 1, padding: 5, backgroundColor: "#ebf0f5", borderRadius: 7 }} />,
    headerTitleContainerStyle: { flex: 1, borderRadius: 7, height: "70%", maxHeight: 30 },
    headerLeft: () => <View><Icon size={28} name="arrow-back" onPress={handleBackFromSearch} /></View>,
    headerLeftContainerStyle: { marginLeft: 15 },
    headerRight: () => <View><Icon size={28} name="close" onPress={handleBackFromSearch} /></View>,
    headerRightContainerStyle: { marginRight: 15 }
  };

  const handleSearchTextChange = (text) => {
    console.log("acionado, com o texto: ", text);
    console.log("estado atual: ", searchText);
    setSearchText(text);
  };

  const handleSearchButton = () => {
    setActiveHeader(searchHeader);
  };

  const handleBackFromSearch = () => {
    setActiveHeader(defaultHeader);
    setSearchText('');
  };

  return (
    <Stack.Navigator>
      <Stack.Screen options={Tasks => {
        toggleDrawer = Tasks.navigation.toggleDrawer // <-- drawer's navigation (not from stack)
        return {
          headerTitleAlign: "center",

          headerTitle: activeHeader.headerTitle,
          headerTitleContainerStyle: activeHeader.headerTitleContainerStyle,
          headerLeft: activeHeader.headerLeft,
          headerLeftContainerStyle: activeHeader.headerLeftContainerStyle,
          headerRight: activeHeader.headerRight,
          headerRightContainerStyle: activeHeader.headerRightContainerStyle,


        }
      }} name="Tasks" component={TasksView}>

      </Stack.Screen>
    </Stack.Navigator>

  )
}

const Tasks: () => React$Node = ({ navigation }) => {

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hey!", "Are you sure you want to exit?", [
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
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Container Tasks" component={StackTasks} />

    </Drawer.Navigator>

  )
};

export default Tasks;