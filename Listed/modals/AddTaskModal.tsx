import React, { useState } from 'react';
import { RootStackParamList } from '../routes/StackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    View, Text, Button, StyleSheet, SafeAreaView,
    Image, Dimensions, TextInput
} from 'react-native';
import HomeButton from "../components/Button";

type AddTaskModalProps = NativeStackScreenProps<RootStackParamList, 'AddTaskModal'>

const { width, height } = Dimensions.get("window");
const image1 = require("../assets/Upside Down Circles Teehee.png")

const AddTaskModal: React.FC<AddTaskModalProps> = ({ navigation }) => {
    const [taskTitle, onChangeTaskTitle] = useState("")
    const [description, onChangeDescription] = useState("")
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={image1} style={styles.image} />

            <View style={{ flex: 0.4, alignItems: "center", width: "100%" }}>
                <Text style={styles.title}>Add Task</Text>
                <TextInput
                    editable
                    value={taskTitle}
                    onChangeText={taskTitle => onChangeTaskTitle(taskTitle)}
                    style={[
                        styles.input,
                        taskTitle ? styles.inputLeft : styles.inputCenter,
                        {
                            marginTop: height * 0.03,
                            height: height * 0.05,
                        },
                    ]}
                    placeholder="Task Name"
                    placeholderTextColor="#aaa"
                />

                <TextInput
                    editable
                    value={description}
                    multiline={true}
                    onChangeText={description => onChangeDescription(description)}
                    style={[
                        styles.input,
                        description ? styles.inputLeft : [styles.inputCenter,
                        {
                            alignItems: "center"
                        }],
                        {
                            marginTop: height * 0.03,
                            height: height * 0.15
                        },
                    ]}
                    placeholder="Description"
                    placeholderTextColor="#aaa"
                />


                <DateTimePicker
                    mode="datetime"
                    display='default'
                    value={date}
                    style={{ marginTop: height * 0.03 }} />

                <HomeButton
                    title='Add'
                    onPress={() => { navigation.goBack() }}
                    customStyles={{ marginTop: height * 0.03 }} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    image: {
        position: "absolute",
        top: height * -0.1,
        zIndex: -1,
    },
    title: {
        fontWeight: "bold",
        fontFamily: "InknutAntiqua_400Regular",
        fontSize: width / 12,
        color: "#3B4552",
    },
    input: {
        width: width * 0.6,
        backgroundColor: "#DDDDDD",
        borderWidth: 0,
        borderRadius: 10,
        fontSize: height * 0.021,
        fontFamily: "InknutAntiqua_400Regular",
        paddingLeft: width * 0.04,
        paddingRight: width * 0.04,
        color: "#3B4552",
        //textAlignVertical: "center",
    },
    inputLeft: {
        textAlign: "left"
    },
    inputCenter: {
        textAlign: "center",
    }

});
export default AddTaskModal