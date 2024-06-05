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
  Alert,
} from "react-native";
import HomeButton from "../components/Button";
import { Keyboard } from "react-native";
import { useAddTask } from "../hooks/useAddTask";
import { useEditTask } from "../hooks/useEditTask";

type AddTaskModalProps = NativeStackScreenProps<
  RootStackParamList,
  "TaskModal"
>;

const { width, height } = Dimensions.get("window");
const image1 = require("../assets/circlescopy.png");

const TaskModal: React.FC<AddTaskModalProps> = ({ navigation, route }) => {
  const curTask = route.params?.task;

  const [taskTitle, onChangeTaskTitle] = useState(curTask?.name || "");
  const [description, onChangeDescription] = useState(
    curTask?.description || ""
  );
  const [date, setDate] = useState(
    curTask ? new Date(curTask.completeBy) : new Date()
  );
  const [privateTask, setPrivateTask] = useState(curTask?.private || false);
  const { mutate: addTask } = useAddTask({
    onSuccess: (data) => {
      Alert.alert("Add Task", `${data.name} added successfully!`);

      navigation.goBack();
    },
  });

  const { mutate: editTask } = useEditTask({
    onSuccess: (data) => {
      Alert.alert("Edit Task", `${data.name} edited successfully!`);

      navigation.goBack();
    },
  });

  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const formatDateString = (dateString: string): string => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `Do by: ${formattedDate} at ${formattedTime}`;
  };

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
          <Text style={styles.title}>{curTask ? "Edit" : "Add"} Task</Text>
          <HomeButton
            title={privateTask ? "Private" : "Public"}
            onPress={() => {
              setPrivateTask(!privateTask);
            }}
            customStyles={{
              marginTop: height * 0.02,
              height: height * 0.07,
              backgroundColor: privateTask ? "#E63946" : "#3B4552",
            }}
            icon={{ name: privateTask ? "lock-closed" : "lock-open" }}
          />
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
              styles.descriptionInput,
              { marginTop: height * 0.02, height: height * 0.15 },
            ]}
            placeholder="Description"
            placeholderTextColor="#aaa"
          />
          <Text
            style={{
              marginTop: height * 0.02,
              fontFamily: "InknutAntiqua_400Regular",
              color: "#3B4552",
            }}
          >
            {formatDateString(date.toISOString())}
          </Text>

          {!dateOpen ? (
            <HomeButton
              title="Select Date"
              onPress={() => {
                setDateOpen(true);
              }}
              customStyles={{ marginTop: height * 0.02, height: height * 0.07 }}
            />
          ) : (
            <DateTimePicker
              mode="date"
              display="default"
              value={date}
              onChange={(event, selectedDate?: Date) => {
                const currentDate = selectedDate || date;
                setDateOpen(false);
                setDate(currentDate);
              }}
              style={{ marginTop: height * 0.02 }}
            />
          )}

          {!timeOpen ? (
            <HomeButton
              title="Select Time"
              onPress={() => {
                setTimeOpen(true);
              }}
              customStyles={{ marginTop: height * 0.02, height: height * 0.07 }}
            />
          ) : (
            <DateTimePicker
              mode="time"
              display="default"
              value={date}
              onChange={(event, selectedDate?: Date) => {
                const currentDate = selectedDate || date;
                setTimeOpen(false);
                setDate(currentDate);
              }}
              style={{ marginTop: height * 0.02 }}
            />
          )}

          <HomeButton
            bold
            title={curTask ? "Save" : "Add"}
            icon={{
              name: curTask ? "checkmark-circle-outline" : "add-circle-outline",
              size: 30,
            }}
            onPress={() => {
              const task = {
                name: taskTitle,
                description,
                completeBy: date.toISOString(),
                private: privateTask,
              };
              !curTask
                ? addTask(task)
                : editTask({
                    ...task,
                    taskId: curTask.taskId,
                  });
            }}
            customStyles={{
              marginTop: height * 0.02,
              height: height * 0.07,
              backgroundColor: "#0d7541",
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
    fontFamily: "InknutAntiqua_600SemiBold",
    fontSize: width / 12,
    color: "#3B4552",
  },
  privateText: {
    fontFamily: "InknutAntiqua_400Regular",
    fontSize: width / 20,
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
  descriptionInput: {
    width: width * 0.6,
    backgroundColor: "#DDDDDD",
    borderWidth: 0,
    borderRadius: 10,
    fontSize: height * 0.016,
    fontFamily: "InknutAntiqua_400Regular",
    paddingLeft: width * 0.04,
    paddingRight: width * 0.04,
    color: "#3B4552",
  },
});

export default TaskModal;
