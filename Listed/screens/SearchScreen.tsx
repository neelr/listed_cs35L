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
import { useCurrentUser } from "../hooks/useCurrentUser";
import { getMutualCount, rankUsers } from "../utils/rankUsers";
import { User } from "../types/userTypes";

const RESULTS_COUNT = 10;

type SearchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Search"
>;

const { width, height } = Dimensions.get("window");

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const { data: currentUser } = useCurrentUser();
  const { data: friends, isLoading, error } = useSearchUsers("");
  const results: [User[], number]  = rankUsers(friends, searchText, RESULTS_COUNT, currentUser);
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
        value={searchText}
        onChangeText={setSearchText}
      />
      <Spacer height={height * 0.05} />
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {results[0]?.length === 0 && <Text>No results!</Text>}
          <FlatList
            data={results[0]} // Passed tasks state to FlatList
            keyExtractor={(inUser) => inUser.userId} // Set key extractor
            renderItem={(inUser) => <UserView user={inUser.item} mutualCount={getMutualCount(currentUser, inUser.item)} />}
          />
        </>
      )}
      {results[1] === 0 ? (<></>) : (
      results[1] > RESULTS_COUNT ? (
        <Text style={styles.text}>{RESULTS_COUNT} of {results[1]} results shown</Text>
      ) : (
        <Text style={styles.text}>{results[1]} result{results[1] === 1 ? "" : "s"}</Text>
      ))}
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
  text: {
    fontFamily: "InknutAntiqua_400Regular",
    marginTop: 10
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
