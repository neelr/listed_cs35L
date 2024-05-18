import React from "react";
import { StyleSheet, GestureResponderEvent, TextStyle, TouchableOpacity, ViewStyle, Text, Dimensions, StyleProp } from "react-native";

type ButtonProps = {
    title: string;
    margin?: ViewStyle['marginTop'];
    onPress: (event: GestureResponderEvent) => void;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const HomeButton: React.FC<ButtonProps> = ({ onPress, title, margin }) => {
    const buttonStyles = StyleSheet.flatten([styles.buttonContainer, { margin }]);

    return <TouchableOpacity onPress={onPress} style={buttonStyles}>
        <Text style={styles.buttonText as StyleProp<ViewStyle>}>{title}</Text>
    </TouchableOpacity>
};

const styles = StyleSheet.create({
        buttonContainer: {
            backgroundColor: "#3B4552",
            borderRadius: 75,
            alignItems: "center",
            width: screenWidth * 0.40,
            height: screenHeight / 13.0,
            justifyContent: "center",
        },
    
        buttonText: {
            fontFamily: "InknutAntiqua_400Regular",
            color: "#FFFFFF",
            //fontWeight : "bold",
            fontSize: screenWidth * 0.045
        }
    });

export default HomeButton;