import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTaskModal from "../modals/AddTaskModal";
import ListItemScreen from "../screens/ListItemScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import SignupScreen from "../screens/SignupScreen";
import SearchScreen from "../screens/SearchScreen";
import { TabNavigator } from "./TabNavigator";
import { useAuthToken } from "../hooks/useAuthToken";
import LoadingScreen from "../screens/LoadingScreen";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  LandingPage: undefined;
  Profile: undefined;
  Tasks: undefined;
  Search: undefined;
  Signup: undefined;
  AddTaskModal: undefined;
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
        <Stack.Screen name="AddTaskModal" component={AddTaskModal} />
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
