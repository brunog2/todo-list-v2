import 'react-native-gesture-handler';
import React from 'react';
import { ScrollView, View, Text, SafeAreaView } from 'react-native';
import { DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import DrawerContentStyles from './DrawerContentStyles';

function DrawerContent(props) {
    return (
        <SafeAreaView style={DrawerContentStyles.scrollItems}>
            <View style={DrawerContentStyles.containerLogo}>
                <Text style={DrawerContentStyles.logo}>Logo here</Text>

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