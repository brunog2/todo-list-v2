import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View, Text, BackHandler, Alert } from 'react-native';

const Login: () => React$Node = ({ navigation }) => {

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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>You tasks here</Text>
        </View>
    </View>
)
};

export default Login;