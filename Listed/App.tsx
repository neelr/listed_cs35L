import React from 'react';
import HomeScreen from './screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ListItemScreen from './screens/ListItemScreen';
import ProfileScreen from './screens/ProfileScreen';
import TestModalScreen from './screens/TestModalScreen';
import AddTaskModal from './modals/AddTaskModal';
import { useFonts,
  InknutAntiqua_300Light,
  InknutAntiqua_400Regular,
  InknutAntiqua_500Medium,
  InknutAntiqua_600SemiBold,
  InknutAntiqua_700Bold,
  InknutAntiqua_800ExtraBold,
  InknutAntiqua_900Black,
} from '@expo-google-fonts/inknut-antiqua';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  Profile: undefined;
  ListItem: undefined
  TestModalScreen: undefined;
  AddTaskModal: undefined;
}; 

const Stack = createNativeStackNavigator<RootStackParamList>();

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
    return null
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='TestModalScreen'>
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='ListItem' component={ListItemScreen} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='Signup' component={SignupScreen} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='TestModalScreen' component={TestModalScreen} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="AddTaskModal" component={AddTaskModal} options={{ presentation: 'modal', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;