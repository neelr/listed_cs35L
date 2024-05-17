import React from 'react';
import HomeScreen from './screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import { useFonts,
  InknutAntiqua_300Light,
  InknutAntiqua_400Regular,
  InknutAntiqua_500Medium,
  InknutAntiqua_600SemiBold,
  InknutAntiqua_700Bold,
  InknutAntiqua_800ExtraBold,
  InknutAntiqua_900Black,
} from '@expo-google-fonts/inknut-antiqua';
import AppLoading from 'expo-app-loading';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

export 

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
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;