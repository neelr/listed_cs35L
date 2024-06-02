import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Task } from "../types/taskTypes";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { useDeleteTask } from '../hooks/useDeleteTask';


export interface TaskProps {
  task: Task;
}

const truncateText = (text: string, maxLength: number): string => {

  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

export const TaskView: React.FC<TaskProps> = ({ task }) => {
  const { mutate: deleteTask, isSuccess } = useDeleteTask();

  const handleDelete = () => {
    deleteTask(task.taskId); 
  };
  

  return (
    <View style={styles.taskContainer}>
      <View style={styles.header}>
        <Text style={styles.boldText}>{truncateText(task.name, 20)}</Text>
        <TouchableOpacity style={styles.button} onPress={ handleDelete }>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Completed: {task.completed ? "Yes" : "No"}</Text>
      <Text style={styles.text}>Description: {task.description}</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
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
  button: {
    backgroundColor: "transparent", // Adjust as needed for visibility
    padding: 10,
  },
  buttonText: {
    color: "#F8F9FA",
    fontSize: 16,
    fontWeight: "bold",
  },
});
