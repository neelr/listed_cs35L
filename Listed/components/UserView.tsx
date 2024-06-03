import React from "react";
import { Dimensions, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { User } from "../types/userTypes";
import { withSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export interface UserProps {
  user: User;
}

const truncateText = (text: string, maxLength: number): string => {

  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

export const UserView: React.FC<UserProps> = ({ user }) => {
  const handleAddFriend = () => {
    
  };
  
  return (
    <View style={styles.taskContainer}>
      <View style={styles.header}>
        <Text style={styles.boldText}>{truncateText(user.username, 20)}</Text>
        <TouchableOpacity style={styles.button} onPress={ handleAddFriend }>
          <Text style={styles.buttonText}>Add friend</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Email: {user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    width: width * (5/6),
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
    fontSize: 16,
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
