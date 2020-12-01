import { StyleSheet } from 'react-native';

const AddTaskStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#fdfdfd",
        alignItems: "center",
        justifyContent: "space-between"
    },
    elementsContainer: {
        alignItems: "center",
        width: "100%",

    },
    addContainer: {
        marginTop: 10,
        height: 40,
        width: "90%",
        flexDirection: "row",
        borderRadius: 6,
        justifyContent: "space-between",
        alignItems: "center",
        height: "65%",
        maxHeight: 40,
    },
    addInput: {


        backgroundColor: "#ebf0f5",
        width: "90%",
        padding: 5,

        borderRadius: 6,

        height: "100%",
    },
    containerPriority: {
        paddingBottom: 5,
        paddingTop: 5,
        width: "90%",
        borderRadius: 7,
        height: 41,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
        marginTop: 15,
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