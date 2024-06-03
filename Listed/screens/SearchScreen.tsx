import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, FlatList } from "react-native";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/StackNavigator";
import { UserView } from "../components/UserView";
import { useSearchUsers } from "../hooks/useSearchUsers";
import WarningMessage from "../components/WarningText";
import Spacer from "../components/Spacer";

type SearchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "AddFriends"
>;

const { width, height } = Dimensions.get("window");

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const { data: friends, isLoading, error } = useSearchUsers("dude");
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Search Friends</Text>
      <TextInput
        style={[
          styles.input,
          { marginTop: height * 0.05, paddingRight: width * 0.04 },
        ]}
        placeholder="Search for users"
        placeholderTextColor="#aaa"
      />
      <Spacer height={height * 0.05} />
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {friends?.length === 0 && <Text>No results!</Text>}
          <FlatList
            data={friends} // Passed tasks state to FlatList
            keyExtractor={(inUser) => inUser.email} // Set key extractor
            renderItem={(inUser) => <UserView user={inUser.item} />} // TODO: replace TaskView with new view
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
  input: {
    height: height * 0.07,
    width: width * 0.6,
    backgroundColor: "#DDDDDD",
    borderWidth: 0,
    borderRadius: 10,
    fontFamily: "InknutAntiqua_400Regular",
    paddingLeft: width * 0.04,
    color: "#3B4552",
    textAlignVertical: "center",
  },
  button: {
    position: "absolute",
    bottom: width * 0.01, // Distance from the bottom of the screen
    right: height * 0.01, // Distance from the right side of the screen
  },
});

export default SearchScreen;
