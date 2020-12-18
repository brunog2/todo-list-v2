import 'react-native-gesture-handler';
import React from 'react';
import { ScrollView, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import DrawerContentStyles from './DrawerContentStyles';
import auth from '@react-native-firebase/auth';


function DrawerContent(props) {

    const logout = () => {
        auth().signOut()
        .then(() => props.navigation.navigate('Login'));
    }

    return (
        <SafeAreaView style={DrawerContentStyles.scrollItems}>
            <View style={DrawerContentStyles.containerLogo}>
                <Icon type="ionicon" name="checkmark-outline" size={49} iconStyle={DrawerContentStyles.logo} />

            </View>
            <ScrollView contentContainerStyle={DrawerContentStyles.contentContainer} {...props}>
                <DrawerItemList  {...props} />

                <DrawerItem labelStyle={DrawerContentStyles.labelSignOut} label="Sign out" onPress={logout} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default DrawerContent;