import React, { useState } from 'react'; 
import { Dimensions, StyleSheet, View, Text, FlatList } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { TaskProps, Task } from '../components/Task';
import CircleAddButton from '../components/CircleAddButton';

type ListItemScreenProps = NativeStackScreenProps<RootStackParamList, 'ListItem'>;

const { width, height } = Dimensions.get('window');

// Sample task data
const sampleTasks: Task[] = [
    { completed: false, completeBy: '2024-05-31', description: "I have to do XYS", taskId: '1', userIds: ['u1', 'u2'] },
    { completed: true, completeBy: '2024-06-01', description: "I have to do ABC", taskId: '2', userIds: ['u3'] },
    { completed: false, completeBy: '2024-06-02', description: "I have to do LKJ", taskId: '3', userIds: ['u4', 'u5', 'u6'] },
    { completed: false, completeBy: '2024-06-02', description: "I have to do LJ", taskId: '4', userIds: ['u4', 'u5', 'u6'] },
    { completed: false, completeBy: '2024-06-02', description: "I have to do KJ", taskId: '5', userIds: ['u4', 'u5', 'u6'] },
    { completed: false, completeBy: '2024-06-02', description: "I have to do J", taskId: '6', userIds: ['u4', 'u5', 'u6'] },
    { completed: false, completeBy: '2024-06-02', description: "I have to do K", taskId: '7', userIds: ['u4', 'u5', 'u6'] },
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
        renderItem={(item) => (<Task task={item.item}/>)} // Render each task using Task component
     />

     <CircleAddButton title='+' onPress={() => {navigation.navigate("AddTaskModal")}} style={styles.button}></CircleAddButton>
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
      // marginBottom: 20, 
    },
    button: {
      position: 'absolute',
      bottom: width * 0.01, // Distance from the bottom of the screen
      right: height * 0.01,  // Distance from the right side of the screen
    },
  });
  
  export default ListItemScreen;
  