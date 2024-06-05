import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  StyleSheet,
  GestureResponderEvent,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  Text,
  Dimensions,
  StyleProp,
} from "react-native";

type ButtonProps = {
  name: string;
  // margin?: ViewStyle['marginTop'];
  style?: StyleProp<ViewStyle>;
  onPress: (event: GestureResponderEvent) => void;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const CircleIconButton: React.FC<ButtonProps> = ({ onPress, name, style }) => {
  const buttonStyles = [styles.buttonContainer, style];

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Ionicons name={name} size={screenWidth * 0.06} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#3B4552",
    borderRadius: screenWidth * 0.06,
    alignItems: "center",
    width: screenWidth * 0.12,
    height: screenWidth * 0.12,
    justifyContent: "center",
  },

  buttonText: {
    fontFamily: "InknutAntiqua_400Regular",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: screenWidth * 0.045,
    textAlign: "center", // Ensure text is centered
  },
});

export default CircleIconButton;
