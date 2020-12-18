import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, Keyboard, KeyboardAvoidingView, Alert } from 'react-native';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import PrimaryTextInput from '../../components/UI/PrimaryTextInput/PrimaryTextInput';
import RegisterStyles from './RegisterStyles';
import api from '../../services/api';

import auth from '@react-native-firebase/auth';

const Register: () => React$Node = ({ navigation }) => {
    const [textName, setTextName] = useState('');
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


    const handleRegisterButtonPress = async () => {
        auth().createUserWithEmailAndPassword(textEmail, textPassword)
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

        // const user = {
        //     name: textName,
        //     email: textEmail,
        //     password: textPassword,
        // }
        // await api.post('/registerUser', user)
        //     .then((res) => {
        //         if (res.data.register == "success") {
        //             navigation.navigate('Account Created!');
        //             return;
        //         } else {
        //             Alert.alert(
        //                 "Error",
        //                 "Email already registred!",
        //                 [
        //                     { text: "OK" }
        //                 ],
        //                 { cancelable: false }
        //             );
        //         };
        //         return;
        //     })

    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={RegisterStyles.mainContainer}>
                <View style={RegisterStyles.formContainer}>
                    <PrimaryTextInput
                        value={textName}
                        onChangeText={(text) => setTextName(text)}
                        autoCapitalize="words"
                        style={RegisterStyles.inputText}
                        placeholder="Full Name">
                    </PrimaryTextInput>

                    <PrimaryTextInput
                        value={textEmail}
                        onChangeText={(text) => setTextEmail(text)}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        style={RegisterStyles.inputText}
                        placeholder="Email"
                        autoCorrect={false}>
                    </PrimaryTextInput>

                    <PrimaryTextInput
                        value={textPassword}
                        onChangeText={(text) => setTextPassword(text)}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        style={RegisterStyles.inputText}
                        placeholder="Password"
                        autoCorrect={false}
                        textContentType="none"
                        blurOnSubmit={false}
                        onSubmitEditing={()=> Keyboard.dismiss()}
                    >
                    </PrimaryTextInput>

                    <CustomButton
                        style={RegisterStyles.btRegister}
                        text="Register"
                        onPress={() => handleRegisterButtonPress()}>
                    </CustomButton>
                </View>

                <View style={RegisterStyles.otherOptionsContainer}>
                    <Text style={RegisterStyles.terms}>By registering, you agree with our terms</Text>
                    <Text style={RegisterStyles.observation}>Already have an account? <Text style={RegisterStyles.login} onPress={() => {
                        navigation.navigate('Login')
                    }}>Log in here</Text></Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
};

export default Register;