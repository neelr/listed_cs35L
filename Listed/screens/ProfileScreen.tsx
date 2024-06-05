import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQueryClient } from "@tanstack/react-query";
import { Task } from "../types/taskTypes";
import { useUserFriends } from "../hooks/useUserFriends";
import { useCurrentUser } from "../hooks/useCurrentUser";
import * as SecureStore from "expo-secure-store";
import { FontAwesome } from '@expo/vector-icons';
import { useFriendTasks } from "../hooks/useFriendTasks";
import CircleAddButton from "../components/CircleAddButton";
import { RootStackParamList } from "../routes/StackNavigator";

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, "Profile">;

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [followingTasks, setFollowingTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<"Tasks" | "Followers">("Tasks");
  const queryClient = useQueryClient();

  const { data: userData } = useCurrentUser();

  const {
    data: friends,
    isLoading,
    error,
  } = useUserFriends(userData?.friends || []);

  const { data: friendTasks, isLoading: friendTasksLoading } = useFriendTasks(userData?.friends || []);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: async () => {
            queryClient.removeQueries();
            await SecureStore.deleteItemAsync("token");
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout}>
          <FontAwesome name="sign-out" size={24} color="#3B4552" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.name}>{userData?.username}</Text>
        <View style={styles.followersContainer}>
          <Text style={styles.followersCount}>{friends?.length}</Text>
          <Text style={styles.followersLabel}>Friends</Text>
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
          <Text style={[styles.tabButtonText, activeTab === "Tasks" && styles.activeTabButtonText]}>Friend's Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Followers" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("Followers")}
        >
          <Text style={[styles.tabButtonText, activeTab === "Followers" && styles.activeTabButtonText]}>Friends List</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <View style={styles.contentContainer}>
        {activeTab === "Tasks" ? (
          isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              {friendTasks?.length === 0 && <Text>No tasks yet!</Text>}
              <FlatList
                data={friendTasks}
                keyExtractor={(item) => item.userId + item.taskId}
                renderItem={(item) => (
                  <View style={styles.taskCard}>
                    <Text style={styles.taskUser}>{friends?.find((x) => x.userId == item.item.userId)?.username}</Text>
                    <Text style={styles.taskTitle}>{item.item.name}</Text>
                    <Text style={styles.taskDescription}>{item.item.description}</Text>
                  </View>
                )}
              />
            </>
          )
        ) : (
          <FlatList
            data={friends}
            keyExtractor={(item) => item.userId}
            renderItem={({ item }) => (
              <View style={styles.friendCard}>
                <Text style={styles.friendName}>{item.username}</Text>
              </View>
            )}
          />
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
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  logoutContainer: {
    height: 60,
    alignSelf: 'flex-end',
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
    fontFamily: "InknutAntiqua_300Light",
    fontSize: 24,
    fontWeight: "bold",
    color: "#3B4552",
    marginTop: -15,
    textAlign: "center",
  },
  followersCount: {
    fontFamily: "InknutAntiqua_300Light",
    fontSize: 28,
    fontWeight: "bold",
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
    fontFamily: "InknutAntiqua_400Regular",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: -10,
    color: "#3B4552",
  },
  taskTitle: {
    fontFamily: "InknutAntiqua_300Light",
    fontSize: 13,
    fontWeight: "bold",
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
    fontFamily: "InknutAntiqua_300Light",
    fontSize: 15,
    fontWeight: "bold",
    color: "#3B4552",
  },
});
