import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import PrimaryTextInput from '../../components/UI/PrimaryTextInput/PrimaryTextInput';
import RegisterStyles from './RegisterStyles';

const Register: () => React$Node = ({ navigation }) => {
    return (
        <View style={RegisterStyles.mainContainer}>
            <View style={RegisterStyles.formContainer}>
                <PrimaryTextInput style={RegisterStyles.inputText} placeholder="Full Name"></PrimaryTextInput>
                <PrimaryTextInput style={RegisterStyles.inputText} placeholder="Email"></PrimaryTextInput>
                <PrimaryTextInput style={RegisterStyles.inputText} placeholder="Password"></PrimaryTextInput>
                <CustomButton style={RegisterStyles.btRegister} text="Register"
                    onPress={() => {
                        navigation.navigate('Account Created')
                    }}>
                </CustomButton>
            </View>
            <View style={RegisterStyles.otherOptionsContainer}>
                <Text style={RegisterStyles.terms}>By registering, you agree with our terms</Text>
                <Text style={RegisterStyles.observation}>Already have an account? <Text style={RegisterStyles.login}>Log in here</Text></Text>
            </View>
        </View>
    )
};

export default Register;