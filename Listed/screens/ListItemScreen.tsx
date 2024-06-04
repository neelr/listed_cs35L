import React from "react";
import { Dimensions, StyleSheet, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/StackNavigator";
import { TaskView } from "../components/TaskView";
import CircleAddButton from "../components/CircleAddButton";
import { useUserTasks } from "../hooks/useUserTasks";
import WarningMessage from "../components/WarningText";
import { USER_TASKS_QUERY_KEY } from "../hooks/useUserTasks";

type ListItemScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ListItem"
>;

const { width, height } = Dimensions.get("window");

const ListItemScreen: React.FC<ListItemScreenProps> = ({ navigation }) => {
  const { data: tasksRaw, isLoading, error } = useUserTasks();

  console.log(tasksRaw);
  const tasks = tasksRaw?.filter?.((tasksRaw) => !tasksRaw.completed) || [];
  const tasksComplete =
    tasksRaw?.filter?.((tasksRaw) => tasksRaw.completed) || [];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Task List</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {tasks?.length === 0 && <Text>No tasks yet!</Text>}
          <FlatList
            data={tasks} // Passed tasks state to FlatList
            keyExtractor={(item) => item.taskId} // Set key extractor
            renderItem={(item) => (
              <TaskView task={item.item} navigation={navigation} />
            )} // Render each task using Task component
          />

          {tasksComplete?.length != 0 && (
            <Text style={styles.completedText}>Completed Tasks</Text>
          )}
          <FlatList
            data={tasksComplete}
            keyExtractor={(item) => item.taskId}
            renderItem={(item) => (
              <TaskView task={item.item} navigation={navigation} />
            )}
          />

          <CircleAddButton
            title="+"
            onPress={() => {
              navigation.navigate("AddTaskModal");
            }}
            style={styles.button}
          ></CircleAddButton>
        </>
      )}
      <WarningMessage message={error?.message} visible={!!error} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  title: {
    fontFamily: "InknutAntiqua_400Regular",
    fontSize: width / 10.0,
    color: "#3B4552",
  },
  completedText: {
    fontFamily: "InknutAntiqua_300Light",
    fontSize: width / 20.0,
    color: "#3B4552",
  },
  button: {
    position: "absolute",
    bottom: width * 0.01, // Distance from the bottom of the screen
    right: height * 0.01, // Distance from the right side of the screen
  },
});

export default ListItemScreen;
