import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import ListItemScreen from "../screens/ListItemScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import { Dimensions } from "react-native";
import { RootStackParamList } from "./StackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type TabParamList = {
  Profile: undefined;
  Tasks: undefined;
  Search: undefined;
};

const { width, height } = Dimensions.get("window");
const Tab = createBottomTabNavigator<TabParamList>();

const icons = {
  Profile: "person-outline",
  Tasks: "list-outline",
  Search: "search-outline",
};

let imageSize = 0;
export const TabNavigator: React.FC<
  NativeStackScreenProps<RootStackParamList, "LandingPage">
> = ({ route }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          imageSize = size;
          return (
            <Ionicons name={icons[route.name]} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "#E63946",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: height * 0.085,
          marginTop: height * 0.001,
          backgroundColor: "#F8F9FA",
        },
      })}
    >
      <Tab.Screen name="Tasks" component={ListItemScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
