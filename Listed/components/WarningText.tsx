import React from "react";
import { StyleSheet, Text } from "react-native";

interface WarningMessageProps {
  message?: string;
  visible?: boolean;
}

const WarningMessage: React.FC<WarningMessageProps> = ({
  message,
  visible,
}) => {
  if (visible && !!message) {
    return <Text style={styles.warning}>{message}</Text>;
  }
  return null;
};

const styles = StyleSheet.create({
  warning: {
    color: "red",
    fontFamily: "InknutAntiqua_400Regular",
    fontSize: 10,
  },
});


export default WarningMessage;
