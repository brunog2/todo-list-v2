import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Alert } from 'react-native';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import PrimaryTextInput from '../../components/UI/PrimaryTextInput/PrimaryTextInput';
import LoginStyles from './LoginStyles';

import auth from '@react-native-firebase/auth';

import api from '../../services/api';

const Login: () => React$Node = ({ navigation }) => {
    const [textEmail, setTextEmail] = useState('');
    const [textPassword, setTextPassword] = useState('');

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
        if(user){
            navigation.navigate('Tasks', { id: user.uid });
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

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
        auth().signInWithEmailAndPassword(textEmail, textPassword)
        .then(() => {
            console.log('User account created & signed in!');
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                Alert.alert('That email address is invalid!');
            }

            Alert.alert(error);
        });
        // await api.post('/authUser', ({ email: textEmail, password: textPassword }))
        //     .then((res) => {
        //         res.data.auth === "true" ? navigation.navigate('Tasks', { id: res.data.id }) : handleAuthUserFailed()
        //     })
    }

    if (initializing) return null;

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