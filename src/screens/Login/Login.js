import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import PrimaryTextInput from '../../components/UI/PrimaryTextInput/PrimaryTextInput';

const Login: () => React$Node = ({ navigation }) => {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", padding: 25 }}>
            <PrimaryTextInput placeholder="Seu nome"></PrimaryTextInput>
            <CustomButton text="Olá"
                onPress={() => {
                    navigation.navigate('Tasks')
                }}>
            </CustomButton>
        </View>
    )
};

export default Login;