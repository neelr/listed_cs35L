import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/StackNavigator'; // Update this to the correct path if necessary

type UserDetailScreenProps = StackScreenProps<RootStackParamList, 'UserDetail'>;

const UserDetailScreen: React.FC<UserDetailScreenProps> = ({ route }) => {
  const { username } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.usernameText}>{username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default UserDetailScreen;
