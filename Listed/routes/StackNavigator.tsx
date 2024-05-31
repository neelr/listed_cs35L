import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTaskModal from "../modals/AddTaskModal";
import ListItemScreen from "../screens/ListItemScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import SignupScreen from "../screens/SignupScreen";
import { TabNavigator } from "./TabNavigator";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  LandingPage: undefined;
  Profile: undefined;
  ListItem: undefined;
  Signup: undefined;
  AddTaskModal: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => (
  <Stack.Navigator initialRouteName="LandingPage">
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="LandingPage"
      component={TabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ListItem"
      component={ListItemScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AddTaskModal"
      component={AddTaskModal}
      options={{ headerShown: false, presentation: "modal" }}
    />
    {/* <Stack.Screen name='Task' component={TaskManagerScreen} options={{ headerShown: false }} /> */}
  </Stack.Navigator>
);
