import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/StackNavigator";
import { TaskView } from "../components/TaskView";
import { useSearchUsers } from "../hooks/useSearchUsers";
import WarningMessage from "../components/WarningText";

type SearchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "AddFriends"
>;

const { width, height } = Dimensions.get("window");

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const { data: friends, isLoading, error } = useSearchUsers();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Search Friends</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {friends?.length === 0 && <Text>No results!</Text>}
          <FlatList
            data={friends} // Passed tasks state to FlatList
            keyExtractor={(item) => item.taskId} // Set key extractor
            renderItem={(item) => <TaskView task={item.item} />} // TODO: replace TaskView with new view
          />
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
    // marginBottom: 20,
  },
  button: {
    position: "absolute",
    bottom: width * 0.01, // Distance from the bottom of the screen
    right: height * 0.01, // Distance from the right side of the screen
  },
});

export default SearchScreen;
