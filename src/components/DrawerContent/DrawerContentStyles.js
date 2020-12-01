import { StyleSheet } from 'react-native';

const DrawerContentStyles = StyleSheet.create({
    scrollItems: {
        flex: 1,
    },
    containerLogo: {
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center",
        height: 120,
        width: "100%",
        borderColor: "#d9d9d9",
    },
    logo: {
        textAlign: "center",
        color: "#0085ed",
        
    },
    contentContainer: {
        flex: 1,
        justifyContent: "space-between",
    },
    labelSignOut: {
        color: "#FF0000",
    }
})

export default DrawerContentStyles;