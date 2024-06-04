import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskModal from "../modals/TaskModal";
import ListItemScreen from "../screens/ListItemScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import SignupScreen from "../screens/SignupScreen";
import SearchScreen from "../screens/SearchScreen";
import { TabNavigator } from "./TabNavigator";
import { useAuthToken } from "../hooks/useAuthToken";
import LoadingScreen from "../screens/LoadingScreen";
import { Task } from "../types/taskTypes"

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  LandingPage: undefined;
  Profile: undefined;
  Tasks: undefined;
  Search: undefined;
  Signup: undefined;
  TaskModal: {
    task?: Task
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  const { data: authToken, isLoading } = useAuthToken();

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="LandingPage"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{ headerShown: false, presentation: "modal" }}
      >
        <Stack.Screen name="TaskModal" component={TaskModal} />
      </Stack.Group>
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
    </Stack.Navigator>
  );
};
