import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackTasks from '../../components/StackTasks';
import DrawerContent from '../../components/DrawerContent/DrawerContent';

const Drawer = createDrawerNavigator();

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
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Tasks 1" component={StackTasks} />

    </Drawer.Navigator>

  )
};

export default Tasks;