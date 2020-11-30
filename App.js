/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login/Login';
import Register from './src/screens/Register/Register';
import PasswordRecovery from './src/screens/PasswordRecovery/PasswordRecovery';
import RecoveryNote from './src/screens/RecoveryNote/RecoveryNote';
import AccountCreated from './src/screens/AccountCreated/AccountCreated';
import Tasks from './src/screens/Tasks/Tasks';


const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (

    <NavigationContainer>
      <StatusBar backgroundColor="white" barStyle="dark-content"/>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{gestureEnabled: false}}
        />

        <Stack.Screen
          name="Tasks"
          component={Tasks}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name="Register"
          component={Register}
        />

        <Stack.Screen
          name="Password Recovery"
          component={PasswordRecovery}
        />

        <Stack.Screen
          name="Recovery Note"
          component={RecoveryNote}
          options={{headerLeft: null, gestureEnabled: false}}
        />

        <Stack.Screen
          name="Account Created!"
          component={AccountCreated}
          options={{headerLeft: null, gestureEnabled: false}}
        />
      </ Stack.Navigator >
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({
});

export default App;
