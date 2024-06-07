import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQueryClient } from "@tanstack/react-query";
import {
  useUserFriends,
  USER_FRIENDS_QUERY_KEY,
} from "../hooks/useUserFriends";
import {
  CURRENT_USER_QUERY_KEY,
  useCurrentUser,
} from "../hooks/useCurrentUser";
import * as SecureStore from "expo-secure-store";
import { FontAwesome } from "@expo/vector-icons";
import {
  FRIEND_TASKS_QUERY_KEY,
  useFriendTasks,
} from "../hooks/useFriendTasks";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { useFocusEffect } from "@react-navigation/native";
import { TabParamList } from "../routes/TabNavigator";
import { RootStackParamList } from "../routes/StackNavigator";
import { TaskView } from "../components/TaskView";
import { UserView } from "../components/UserView";
import {
  getTasksWithFriendInfo,
  getUserIdsFromTasksAndFriends,
  sortByDateAndCompleted,
} from "../utils/sortTasks";
import { TaskWithFriendInfo } from "../types/taskTypes";

type ProfileScreenProps = NativeStackScreenProps<
  TabParamList & RootStackParamList,
  "Profile"
>;

const { width, height } = Dimensions.get("window");

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<"Tasks" | "Followers">("Tasks");
  const queryClient = useQueryClient();

  const { data: currentUser } = useCurrentUser();

  const { data: friendTasksData } = useFriendTasks(currentUser?.friends || []);
  const otherUserIds = getUserIdsFromTasksAndFriends(
    friendTasksData,
    currentUser?.friends
  );

  const { data: friends, isLoading } = useUserFriends(otherUserIds);

  const friendTasks = sortByDateAndCompleted(
    getTasksWithFriendInfo(currentUser, friends, friendTasksData, true)
  );

  const onLogoutOrDelete = async () => {
    queryClient.removeQueries();
    await SecureStore.deleteItemAsync("token");
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  const { mutate: deleteUserMutation } = useDeleteUser({
    onSuccess: onLogoutOrDelete,
  });

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({ queryKey: [CURRENT_USER_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [USER_FRIENDS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [FRIEND_TASKS_QUERY_KEY] });
    }, [USER_FRIENDS_QUERY_KEY, FRIEND_TASKS_QUERY_KEY, CURRENT_USER_QUERY_KEY])
  );

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        onPress: onLogoutOrDelete,
      },
    ]);
  };

  const handleDeleteUser = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? (This will remove your tasks as well!)",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteUserMutation();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          onPress={handleDeleteUser}
          style={{ marginRight: 20 }}
        >
          <FontAwesome name="trash" size={24} color="#3B4552" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <FontAwesome name="sign-out" size={24} color="#3B4552" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.name}>{currentUser?.username}</Text>
        <View style={styles.followersContainer}>
          <Text style={styles.followersCount}>
            {currentUser?.friends ? currentUser.friends.length : 0}
          </Text>
          <Text style={styles.followersLabel}>
            Friend{friends?.length != 1 ? "s" : ""}
          </Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Tasks" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("Tasks")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "Tasks" && styles.activeTabButtonText,
            ]}
          >
            Friends' Tasks
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Followers" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("Followers")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "Followers" && styles.activeTabButtonText,
            ]}
          >
            Friends List
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <View style={styles.contentContainer}>
        {activeTab === "Tasks" ? (
          isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              {friendTasks.length === 0 ? (
                <Text
                  style={{
                    fontFamily: "InknutAntiqua_500Medium",
                    color: "#3B4552",
                  }}
                >
                  No tasks yet!
                </Text>
              ) : (
                <FlatList
                  data={friendTasks}
                  keyExtractor={({ task }) => task.userId + task.taskId}
                  renderItem={({ item }) => (
                    <TaskView
                      task={item.task}
                      navigation={navigation}
                      friendNames={item.friendNames}
                    />
                  )}
                  ItemSeparatorComponent={() => <View style={{ height: 12 }} />} // Adjust the height for desired padding
                />
              )}
            </>
          )
        ) : (
          <>
            {friends?.length === 0 && (
              <Text
                style={{
                  fontFamily: "InknutAntiqua_500Medium",
                  color: "#3B4552",
                }}
              >
                No friends yet!
              </Text>
            )}
            {currentUser && (
              <FlatList
                data={friends?.filter((friend) =>
                  currentUser?.friends?.includes(friend.userId)
                )}
                keyExtractor={(item) => item.userId}
                renderItem={({ item }) => (
                  <UserView userData={currentUser} user={item} />
                )}
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  logoutContainer: {
    height: height * 0.07,
    width: width,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  profileContainer: {
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    marginTop: -20,
    marginBottom: 10,
  },
  followersContainer: {
    alignItems: "center",
    marginVertical: 5,
  },
  name: {
    fontFamily: "InknutAntiqua_500Medium",
    fontSize: 24,
    color: "#3B4552",
    marginTop: -15,
    textAlign: "center",
  },
  followersCount: {
    fontFamily: "InknutAntiqua_500Medium",
    fontSize: 28,
    marginTop: -30,
    color: "#3B4552",
  },
  followersLabel: {
    fontFamily: "InknutAntiqua_300Light",
    fontSize: 14,
    marginTop: -12,
    marginBottom: -12,
    color: "#666",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginVertical: 8,
  },
  tabButton: {
    paddingHorizontal: 16,
    borderRadius: 15,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 4,
  },
  activeTabButton: {
    backgroundColor: "#2B78C2",
  },
  tabButtonText: {
    fontFamily: "InknutAntiqua_300Light",
    fontSize: 12,
    color: "#3B4552",
  },
  activeTabButtonText: {
    color: "#fff",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  taskCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  taskUser: {
    fontFamily: "InknutAntiqua_600SemiBold",
    fontSize: 15,
    marginTop: -10,
    color: "#3B4552",
  },
  taskTitle: {
    fontFamily: "InknutAntiqua_500Medium",
    fontSize: 13,
    color: "#3B4552",
    marginTop: -12,
  },
  taskDescription: {
    fontFamily: "InknutAntiqua_300Light",
    fontSize: 7,
    color: "#666",
    marginTop: -5,
  },
  friendCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  friendName: {
    fontFamily: "InknutAntiqua_500Medium",
    fontSize: 15,
    color: "#3B4552",
  },
});
