import React from "react";
import {
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
  ViewStyle,
  Text,
  Dimensions,
  StyleProp,
} from "react-native";

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  customStyles?: StyleProp<ViewStyle>;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const HomeButton: React.FC<ButtonProps> = ({
  onPress,
  title,
  customStyles: customStyles,
}) => {
  const buttonStyles = StyleSheet.flatten([
    baseStyles.buttonContainer,
    customStyles,
  ]);

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={baseStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const baseStyles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#3B4552",
    borderRadius: 75,
    alignItems: "center",
    width: screenWidth * 0.4,
    height: screenHeight / 13.0,
    justifyContent: "center",
  },

  buttonText: {
    fontFamily: "InknutAntiqua_400Regular",
    color: "#FFFFFF",
    //fontWeight : "bold",
    fontSize: screenWidth * 0.045,
  },
});

export default HomeButton;
