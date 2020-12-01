import 'react-native-gesture-handler';
import React from 'react';
import { ScrollView, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import DrawerContentStyles from './DrawerContentStyles';

function DrawerContent(props) {
    return (
        <SafeAreaView style={DrawerContentStyles.scrollItems}>
            <View style={DrawerContentStyles.containerLogo}>
                <Icon type="ionicon" name="checkmark-outline" size={49} iconStyle={DrawerContentStyles.logo} />

            </View>
            <ScrollView contentContainerStyle={DrawerContentStyles.contentContainer} {...props}>
                <DrawerItemList  {...props} />

                <DrawerItem labelStyle={DrawerContentStyles.labelSignOut} label="Sign out" onPress={() => {
                    props.navigation.navigate('Login')
                }} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default DrawerContent;