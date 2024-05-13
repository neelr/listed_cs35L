import React from "react";
import { StyleSheet, GestureResponderEvent, TextStyle, TouchableOpacity, ViewStyle, Text } from "react-native";
import {
    useFonts,
    InknutAntiqua_300Light,
    InknutAntiqua_400Regular,
    InknutAntiqua_500Medium,
    InknutAntiqua_600SemiBold,
    InknutAntiqua_700Bold,
    InknutAntiqua_800ExtraBold,
    InknutAntiqua_900Black,
} from '@expo-google-fonts/inknut-antiqua';

type ButtonProps = {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
};

const HomeButton: React.FC<ButtonProps> = ({ onPress, title }) => {

    let [fontsLoaded] = useFonts({
        InknutAntiqua_300Light,
        InknutAntiqua_400Regular,
        InknutAntiqua_500Medium,
        InknutAntiqua_600SemiBold,
        InknutAntiqua_700Bold,
        InknutAntiqua_800ExtraBold,
        InknutAntiqua_900Black,
    });


    if (fontsLoaded) {
       return <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    }
        return null;
    

};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#3B4552",
        borderRadius: 75,
        width: 223,
        height: 51,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 71
    },

    buttonText: {
        fontFamily: "InknutAntiqua_400Regular",
        color: "#FFFFFF"
    }
});

export default HomeButton;