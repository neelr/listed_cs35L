import React from "react";
import { Dimensions, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { User } from "../types/userTypes";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { authClient } from "../api/authClient";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useQueryClient } from "@tanstack/react-query";
import { CURRENT_USER_QUERY_KEY } from "../hooks/useCurrentUser";
import { FRIEND_TASKS_QUERY_KEY } from "../hooks/useFriendTasks";


const { width, height } = Dimensions.get("window");

export interface UserProps {
  user: User;
  mutualCount: number;
}

const truncateText = (text: string, maxLength: number): string => {

  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

export const UserView: React.FC<UserProps> = ({ user, mutualCount }) => {
  const { data: userData } = useCurrentUser();

  const queryClient = useQueryClient();

  const handleAddFriend = async () => {
    if (userData?.friends.includes(user.userId)) {
      let resp = await authClient.put("/friend", {
        friendId: user.userId,
      });
    } else {
      await authClient.post("/friend", {
        friendId: user.userId,
      });
    }
    queryClient.invalidateQueries({
      queryKey: [CURRENT_USER_QUERY_KEY],
    });
    queryClient.invalidateQueries({
      queryKey: [FRIEND_TASKS_QUERY_KEY],
    });
  };

  return (
    userData?.userId != user.userId ? (
      <View style={styles.taskContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.boldText}>{truncateText(user.username, 20)}</Text>
            <Text style={styles.text}>{mutualCount} Mutuals</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleAddFriend}>
            {userData?.friends.includes(user.userId) ? (
              <Text style={styles.buttonText}>Remove friend</Text>
            ) : (
              <Text style={styles.buttonText}>Add friend</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>) : (
      <></>
    )
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    width: width * (5 / 6),
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
    fontSize: 12,
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
    paddingLeft: 10,
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
