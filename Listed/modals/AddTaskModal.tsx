import React, { useState } from "react";
import { RootStackParamList } from "../routes/StackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import HomeButton from "../components/Button";
import { Keyboard } from "react-native";
import { useAddTask } from "../hooks/useAddTask";
import { useQueryClient } from "@tanstack/react-query";
import { USER_TASKS_QUERY_KEY } from "../hooks/useUserTasks";

type AddTaskModalProps = NativeStackScreenProps<
  RootStackParamList,
  "AddTaskModal"
>;

const { width, height } = Dimensions.get("window");
const image1 = require("../assets/circlescopy.png");

const AddTaskModal: React.FC<AddTaskModalProps> = ({ navigation }) => {
  const [taskTitle, onChangeTaskTitle] = useState("");
  const [description, onChangeDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date())

  const queryClient = useQueryClient();


  const { mutate: addTask } = useAddTask({
    onSuccess: () => {
      alert("Task added successfully");
      queryClient.invalidateQueries({
        queryKey: [USER_TASKS_QUERY_KEY]
      });

      navigation.goBack();
    },
  });

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"date" | "time">("date");

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const formatToAMPM = (time: Date) => {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let strminutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    let strTime = hours.toString() + ':' + minutes.toString() + ' ' + ampm;
    return strTime;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        keyboardShouldPersistTaps="handled" // Ensure taps outside of TextInput dismiss the keyboard
      >
        <View style={{ flex: 0.4, alignItems: "center", width: "100%" }}>
          <Text style={styles.title}>Add Task</Text>
          <TextInput
            editable
            value={taskTitle}
            onChangeText={(taskTitle) => onChangeTaskTitle(taskTitle)}
            onSubmitEditing={handleDismissKeyboard}
            style={[
              styles.input,
              { marginTop: height * 0.02, height: height * 0.05 },
            ]}
            placeholder="Task Name"
            placeholderTextColor="#aaa"
          />
          <TextInput
            editable
            value={description}
            multiline={true}
            onChangeText={(description) => onChangeDescription(description)}
            onSubmitEditing={handleDismissKeyboard}
            style={[
              styles.input,
              { marginTop: height * 0.02, height: height * 0.15 },
            ]}
            placeholder="Description"
            placeholderTextColor="#aaa"
          />
          <Text style={{ marginTop: height * 0.02, fontFamily: "InknutAntiqua_400Regular" }}>
            {date.toDateString() + ", " + formatToAMPM(time)}
          </Text>
          <HomeButton
            title="Select Date"
            onPress={() => {
              setMode("date")
              setOpen(true);
            }}
            customStyles={{ marginTop: height * 0.02, height: height * 0.07 }}
          />
          <HomeButton
            title="Select Time"
            onPress={() => {
              setMode("time")
              setOpen(true);
            }}
            customStyles={{ marginTop: height * 0.02, height: height * 0.07 }}
          />
          {open && (
            <DateTimePicker
              mode={mode}
              display="default"
              value={mode === "date" ? date : time}
              onChange={(event, selectedDate?: Date) => {
                const currentDate = selectedDate || date;
                setOpen(false);
                mode === "date" ? setDate(currentDate) : setTime(currentDate);
              }}
              style={{ marginTop: height * 0.02 }}
            />
          )}
          <HomeButton
            title="Add"
            onPress={() => {
              addTask({
                name: taskTitle,
                description,
                completeBy: date.toISOString() + ", " + time.toTimeString(),
              });
            }}
            customStyles={{
              marginTop: height * 0.02,
              height: height * 0.07
            }}
          />
        </View>
      </ScrollView>
      <Image source={image1} style={styles.image} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    bottom: -50, // Adjust bottom position as needed
    width: width * 1, // Set width to full screen width
    height: 0.25 * height, // Set height to a specific percentage of screen height
    zIndex: -1, // Set z-index to send image to back
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
});

export default AddTaskModal;
