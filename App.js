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
  SafeAreaView,
  StyleSheet,
  ScrollView,
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

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const App: () => React$Node = () => {
  return (
    
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
            name="Login"
            component={Login}
            />
            <Stack.Screen 
            name="Tasks"
            children={() => (<Text>Olá</Text>)}
            />
        </ Stack.Navigator >
      </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({
});

export default App;
