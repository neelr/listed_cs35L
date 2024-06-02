import React, { useState } from 'react';
import { RootStackParamList } from '../routes/StackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    View, Text, Button, StyleSheet, SafeAreaView,
    Image, Dimensions, TextInput, ScrollView // Import ScrollView
} from 'react-native';
import HomeButton from "../components/Button";
import { Keyboard } from 'react-native';

type AddTaskModalProps = NativeStackScreenProps<RootStackParamList, 'AddTaskModal'>

const { width, height } = Dimensions.get("window");
const image1 = require("../assets/circlescopy.png")

const AddTaskModal: React.FC<AddTaskModalProps> = ({ navigation }) => {
    const [taskTitle, onChangeTaskTitle] = useState("")
    const [description, onChangeDescription] = useState("")
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const handleDismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
                keyboardShouldPersistTaps="handled" // Ensure taps outside of TextInput dismiss the keyboard
            >
                
                <View style={{ flex: 0.4, alignItems: "center", width: "100%" }}>
                    <Text style={styles.title}>Add Task</Text>
                    <TextInput
                        editable
                        value={taskTitle}
                        onChangeText={taskTitle => onChangeTaskTitle(taskTitle)}
                        onSubmitEditing={handleDismissKeyboard}
                        style={[
                            styles.input,
                            taskTitle ? styles.inputLeft : styles.inputCenter,
                            { marginTop: height * 0.03, height: height * 0.05 },
                        ]}
                        placeholder="Task Name"
                        placeholderTextColor="#aaa"
                    />
                    <TextInput
                        editable
                        value={description}
                        multiline={true}
                        onChangeText={description => onChangeDescription(description)}
                        onSubmitEditing={handleDismissKeyboard}
                        style={[
                            styles.input,
                            styles.inputLeft,
                            { marginTop: height * 0.03, height: height * 0.15 },
                        ]}
                        placeholder="Description"
                        placeholderTextColor="#aaa"
                    />
                    <DateTimePicker
                        mode="datetime"
                        display='default'
                        value={date}
                        style={{ marginTop: height * 0.03 }}
                    />
                    <HomeButton
                        title='Add'
                        onPress={() => { navigation.goBack() }}
                        customStyles={{ marginTop: height * 0.03 }}
                    />
                </View>
            </ScrollView>
            <Image source={image1} style={styles.image} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        bottom: 0, // Adjust bottom position as needed
        width: width*(1), // Set width to full screen width
        height: 0.25 * height, // Set height to a specific percentage of screen height

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
    },
    inputLeft: {
        textAlign: "left",
    },
    inputCenter: {
        textAlign: "center",
    }
});

export default AddTaskModal;
