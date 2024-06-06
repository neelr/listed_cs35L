// UserDetailScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../routes/StackNavigator';
import { useUserTasksById, useUserFriendsById } from '../hooks/useUserData'; // FIX THIS TRASH!!!!!!!

const { width, height } = Dimensions.get('window');

type UserDetailScreenProps = StackScreenProps<RootStackParamList, 'UserDetail'>;

const UserDetailScreen: React.FC<UserDetailScreenProps> = ({ route }) => {
  const { username } = route.params;
  const [activeTab, setActiveTab] = useState<'Tasks' | 'Friends'>('Tasks');

  const { data: tasks, isLoading: isLoadingTasks } = useUserTasksById(username);
  const { data: friends, isLoading: isLoadingFriends } = useUserFriendsById(username);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.name}>{username}</Text>
        <View style={styles.followersContainer}>
          <Text style={styles.followersCount}>{friends?.length || 0}</Text>
          <Text style={styles.followersLabel}>Friend{friends?.length !== 1 ? 's' : ''}</Text>
        </View>
        <TouchableOpacity style={styles.addButton}>






          <Text style={styles.addButtonText}>Add Friend</Text>








        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Tasks' && styles.activeTabButton]}
          onPress={() => setActiveTab('Tasks')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'Tasks' && styles.activeTabButtonText]}>
            {username}'s Tasks
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Friends' && styles.activeTabButton]}
          onPress={() => setActiveTab('Friends')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'Friends' && styles.activeTabButtonText]}>
            {username}'s Friends
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <View style={styles.contentContainer}>
        {activeTab === 'Tasks' ? (
          isLoadingTasks ? (
            <Text>Loading...</Text>
          ) : (
            tasks?.length === 0 ? (
              <Text style={styles.noContentText}>No tasks yet!</Text>
            ) : (
              <FlatList
                data={tasks}
                keyExtractor={(item) => item.taskId}
                renderItem={({ item }) => (
                  <View style={styles.taskCard}>
                    <Text style={styles.taskTitle}>{item.name}</Text>
                    <Text style={styles.taskDescription}>{item.description}</Text>
                  </View>
                )}
              />
            )
          )
        ) : (
          isLoadingFriends ? (
            <Text>Loading...</Text>
          ) : (
            friends?.length === 0 ? (
              <Text style={styles.noContentText}>No friends yet!</Text>
            ) : (
              <FlatList
                data={friends}
                keyExtractor={(item) => item.userId}
                renderItem={({ item }) => (
                  <View style={styles.friendCard}>
                    <Text style={styles.friendName}>{item.username}</Text>
                  </View>
                )}
              />
            )
          )
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    marginTop: -20,
    marginBottom: 10,
  },
  followersContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  name: {
    fontFamily: 'InknutAntiqua_500Medium',
    fontSize: 24,
    color: '#3B4552',
    marginTop: -15,
    textAlign: 'center',
  },
  followersCount: {
    fontFamily: 'InknutAntiqua_500Medium',
    fontSize: 28,
    marginTop: -30,
    color: '#3B4552',
  },
  followersLabel: {
    fontFamily: 'InknutAntiqua_300Light',
    fontSize: 14,
    marginTop: -12,
    marginBottom: -12,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#2B78C2',
    paddingVertical: 0,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginTop: 17,
  },
  addButtonText: {
    fontFamily: 'InknutAntiqua_500Medium',
    color: '#fff',
    fontSize: 14,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginVertical: 8,
  },
  tabButton: {
    paddingHorizontal: 16,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 4,
  },
  activeTabButton: {
    backgroundColor: '#2B78C2',
  },
  tabButtonText: {
    fontFamily: 'InknutAntiqua_300Light',
    fontSize: 12,
    color: '#3B4552',
  },
  activeTabButtonText: {
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  taskTitle: {
    fontFamily: 'InknutAntiqua_500Medium',
    fontSize: 13,
    color: '#3B4552',
    marginTop: -12,
  },
  taskDescription: {
    fontFamily: 'InknutAntiqua_300Light',
    fontSize: 7,
    color: '#666',
    marginTop: -5,
  },
  friendCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  friendName: {
    fontFamily: 'InknutAntiqua_500Medium',
    fontSize: 15,
    color: '#3B4552',
  },
  noContentText: {
    fontFamily: 'InknutAntiqua_500Medium',
    color: '#3B4552',
  },
});

export default UserDetailScreen;
