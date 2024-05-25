import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type TaskProps = {
  task: {
    completed: boolean;
    completeBy: string;
    taskId: string;
    userIds: string[];
  };
};

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <View style={styles.taskContainer}>
      <Text>Task ID: {task.taskId}</Text>
      <Text>Complete By: {task.completeBy}</Text>
      <Text>Completed: {task.completed ? 'Yes' : 'No'}</Text>
      <Text>User IDs: {task.userIds.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
  },
});

export default Task;
