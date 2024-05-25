import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";
import HomeButton from "../components/Button";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../App";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const { width, height } = Dimensions.get('window');
//Huh

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.mainScreen}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Listed</Text>
        <Image style={styles.image} source={require("../assets/notebook.png")}></Image>
      </View>
      <HomeButton title="Log in" onPress={() => { navigation.navigate("Login") }} margin={height / 25.0}></HomeButton>
      <HomeButton title="Sign up" onPress={() => { navigation.navigate("Signup") }}></HomeButton>
      <HomeButton title="Profile" onPress={() => { navigation.navigate("Profile") }} margin={height / 25.0}></HomeButton>
      <StatusBar hidden={true} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: '#A2D2FF',
    alignItems: 'center',
    justifyContent: 'center'
  },


  titleContainer: {
    flexDirection: "row",
    alignItems: 'center',
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

export default HomeScreen;