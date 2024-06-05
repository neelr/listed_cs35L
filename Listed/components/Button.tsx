import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
  ViewStyle,
  Text,
  Dimensions,
  StyleProp,
  TextStyle,
} from "react-native";

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  icon?: { name: string; size?: number; color?: string };
  bold?: boolean;
  customStyles?: StyleProp<ViewStyle>;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const HomeButton: React.FC<ButtonProps> = ({
  onPress,
  title,
  bold,
  icon,
  customStyles: customStyles,
}) => {
  const iconStyle: ViewStyle = icon
    ? { justifyContent: "space-between", paddingLeft: 24, paddingRight: 24 }
    : { justifyContent: "center" };
  const buttonStyles = StyleSheet.flatten([
    baseStyles.buttonContainer,
    customStyles,
    iconStyle,
  ]);

  const buttonTextStyles: TextStyle = {
    ...baseStyles.buttonText,
    fontFamily: bold ? "InknutAntiqua_700Bold" : "InknutAntiqua_400Regular",
  };

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={buttonTextStyles}>{title}</Text>
      {icon && (
        <Ionicons
          name={icon.name}
          size={icon.size || 24}
          color={icon.color || "white"}
          style={{ marginLeft: 5 }}
        />
      )}
    </TouchableOpacity>
  );
};

const baseStyles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#3B4552",
    display: "flex",
    flexDirection: "row",
    borderRadius: 75,
    alignItems: "center",
    width: screenWidth * 0.4,
    height: screenHeight / 13.0,
  },

  buttonText: {
    fontFamily: "InknutAntiqua_400Regular",
    color: "#FFFFFF",
    //fontWeight : "bold",
    fontSize: screenWidth * 0.045,
  },
});

export default HomeButton;
