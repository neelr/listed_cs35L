import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Task } from "../types/taskTypes";
import { withSafeAreaInsets } from "react-native-safe-area-context";

export interface TaskProps {
  task: Task;
}

export const TaskView: React.FC<TaskProps> = ({ task }) => {
  return (
    <View style={styles.taskContainer}>
      <Text style={styles.boldText}>{task.name}</Text>
      <Text style={styles.text}>Complete By: {task.completeBy}</Text>
      <Text style={styles.text}>Completed: {task.completed ? "Yes" : "No"}</Text>
      {task.description && <Text style={styles.text}>Description: {task.description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    marginBottom: 20, // Adjust spacing between tasks
    alignItems: "center",
    backgroundColor: "#2B78C2",
    borderRadius: 10, // Adjust border radius for curved edges
    padding: 3, // Adjust padding as needed
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },

  text: {
    fontFamily: "InknutAntiqua_400Regular",
    fontSize: 16,
    color: "#F8F9FA",
    marginBottom: 0,
    textAlign: "left", 
    alignSelf: "stretch",
    paddingLeft: 10,
  },

  boldText: {
    fontFamily: "InknutAntiqua_700Bold",
    fontSize: 16,
    color: "#F8F9FA",
    marginBottom: 0,
  },
  
});
