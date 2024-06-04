import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import ListItemScreen from "../screens/ListItemScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import AddTaskModal from "../modals/TaskModal";
import { RootStackParamList } from "./StackNavigator";

export type TabParamList = {
  Profile: undefined;
  Tasks: undefined;
  Search: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const icons = {
  Profile: "person-outline",
  Tasks: "list-outline",
  Search: "search-outline",
};

export const TabNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        return <Ionicons name={icons[route.name]} size={size} color={color} />;
      },
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
      headerShown: false,
      tabBarLabelStyle: {
        fontFamily: "InknutAntiqua_400Regular",
        fontSize: 8
      }
    })}
  >
    <Tab.Screen name="Tasks" component={ListItemScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);
