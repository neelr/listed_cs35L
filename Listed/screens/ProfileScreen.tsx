import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../routes/StackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CommonActions } from '@react-navigation/native';
import { useQueryClient } from "@tanstack/react-query";
import { TaskView } from "../components/TaskView";
import { Task } from "../types/taskTypes";
import { useUserFriends } from "../hooks/useUserFriends";
import { useCurrentUser } from "../hooks/useCurrentUser";
import * as SecureStore from "expo-secure-store";
import CircleAddButton from "../components/CircleAddButton";
import { useFriendTasks } from "../hooks/useFriendTasks";

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, "Profile">;

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [followingTasks, setFollowingTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<"ToDo" | "Completed" | "Calendar">(
    "ToDo"
  );
  const queryClient = useQueryClient();

  const { data: userData } = useCurrentUser();

  const {
    data: friends,
    isLoading,
    error,
  } = useUserFriends(userData?.friends || []);

  const { data: friendTasks, isLoading: friendTasksLoading } = useFriendTasks(userData?.friends || []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        height: 60,
      }}>
        <Text
          style={{
            ...styles.followButton,
            backgroundColor: "#E63946",
            height: 13
          }}
          onPress={async () => {
            queryClient.removeQueries();

            await SecureStore.deleteItemAsync("token");

            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          }}
        >
          <Text style={styles.followButtonText}>
            Logout
          </Text>
        </Text>
      </View>
      <View style={styles.profileContainer}>
        <View
          style={{
            marginTop: 50,
          }}
        >
          <Text style={styles.name}>{userData?.username}</Text>
          <Text style={styles.username}>
            Following: {friends?.map((friend) => friend.username).join(", ")}
          </Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            {friendTasks?.length === 0 && <Text>No tasks yet!</Text>}
            <FlatList
              data={friendTasks} // Passed tasks state to FlatList
              keyExtractor={(item) => item.userId + item.taskId} // Set key extractor
              renderItem={(item) => (
                <View style={styles.taskCard}>
                  <Text style={{
                    fontWeight: "bold",
                    fontSize: 20,
                  }}>user: {friends?.find((x) => x.userId == item.item.userId)?.username}</Text>
                  <Text style={{
                    fontWeight: "bold",
                    fontSize: 16,
                  }}>{item.item.name}</Text>
                  <Text>{item.item.description}</Text>
                </View>
              )} // Render each task using Task component
            />
          </>
        )}
      </View>
      <View style={styles.tabsContainer}>
        {followingTasks.map((task) => (
          <TaskView task={task} navigation={navigation} />
        ))}
      </View>
    </SafeAreaView >
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  profileContainer: {
    alignItems: "flex-start",
    padding: 0,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    width: "100%",
    // elevation: 4,
    marginTop: -25,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -4,
    marginStart: 0,
    marginRight: 23,
    borderColor: "#4B88A2",
    borderWidth: 2,
  },
  username: {
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
    marginStart: 1,
    marginTop: 10,
    marginBottom: 0,
    color: "#000",
  },
  name: {
    fontSize: 20,
    marginStart: 0,
    marginTop: -3,
    marginBottom: 12,
    fontWeight: "bold",
    color: "#333",
  },
  followContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginStart: 0,
    marginBottom: 0,
  },
  bio: {
    fontSize: 13,
    color: "#666",
    textAlign: "left",
    marginTop: -3,
    marginBottom: 15,
    width: "100%",
  },
  followBox: {
    alignItems: "center",
    flex: 1,
  },
  verticalBar: {
    width: 1,
    height: "80%",
    backgroundColor: "#ccc",
  },
  followCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  followLabel: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  followButton: {
    flex: 1,
    backgroundColor: "#4B88A2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  followingButton: {
    backgroundColor: "#E63946",
  },
  followButtonText: {
    color: "#ffffff",
    fontSize: 15,
    marginTop: -1,
    fontWeight: "bold",
  },
  PokeButton: {
    flex: 1,
    backgroundColor: "#4B88A2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  PokeButtonText: {
    color: "#ffffff",
    fontSize: 15,
    marginTop: -1,
    fontWeight: "bold",
  },
  separator: {
    width: "83%",
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 14,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: -3,
    marginVertical: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    position: "relative",
    flex: 1,
    alignItems: "center",
  },
  activeTabButton: {
    backgroundColor: "#fff",
  },
  tabButtonText: {
    fontSize: 15,
    color: "#000",
  },
  activeTabIndicator: {
    position: "static",
    bottom: -10,
    left: 0,
    right: 0,
    height: 1,
    width: 80,
    backgroundColor: "#888",
  },
  tabSeparator: {
    height: "65%",
    width: 1,
    backgroundColor: "#ccc",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ebebeb",
    borderRadius: 10,
    padding: 20,
  },
  taskList: {
    width: "100%",
  },
  taskCard: {
    backgroundColor: "#839ea0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  taskDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
  },
  goBackButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  goBackButtonText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
});
