import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from '../../components/UI/CustomButton/CustomButton';
import AccountCreatedStyles from './AccountCreatedStyles';

const AccountCreated: () => React$Node = ({ navigation }) => {
    return (
        <View style={AccountCreatedStyles.mainContainer}>
            <View style={AccountCreatedStyles.noteContainer}>
                <Text style={AccountCreatedStyles.observation}>
                    Account created with success!
                </Text>

                <Text style={AccountCreatedStyles.observation}>
                    Now you can proceed to log in.
                </Text>

                <CustomButton style={AccountCreatedStyles.btOk} text="Login"
                    onPress={() => {
                        navigation.navigate('Login')
                    }}>
                </CustomButton>
            </View>
        </View>
    )
};

export default AccountCreated;