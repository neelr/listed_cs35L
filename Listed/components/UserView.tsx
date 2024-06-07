import React from "react";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { User } from "../types/userTypes";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/StackNavigator";
import { useAddOrRemoveFriend } from "../hooks/useAddOrRemoveFriend";
import { useRemoveFriend } from "../hooks/useRemoveFriend";
import { useUserFriends } from "../hooks/useUserFriends";
import { UserPrivate } from "../types/authTypes";

const { width } = Dimensions.get("window");

export interface UserProps {
  userData: UserPrivate;
  user: User;
  mutualCount: number;
}

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};

type UserViewNavigationProp = StackNavigationProp<
  RootStackParamList,
  "UserDetail"
>;

export const UserView: React.FC<UserProps> = ({
  userData,
  user,
  mutualCount,
}) => {
  const isFriend = userData?.friends.includes(user.userId);

  const { mutate: addOrRemoveFriend } = useAddOrRemoveFriend(isFriend);

  const navigation = useNavigation<UserViewNavigationProp>();

  const handlePressUser = () => {
    navigation.navigate("UserDetail", { user });
  };

  return (
    userData?.userId != user.userId && (
      <TouchableOpacity
        onPress={handlePressUser}
        style={
          isFriend ? styles.removeFriendContainer : styles.addFriendContainer
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.boldText}>
              {truncateText(user.username, 20)}
            </Text>
            <Text style={styles.text}>
              {mutualCount} mutual{mutualCount === 1 ? "" : "s"}
            </Text>
          </View>
          {isFriend ? (
            <TouchableOpacity
              style={styles.buttonRemove}
              onPress={() => {
                addOrRemoveFriend(user.userId);
              }}
            >
              <Text style={styles.removeFriend}>Remove Friend</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.buttonAdd}
              onPress={() => {
                addOrRemoveFriend(user.userId);
              }}
            >
              <Text style={styles.addFriend}>Add Friend</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
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
    marginRight: 10,
  },
  buttonRemove: {
    backgroundColor: "#CDE8FA",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  addFriend: {
    fontFamily: "InknutAntiqua_600SemiBold",
    color: "#2B78C2",
    fontSize: 13,
  },
  removeFriend: {
    fontFamily: "InknutAntiqua_600SemiBold",
    color: "#FF4444",
    fontSize: 13,
  },
});
