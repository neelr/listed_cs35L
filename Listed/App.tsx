import React from "react";
import HomeScreen from "./screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ListItemScreen from "./screens/ListItemScreen";
import ProfileScreen from "./screens/ProfileScreen";
import TestModalScreen from "./screens/TestModalScreen";
import AddTaskModal from "./modals/AddTaskModal";
import SigninScreen from "./screens/SigninScreen";
import TaskManagerScreen from "./screens/TaskManagerScreen";
import {
  useFonts,
  InknutAntiqua_300Light,
  InknutAntiqua_400Regular,
  InknutAntiqua_500Medium,
  InknutAntiqua_600SemiBold,
  InknutAntiqua_700Bold,
  InknutAntiqua_800ExtraBold,
  InknutAntiqua_900Black,
} from "@expo-google-fonts/inknut-antiqua";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export type RootStackParamList = {
  Signin: undefined;
  Login: undefined;
  Signup: undefined;
  Profile: undefined;
  Home: undefined;
  TaskManager: undefined;
  ListItem: undefined;
  TestModalScreen: undefined;
  AddTaskModal: undefined;
};

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Tasks: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName: string = "";

        if (route.name === "Home") {
          iconName = "home-outline";
        } else if (route.name === "Profile") {
          iconName = "person-outline";
        } else if (route.name === "Tasks") {
          iconName = "list-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
      headerShown: false, // Hide header for all tab screens
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Tasks" component={TaskManagerScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    InknutAntiqua_300Light,
    InknutAntiqua_400Regular,
    InknutAntiqua_500Medium,
    InknutAntiqua_600SemiBold,
    InknutAntiqua_700Bold,
    InknutAntiqua_800ExtraBold,
    InknutAntiqua_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signin">
        <Stack.Screen
          name="Signin"
          component={SigninScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TaskManager"
          component={TaskManagerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListItem"
          component={ListItemScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TestModalScreen"
          component={TestModalScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddTaskModal"
          component={AddTaskModal}
          options={{ presentation: "modal", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
