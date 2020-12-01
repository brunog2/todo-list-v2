import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import PrimaryTextInput from '../../components/UI/PrimaryTextInput/PrimaryTextInput';
import LoginStyles from './LoginStyles';

const Login: () => React$Node = ({ navigation }) => {
    useEffect(() => { console.log("hook do login") }, [])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={LoginStyles.mainContainer}>
                <View style={LoginStyles.formContainer}>
                    <PrimaryTextInput style={LoginStyles.inputText} placeholder="Email"></PrimaryTextInput>
                    <PrimaryTextInput style={LoginStyles.inputText} placeholder="Password"></PrimaryTextInput>
                    <CustomButton style={LoginStyles.btLogin} text="Login"
                        onPress={() => {
                            navigation.navigate('Tasks')
                        }}>
                    </CustomButton>
                </View>
                <View style={LoginStyles.otherOptionsContainer}>
                    <Text onPress={() => {
                        navigation.navigate('Password Recovery')
                    }}
                        style={LoginStyles.forgotPassword}>Forgot your password?</Text>
                    <Text onPress={() => {
                        navigation.navigate('Register')
                    }}
                        style={LoginStyles.createAccount}>Create an account</Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
};

export default Login;