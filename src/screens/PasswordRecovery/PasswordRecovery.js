import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import PrimaryTextInput from '../../components/UI/PrimaryTextInput/PrimaryTextInput';
import PasswordRecoveryStyles from './PasswordRecoveryStyles';

const PasswordRecovery: () => React$Node = ({ navigation }) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={PasswordRecoveryStyles.mainContainer}>
                <View style={PasswordRecoveryStyles.formContainer}>
                    <View style={PasswordRecoveryStyles.titleContainer}>
                        <Text style={PasswordRecoveryStyles.observation}>Enter your registred email</Text>
                    </View>

                    <PrimaryTextInput style={PasswordRecoveryStyles.inputText} placeholder="Email"></PrimaryTextInput>

                    <CustomButton style={PasswordRecoveryStyles.btRecoveryPassword} text="Recover Password"
                        onPress={() => {
                            navigation.navigate('Recovery Note')
                        }}>
                    </CustomButton>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
};

export default PasswordRecovery;