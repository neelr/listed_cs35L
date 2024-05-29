import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import ListItemScreen from "../screens/ListItemScreen";
import ProfileScreen from "../screens/ProfileScreen";

export type TabParamList = {
  Profile: undefined;
  Tasks: undefined;
  ListItem: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const icons = {
  ListItem: "home-outline",
  Profile: "person-outline",
  Tasks: "list-outline",
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
    })}
  >
    <Tab.Screen name="ListItem" component={ListItemScreen} />
    {/* <Tab.Screen name="Task" component={TaskManagerScreen} /> */}
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);
