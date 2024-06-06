import React from "react";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Task } from "../types/taskTypes";
import { Swipeable } from "react-native-gesture-handler";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { Fontisto } from "@expo/vector-icons";
import { useEditTask } from "../hooks/useEditTask";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export interface TaskProps {
  task: Task;
  navigation: any;
}

const truncateText = (text: string, maxLength: number): string => {
  if (!text) {
    return "";
  }

  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
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

  const today = new Date();
  const tomorrow = new Date(today);
  const yesterday = new Date(today);

  tomorrow.setDate(today.getDate() + 1);
  yesterday.setDate(today.getDate() - 1);


  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return `Today at ${formattedTime}`;
  }

  if (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  ) {
    return `Tomorrow at ${formattedTime}`;
  }

  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return `Yesterday at ${formattedTime}`;
  }

  return `${formattedDate} at ${formattedTime}`;
};

const isTaskOverdue = (dueDateString: string): boolean => {
  const dueDate = new Date(dueDateString);
  const currentDate = new Date();

  // Strip the time portion for a pure date comparison
  currentDate.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  return dueDate < currentDate;
};

export const TaskView: React.FC<TaskProps> = ({ task, navigation }) => {
  const { mutate: deleteTask, isSuccess } = useDeleteTask();
  const { mutate: editTask } = useEditTask();

  const handleSwipe = (direction: string) => {
    direction === "right"
      ? deleteTask(task.taskId)
      : editTask({ taskId: task.taskId, completed: !task.completed });
  };

  const renderLeftActions = () => (
    <View
      style={[styles.swipeButton, { backgroundColor: "#aaa", paddingLeft: 15 }]}
    >
      <Fontisto
        name={task.completed ? "undo" : "check"}
        size={24}
        color="#3B4552"
      />
    </View>
  );

  const renderRightActions = () => (
    <View
      style={[
        styles.swipeButton,
        {
          backgroundColor: "#E63946",
          alignItems: "flex-end",
          paddingRight: 15,
        },
      ]}
    >
      <Feather name="trash-2" size={24} color="#3B4552" />
    </View>
  );

  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={(direction) => handleSwipe(direction)}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("TaskModal", { task })}
      >
        <View
          style={[
            styles.taskContainer,
            { backgroundColor: !task.completed ? "#2B78C2" : "#14a2eb" },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.boldText}>{truncateText(task.name, 20)}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                editTask({ taskId: task.taskId, completed: !task.completed });
              }}
            ></TouchableOpacity>
          </View>

          <View style={styles.textView}>
            <Text style={[styles.text]}>
              Do by:
            </Text>
            <Text style={[isTaskOverdue(task.completeBy)
              ? styles.overDueText : styles.text, { paddingLeft: 6 }]}>
              {formatDateString(task.completeBy)}
            </Text>
          </View>

          {task.description && (
            <Text style={[styles.text, { fontSize: 16, paddingLeft: 10 }]}>
              {" "}
              {task.description}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    width: width * (5 / 6),
    alignItems: "flex-start",
    borderRadius: 10, // Adjust border radius for curved edges
    padding: 3, // Adjust padding as needed
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
  },
  textView: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingLeft: 15,
  },
  text: {
    fontFamily: "InknutAntiqua_400Regular",
    color: "#F8F9FA",
    marginBottom: 0,
    textAlign: "left",
    alignSelf: "stretch",
  },
  overDueText: {
    fontFamily: "InknutAntiqua_400Regular",
    color: "#FF0000",
    marginBottom: 0,
    textAlign: "left",
    alignSelf: "stretch",
    paddingLeft: 10,
  },
  boldText: {
    fontFamily: "InknutAntiqua_700Bold",
    fontSize: 16,
    paddingLeft: 15,
    color: "#F8F9FA",
    marginBottom: 0,
  },
  button: {
    backgroundColor: "transparent", // Adjust as needed for visibility
    padding: 10,
  },
  swipeButton: {
    justifyContent: "center",
    width: width * (5 / 6),
    borderRadius: 10,
    height: "auto",
  },
});
