import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts,
  InknutAntiqua_300Light,
  InknutAntiqua_400Regular,
  InknutAntiqua_500Medium,
  InknutAntiqua_600SemiBold,
  InknutAntiqua_700Bold,
  InknutAntiqua_800ExtraBold,
  InknutAntiqua_900Black,
} from '@expo-google-fonts/inknut-antiqua';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SigninScreen from './screens/SigninScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import TaskManagerScreen from './screens/TaskManagerScreen';
import ListItemScreen from './screens/ListItemScreen'; 
import AddTaskModal from './modals/AddTaskModal';

export type RootStackParamList = {
  Signin: undefined;
  Login: undefined;
  TaskManager: undefined;
  Profile: undefined;
  ListItem: undefined;
  Signup: undefined;
  AddTaskModal: undefined;
};

export type TabParamList = {
  Profile: undefined;
  Tasks: undefined;
  ListItem: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName: string = '';
        
        if (route.name === 'ListItem') {
          iconName = 'home-outline';
        } else if (route.name === 'Profile') {
          iconName = 'person-outline';
        } else if (route.name === 'Tasks') {
          iconName = 'list-outline';
        }
        
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      headerShown: false, 
    })}
  >
    <Tab.Screen name="ListItem" component={ListItemScreen} />
    {/* <Tab.Screen name="Task" component={TaskManagerScreen} /> */}
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
      <Stack.Navigator initialRouteName='Signin'>
        <Stack.Screen name='Signin' component={SigninScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Signup' component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name='TaskManager' component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name='ListItem' component={ListItemScreen} options={{ headerShown: false }} />
        <Stack.Screen name='AddTaskModal' component={AddTaskModal} options={{ headerShown: false, presentation: "modal"}} />
        {/* <Stack.Screen name='Task' component={TaskManagerScreen} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
