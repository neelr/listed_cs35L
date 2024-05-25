import React, { useState } from 'react'; 
import { Dimensions, StyleSheet, View, Text, FlatList } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Task from '../components/Task';

type ListItemScreenProps = NativeStackScreenProps<RootStackParamList, 'ListItem'>;

const { width, height } = Dimensions.get('window');

interface Task {
    completed: boolean;
    completeBy: string;
    taskId: string;
    userIds: string[];
}

// Sample task data
const sampleTasks: Task[] = [
    { completed: false, completeBy: '2024-05-31', taskId: '1', userIds: ['u1', 'u2'] },
    { completed: true, completeBy: '2024-06-01', taskId: '2', userIds: ['u3'] },
    { completed: false, completeBy: '2024-06-02', taskId: '3', userIds: ['u4', 'u5', 'u6'] },
  ];



const ListItemScreen: React.FC<ListItemScreenProps> = ({ navigation }) => {
    
     const [tasks, setTasks] = useState(sampleTasks); // Added state for tasks

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Task List</Text> 
      {/* Added title */}
      <FlatList
        data={tasks} // Passed tasks state to FlatList
        keyExtractor={(item) => item.taskId} // Set key extractor
        renderItem={({ item }) => (<Task task={item} />)} // Render each task using Task component
     />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F9FA',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20, 
    },
    title: {
      fontFamily: 'InknutAntiqua_400Regular',
      fontSize: width / 10.0,
      color: '#3B4552',
      marginBottom: 20, 
    },
  });
  
  export default ListItemScreen;
  