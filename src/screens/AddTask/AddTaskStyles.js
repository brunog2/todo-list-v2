import { StyleSheet } from 'react-native';

const AddTaskStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#fdfdfd",
        alignItems: "center",
        justifyContent: "space-between"
    },
    elementsContainer: {
        borderWidth: 1,
        width: "100%",
        
    },
    formContainer: {
        width: "100%",
    },
    inputText: {
        marginTop: 20,
        width: "100%"
    },
    btAddTask: {
        marginTop: 10,
        marginBottom: 25,
        width: "100%"
    },
    containerPriority: {
        width: "90%",
        padding: 5,
        borderRadius: 10,
        height: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",


        alignItems: "center",
        marginBottom: 10,
        marginTop: 10,
    },
    buttonPriority: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: '30%',
        borderRadius: 5,
    },
})

export default AddTaskStyles;