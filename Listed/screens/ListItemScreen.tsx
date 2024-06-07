import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TaskView } from "../components/TaskView";
import CircleIconButton from "../components/CircleAddButton";
import { useUserTasks } from "../hooks/useUserTasks";
import WarningMessage from "../components/WarningText";
import { AntDesign } from "@expo/vector-icons";
import { Task, TaskWithFriendInfo } from "../types/taskTypes";
import { TabParamList } from "../routes/TabNavigator";
import { RootStackParamList } from "../routes/StackNavigator";
import { useUserFriends } from "../hooks/useUserFriends";
import { useCurrentUser } from "../hooks/useCurrentUser";
import {
  getTasksWithFriendInfo,
  getUserIdsFromTasksAndFriends,
  sortByDate,
} from "../utils/sortTasks";

type ListItemScreenProps = NativeStackScreenProps<
  TabParamList & RootStackParamList,
  "Tasks"
>;

const { width, height } = Dimensions.get("window");

const ListItemScreen: React.FC<ListItemScreenProps> = ({ navigation }) => {
  const { data: currentUser } = useCurrentUser();

  const { data: tasksData, isLoading, error } = useUserTasks();

  const otherUserIds = getUserIdsFromTasksAndFriends(tasksData);

  const { data: friends } = useUserFriends(otherUserIds || []);

  let tasksRaw: TaskWithFriendInfo[] = getTasksWithFriendInfo(
    currentUser,
    friends,
    tasksData,
    true
  );

  const tasks = sortByDate(
    tasksRaw.filter?.((tasksRaw) => !tasksRaw.task.completed) || []
  );
  const tasksComplete = sortByDate(
    tasksRaw?.filter?.((tasksRaw) => tasksRaw.task.completed) || []
  );

  const [showCompleted, setShowCompleted] = useState(tasksComplete.length > 0); // Local boolean state

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Task List</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {tasks?.length === 0 && (
            <Text style={styles.noTasksText}>
              {tasksRaw.length === 0
                ? "Get started by making a new task or adding a friend's task!"
                : "All done!"}
            </Text>
          )}
          <FlatList
            data={tasks} // Passed tasks state to FlatList
            keyExtractor={(item) => item.task.taskId} // Set key extractor
            renderItem={({ item }) => (
              <TaskView
                task={item.task}
                navigation={navigation}
                friendNames={
                  item.friendNames.length > 1
                    ? item.friendNames.filter(
                        (name) => name !== currentUser?.username
                      )
                    : undefined
                }
              />
            )} // Render each task using Task component
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />} // Adjust the height for desired padding
          />

          {tasksComplete?.length != 0 && (
            <View
              style={{
                ...styles.completedHeader,
                marginVertical: showCompleted ? 3 : 10,
                paddingBottom: showCompleted ? 5 : 10,
              }}
            >
              <TouchableOpacity
                onPress={() => setShowCompleted(!showCompleted)}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Text style={styles.completedText}>Completed Tasks</Text>
                <AntDesign
                  style={showCompleted && { marginTop: 5 }}
                  name={showCompleted ? "caretleft" : "caretdown"}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          )}

          {showCompleted && tasksComplete.length > 0 && (
            <FlatList
              data={tasksComplete} // Passed tasks state to FlatList
              keyExtractor={(item) => item.task.taskId} // Set key extractor
              renderItem={({ item }) => (
                <TaskView
                  task={item.task}
                  navigation={navigation}
                  friendNames={
                    item.friendNames.length > 1
                      ? item.friendNames.filter(
                          (name) => name !== currentUser?.username
                        )
                      : undefined
                  }
                />
              )} // Render each task using Task component
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />} // Adjust the height for desired padding
            />
          )}
          {currentUser && (
            <CircleIconButton
              name="add"
              onPress={() => {
                navigation.navigate("TaskModal", {});
              }}
              style={styles.button}
            />
          )}
        </>
      )}
      <WarningMessage message={error?.message} visible={!!error} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  title: {
    fontFamily: "InknutAntiqua_400Regular",
    fontSize: width / 10.0,
    color: "#3B4552",
  },
  completedHeader: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "flex-start",
    paddingLeft: 10,
    paddingRight: 30,
  },
  completedText: {
    fontFamily: "InknutAntiqua_300Light",
    fontSize: width / 20.0,
    color: "#3B4552",
    textAlign: "left", // Align text to the left
    alignSelf: "stretch", // Ensure it takes full width
    paddingLeft: 25,
    marginRight: 15,
  },
  noTasksText: {
    fontFamily: "InknutAntiqua_300Light",
    fontSize: width / 20.0,
    color: "#3B4552",
    textAlign: "center", // Align text to the left
    alignSelf: "stretch", // Ensure it takes full width
    paddingHorizontal: 20,
  },
  button: {
    position: "absolute",
    width: width * 0.15, // Set width to a specific percentage of screen width
    height: width * 0.15, // Set height to a specific percentage of screen width
    borderRadius: width * 0.15, // Set border radius to half of width
    bottom: width * 0.07, // Distance from the bottom of the screen
    right: height * 0.06, // Distance from the right side of the screen
  },
});

export default ListItemScreen;
