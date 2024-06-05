import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeButton from "../components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/StackNavigator";

type SigninScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const { width, height } = Dimensions.get("window");

const SigninScreen: React.FC<SigninScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.mainScreen}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Listed</Text>
        <Image
          style={styles.image}
          source={require("../assets/notebook.png")}
        ></Image>
      </View>
      <HomeButton
        title="Log in"
        onPress={() => {
          navigation.navigate("Login");
        }}
        customStyles={{ marginTop: height / 12.0 }}
      ></HomeButton>
      <HomeButton
        title="Sign up"
        onPress={() => {
          navigation.navigate("Signup");
        }}
        customStyles={{ marginTop: height / 25.0 }}
      ></HomeButton>
      <StatusBar hidden={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: "#A2D2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    flex: 0.5,
    fontWeight: "bold",
    fontFamily: "InknutAntiqua_400Regular",
    fontSize: width / 10.0,
    color: "#3B4552",
  },

  image: {
    height: 100,
    width: 100,
  },
});

export default SigninScreen;
