import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RootStackParamList } from "../routes/StackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type TaskManagerProps = NativeStackScreenProps<RootStackParamList, "Signup">;

const TaskManagerScreen: React.FC<TaskManagerProps> = ({ navigation }) => {
  //const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager Goes Here</Text>
      <Button title="Go Back" onPress={() => navigation.navigate("Signin")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default TaskManagerScreen;
