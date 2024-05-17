import React from "react";
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, GestureResponderEvent, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  InknutAntiqua_300Light,
  InknutAntiqua_400Regular,
  InknutAntiqua_500Medium,
  InknutAntiqua_600SemiBold,
  InknutAntiqua_700Bold,
  InknutAntiqua_800ExtraBold,
  InknutAntiqua_900Black,
} from '@expo-google-fonts/inknut-antiqua';
import HomeButton from "../components/HomeButton";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../App";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const { width } = Dimensions.get('window');

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) =>{
  let [fontsLoaded] = useFonts({
    InknutAntiqua_300Light,
    InknutAntiqua_400Regular,
    InknutAntiqua_500Medium,
    InknutAntiqua_600SemiBold,
    InknutAntiqua_700Bold,
    InknutAntiqua_800ExtraBold,
    InknutAntiqua_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.mainScreen}>
        <View style={styles.titleContainer} >
          <Text style={styles.title}>Listed</Text>
          <Image style={styles.image} source={require("../assets/notebook.png")}></Image>
        </View>
        <HomeButton title="Log in" onPress={() => { navigation.navigate("Next") }}></HomeButton>
        <HomeButton title="Sign up" onPress={() => { }}></HomeButton>
        <HomeButton title="Profile" onPress={() => { navigation.navigate("Profile") }}></HomeButton>


        <StatusBar hidden={true} />
      </SafeAreaView>
    );
  }
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
    fontFamily: "InknutAntiqua_400Regular",
    fontSize: width/10.0,
    color: "#3B4552",
  },


  image: {
    height: 100,
    width: 100,
  },
});

export default HomeScreen;