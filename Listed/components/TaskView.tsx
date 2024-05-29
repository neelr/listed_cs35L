import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Task } from "../types/taskTypes";

export interface TaskProps {
  task: Task;
}

export const TaskView: React.FC<TaskProps> = ({ task }) => {
  return (
    <View style={styles.taskContainer}>
      <Text style={{ fontWeight: "bold" }}>{task.name}</Text>
      <Text>Complete By: {task.completeBy}</Text>
      <Text>Completed: {task.completed ? "Yes" : "No"}</Text>
      {task.description && <Text>Description: {task.description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    marginBottom: 20, // Adjust spacing between tasks
    alignItems: "center",
    backgroundColor: "#e3f2fd",
    borderRadius: 10, // Adjust border radius for curved edges
    padding: 20, // Adjust padding as needed
    borderWidth: 1,
    borderColor: "#2196f3",
  },

  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});
