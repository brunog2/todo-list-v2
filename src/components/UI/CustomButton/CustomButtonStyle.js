import { StyleSheet } from 'react-native';

const CustomButtonStyle = StyleSheet.create({
    btPrimary: {
        width: "90%",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        backgroundColor: "#0070c9",
    },
    btSecondary: {
        width: "90%",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        backgroundColor: "transparent",
        borderColor: "#0070c9",
        borderWidth: 1,
    },
    textBtSecondary: {
        color: "#0070c9"
    },
    textBtPrimary: {
        color: "#fff"
    },
});

export default CustomButtonStyle;