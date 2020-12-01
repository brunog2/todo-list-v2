import { StyleSheet } from 'react-native';

const TasksContainerStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
    },
    searchContainer: {
        marginTop: 10,
        height: 50,
        width: "90%",
        flexDirection: "row",
        borderRadius: 6,
        justifyContent: "space-around",
        alignItems: "center",

        backgroundColor: "#ebf0f5",
        height: "65%",
        maxHeight: 40,
    },
    searchInput: {

        width: "92%",
        padding: 5,
        paddingRight: 0,

        borderRadius: 6,

        height: "100%",
    },
    scrollTasksContainer: {
        width: "90%"
    },
    containerTask: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 55,
        borderBottomWidth: 1,
        borderColor: "#ebf0f5"
    },
    containerTaskDescription: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
    },
    priorityBar: {
        width: "10%",
        borderRadius: 3,
        height: 7,
    },
    floatingButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 40,
        bottom: 40,
        backgroundColor: "#e62f22",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 14,
    },
    textFloatingButton: {
        textAlign: "center",

        fontWeight: "900",
        color: "#fff"
    }
})

export default TasksContainerStyles;