import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  InknutAntiqua_300Light,
  InknutAntiqua_400Regular,
  InknutAntiqua_500Medium,
  InknutAntiqua_600SemiBold,
  InknutAntiqua_700Bold,
  InknutAntiqua_800ExtraBold,
  InknutAntiqua_900Black,
} from "@expo-google-fonts/inknut-antiqua";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StackNavigator } from "./routes/StackNavigator";
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


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

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <NavigationContainer>
        <GestureHandlerRootView>
          <StackNavigator />
        </GestureHandlerRootView>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
