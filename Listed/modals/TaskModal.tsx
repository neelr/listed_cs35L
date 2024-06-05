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
import { useEditTask } from "../hooks/useEditTask";
import { useQueryClient } from "@tanstack/react-query";
import { USER_TASKS_QUERY_KEY } from "../hooks/useUserTasks";

type AddTaskModalProps = NativeStackScreenProps<
  RootStackParamList,
  "TaskModal"
>;

const { width, height } = Dimensions.get("window");
const image1 = require("../assets/circlescopy.png");

const TaskModal: React.FC<AddTaskModalProps> = ({ navigation, route }) => {
  const curTask = route.params?.task

  const [taskTitle, onChangeTaskTitle] = curTask ? useState(curTask.name) : useState("");
  const [description, onChangeDescription] = curTask ? useState(curTask.description) : useState("");
  const [date, setDate] = curTask ? useState(new Date(curTask.completeBy)) : useState(new Date());

  const queryClient = useQueryClient();

  const { mutate: addTask } = useAddTask({
    onSuccess: () => {
      alert("Task added successfully!");
      queryClient.invalidateQueries({
        queryKey: [USER_TASKS_QUERY_KEY]
      });

      navigation.goBack();
    },
  });

  const { mutate: editTask } = useEditTask({
    onSuccess: () => {
      alert("Task edited successfully!");
      queryClient.invalidateQueries({
        queryKey: [USER_TASKS_QUERY_KEY]
      });

      navigation.goBack();
    },
  });

  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [mode, setMode] = useState<"date" | "time">("date");

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
          <Text style={styles.title}>
            {curTask ? "Edit" : "Add"} Task</Text>
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
          <Text style={{ marginTop: height * 0.02, fontFamily: "InknutAntiqua_400Regular", color: "#3B4552" }}>
            {formatDateString(date.toISOString())}
          </Text>

          {!dateOpen ?
            <HomeButton
              title="Select Date"
              onPress={() => { setDateOpen(true); }}
              customStyles={{ marginTop: height * 0.02, height: height * 0.07 }}
            />
            :
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
          }

          {!timeOpen ?
            <HomeButton
              title="Select Time"
              onPress={() => { setTimeOpen(true); }}
              customStyles={{ marginTop: height * 0.02, height: height * 0.07 }}
            />
            :
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
          }

          <HomeButton
            title={curTask ? "Save" : "Add"}
            onPress={() => {
              !curTask ?
                addTask({
                  name: taskTitle,
                  description,
                  completeBy: date.toISOString(),
                }) :

                editTask({
                  taskId: curTask.taskId,
                  name: taskTitle,
                  description,
                  completeBy: date.toISOString(),
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

export default TaskModal;
