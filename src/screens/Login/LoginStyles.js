import { StyleSheet } from 'react-native';

const LoginStyles = StyleSheet.create({
    mainContainer: {
        flex: 1, 
        backgroundColor: "#fff",
        justifyContent: "center", 
        alignItems: "center", 
    },
    formContainer: {
        width: "90%",
    },
    inputText: {
        marginBottom: 5,
    },
    btLogin: {
        marginTop: 10
    },
    otherOptionsContainer: {
        marginTop: 15,
        width: "90%",
flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    forgotPassword: {
        color: "#0070c9"
    },
    createAccount: {
        color: "#0070c9"
    }
})

export default LoginStyles;