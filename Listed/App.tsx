import React from 'react';
import HomeScreen from './screens/HomeScreen';
import NextScreen from './screens/NextScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Next: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='Next' component={NextScreen} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;