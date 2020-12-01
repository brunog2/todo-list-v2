import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Alert } from 'react-native';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import PrimaryTextInput from '../../components/UI/PrimaryTextInput/PrimaryTextInput';
import LoginStyles from './LoginStyles';
import api from '../../services/api';

const Login: () => React$Node = ({ navigation }) => {
    const [textEmail, setTextEmail] = useState('');
    const [textPassword, setTextPassword] = useState('');

    const handleAuthUserFailed = () => {
        Alert.alert(
            "Error",
            "Email or password incorrect",
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );
        return;
    }

    const handleBtLoginPress = async () => {
        await api.post('/authUser', ({ email: textEmail, password: textPassword }))
            .then((res) => {
                res.data.auth === "true" ? navigation.navigate('Tasks', { id: res.data.id }) : handleAuthUserFailed()
            })
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={LoginStyles.mainContainer}>
                <View style={LoginStyles.formContainer}>
                    <PrimaryTextInput autoCorrect={false} autoCapitalize="none" autoCompleteType="email" value={textEmail} onChangeText={setTextEmail} style={LoginStyles.inputText} placeholder="Email"></PrimaryTextInput>
                    <PrimaryTextInput autoCorrect={false} secureTextEntry={true} autoCapitalize="none" autoCompleteType="off" value={textPassword} onChangeText={setTextPassword} style={LoginStyles.inputText} placeholder="Password"></PrimaryTextInput>
                    <CustomButton style={LoginStyles.btLogin} text="Login"
                        onPress={() => {
                            handleBtLoginPress()
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