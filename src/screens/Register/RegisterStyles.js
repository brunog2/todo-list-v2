import { StyleSheet } from 'react-native';

const RegisterStyles = StyleSheet.create({
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
    btRegister: {
        marginTop: 10
    },
    otherOptionsContainer: {
        marginTop: 15,
        width: "90%",
        justifyContent: "space-between",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    terms: {
        color: "#000",
        marginBottom: 7,
    },
    observation: {
        color: "#000",
    },
    login: {
        color: "#0070c9"
    }
})

export default RegisterStyles;