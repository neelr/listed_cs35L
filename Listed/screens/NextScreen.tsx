import React from "react";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../App";

type NextScreenProps = NativeStackScreenProps<RootStackParamList, 'Next'>;

const NextScreen: React.FC<NextScreenProps> = ({navigation}) => {
    return (
        <SafeAreaView>
            <Button title="Go back" onPress={ () => {navigation.navigate("Home")} }></Button>
        </SafeAreaView>
    )
}

export default NextScreen;