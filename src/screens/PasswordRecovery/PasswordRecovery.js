import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import PrimaryTextInput from '../../components/UI/PrimaryTextInput/PrimaryTextInput';
import PasswordRecoveryStyles from './PasswordRecoveryStyles';

const PasswordRecovery: () => React$Node = ({ navigation }) => {
    return (
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
    )
};

export default PasswordRecovery;