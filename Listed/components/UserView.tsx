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
      <View style={userData?.friends.includes(user.userId) ? styles.removeFriendContainer : styles.addFriendContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.boldText}>{truncateText(user.username, 20)}</Text>
            <Text style={styles.text}>{mutualCount} Mutual{mutualCount === 1 ? "" : "s"}</Text>
          </View>
            {userData?.friends.includes(user.userId) ? (
              <TouchableOpacity style={styles.buttonRemove} onPress={handleAddFriend}>
                <Text style={styles.removeFriend}>Remove friend</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.buttonAdd} onPress={handleAddFriend}>
                <Text style={styles.addFriend}>Add friend</Text>
              </TouchableOpacity>
            )}
        </View>
      </View>) : (
      <></>
    )
  );
};

const styles = StyleSheet.create({
  addFriendContainer: {
    width: width * (5 / 6),
    marginBottom: 20, // Adjust spacing between tasks
    alignItems: "center",
    backgroundColor: "#2B78C2",
    borderRadius: 10, // Adjust border radius for curved edges
    padding: 3, // Adjust padding as needed
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  removeFriendContainer: {
    width: width * (5 / 6),
    marginBottom: 20, // Adjust spacing between tasks
    alignItems: "center",
    backgroundColor: "#7BC8F2",
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
    marginTop: -5,
    marginBottom: 5,
    textAlign: "left",
    alignSelf: "stretch",
    paddingLeft: 15,
  },
  boldText: {
    fontFamily: "InknutAntiqua_700Bold",
    fontSize: 16,
    color: "#F8F9FA",
    paddingLeft: 15,
    marginBottom: 0,
  },
  buttonAdd: {
    backgroundColor: "#CDE8FA",
    borderRadius: 10,
    padding: 10,
    marginRight: 10
  },
  buttonRemove: {
    backgroundColor: "#CDE8FA",
    borderRadius: 10,
    padding: 10,
    marginRight: 10
  },
  addFriend: {
    fontFamily: "InknutAntiqua_400Regular",
    color: "#2B78C2",
    fontSize: 12,
    fontWeight: "bold",
  },
  removeFriend: {
    fontFamily: "InknutAntiqua_400Regular",
    color: "#FF4444",
    fontSize: 12,
    fontWeight: "bold",
  },
});
