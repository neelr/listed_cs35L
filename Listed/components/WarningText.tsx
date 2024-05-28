import React from 'react';
import {StyleSheet, Text } from "react-native";

interface WarningMessageProps {
  message: string;
  visible: boolean;
}

const WarningMessage: React.FC<WarningMessageProps> = ({ message, visible }) => {
  if (visible){
    return (
      <Text style={styles.warning}>{message}</Text>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  warning: {
      color: 'red',
      fontWeight: 'bold',
      fontSize: 10,
      padding: 3
  }
});

export default WarningMessage;