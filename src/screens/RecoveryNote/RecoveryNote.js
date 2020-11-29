import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import RecoveryNoteStyles from './RecoveryNoteStyles';

const RecoveryNote: () => React$Node = ({ navigation }) => {
    return (
        <View style={RecoveryNoteStyles.mainContainer}>
            <View style={RecoveryNoteStyles.noteContainer}>
                <Text style={RecoveryNoteStyles.observation}>
                    If there is an account with the email provided, we will send instructions to it.
            </Text>
                <CustomButton style={RecoveryNoteStyles.btOk} text="Ok"
                    onPress={() => {
                        navigation.navigate('Login')
                    }}>
                </CustomButton>
            </View>
        </View>
    )
};

export default RecoveryNote;