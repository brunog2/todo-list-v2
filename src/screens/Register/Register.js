import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, Text, Keyboard, KeyboardAvoidingView, Alert } from 'react-native';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import PrimaryTextInput from '../../components/UI/PrimaryTextInput/PrimaryTextInput';
import RegisterStyles from './RegisterStyles';
import api from '../../services/api';

const Register: () => React$Node = ({ navigation }) => {
    const [textName, setTextName] = useState('');
    const [textEmail, setTextEmail] = useState('');
    const [textPassword, setTextPassword] = useState('');

    const handleRegisterButtonPress = async () => {

        const user = {
            name: textName,
            email: textEmail,
            password: textPassword,
        }
        await api.post('/registerUser', user)
            .then((res) => {
                if (res.data.register == "success") {
                    navigation.navigate('Account Created!');
                    return;
                } else {
                    Alert.alert(
                        "Error",
                        "Email already registred!",
                        [
                            { text: "OK" }
                        ],
                        { cancelable: false }
                    );
                };
                return;
            })
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