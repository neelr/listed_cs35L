// routes/StackNavigator.ts
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
import UserDetailScreen from "../screens/UserDetailScreen"; // Import UserDetailScreen
import { Task } from "../types/taskTypes";
import { User } from "../types/userTypes";
import { AuthenticatedPageProps } from "../types/authTypes";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  LandingPage: AuthenticatedPageProps;
  Signup: undefined;
  TaskModal: {
    task?: Task;
  };
  UserDetail: {
    user: User;
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
      <Stack.Screen
        name="UserDetail"
        component={UserDetailScreen}
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};
