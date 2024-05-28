import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Calendar } from 'react-native-calendars';
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

interface Task {
  id: string;
  title: string;
  date: string;
  description: string;
  completed: boolean;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'ToDo' | 'Completed' | 'Calendar'>('ToDo');
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Meeting with team', date: '2024-05-17', description: 'Discuss project updates and next steps.', completed: false },
    { id: '2', title: 'Code Review', date: '2024-05-18', description: 'Review code for the new feature implementation.', completed: true },
    { id: '3', title: 'Client Presentation', date: '2024-05-19', description: 'Present the project progress to the client.', completed: false },
  ]);

  const handleFollowPress = () => {
    setIsFollowing(!isFollowing);
  };


  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskCard}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDate}>{item.date}</Text>
      <Text style={styles.taskDescription}>{item.description}</Text>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'ToDo':
        return (
          <FlatList
            data={tasks.filter(task => !task.completed)}
            renderItem={renderTask}
            keyExtractor={(item) => item.id}
            style={styles.taskList}
          />
        );
      case 'Completed':
        return (
          <FlatList
            data={tasks.filter(task => task.completed)}
            renderItem={renderTask}
            keyExtractor={(item) => item.id}
            style={styles.taskList}
          />
        );
      /*case 'Calendar':
        return (
         <Calendar
            onDayPress={(day) => {
              // console.log('selected day', day);
            }}
            markedDates={{
              '2024-05-17': { selected: true, marked: true, selectedColor: '#00adf5' },
              '2024-05-18': { marked: true },
              '2024-05-19': { marked: true, dotColor: '#00adf5', activeOpacity: 0 },
              '2024-05-20': { disabled: true, disableTouchEvent: true }
            }}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'black',
              monthTextColor: 'black',
              indicatorColor: 'blue',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '500',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
          />
        );*/
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.header}>
          <Text style={styles.username}>@DoubleBBinks</Text>
        </View>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://media.licdn.com/dms/image/D5603AQEA8P_tgwCuZQ/profile-displayphoto-shrink_200_200/0/1677975599737?e=2147483647&v=beta&t=WhAO0hCoV8ULGg6FjJTTra24lgfp73YsgXTlUOn-gD4' }} 
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.name}>Arman Bagdasarian</Text>
            <View style={styles.followContainer}>
              <View style={styles.followBox}>
                <Text style={styles.followCount}>69</Text>
                <Text style={styles.followLabel}>Followers</Text>
              </View>
              <View style={styles.verticalBar} />
              <View style={styles.followBox}>
                <Text style={styles.followCount}>420</Text>
                <Text style={styles.followLabel}>Following</Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.bio}>
          Software Developer. Tech Enthusiast. Avid Climber. Always curious and exploring new things!
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.followButton, isFollowing ? styles.followingButton : {}]}
            onPress={handleFollowPress}
          >
            <Text style={styles.followButtonText}>
              {isFollowing ? "Unfollow" : "Follow"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.PokeButton}>
            <Text style={styles.PokeButtonText}>Poke</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'ToDo' && styles.activeTabButton]} onPress={() => setActiveTab('ToDo')}>
          <Text style={styles.tabButtonText}>❌</Text>
          {activeTab === 'ToDo' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
        <View style={styles.tabSeparator} />
        <TouchableOpacity style={[styles.tabButton, activeTab === 'Completed' && styles.activeTabButton]} onPress={() => setActiveTab('Completed')}>
          <Text style={styles.tabButtonText}>✅</Text>
          {activeTab === 'Completed' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  profileContainer: {
    alignItems: "flex-start",
    padding: 0,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    width: '100%',
    elevation: 4,
    marginTop: -25, 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: '100%',
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: '100%',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -4,
    marginStart: 0,
    marginRight: 23,
    borderColor: "#4B88A2",
    borderWidth: 2,
  },
  username: {
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
    marginStart: 1,
    marginTop: 10,
    marginBottom: 0,
    color: "#000",
  },
  name: {
    fontSize: 20,
    marginStart: 0,
    marginTop: -3,
    marginBottom: 12,
    fontWeight: "bold",
    color: "#333",
  },
  followContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: '100%',
    marginStart: 0,
    marginBottom: 0,
  },
  bio: {
    fontSize: 13,
    color: "#666",
    textAlign: "left",
    marginTop: -3,
    marginBottom: 15,
    width: '100%',
  },
  followBox: {
    alignItems: "center",
    flex: 1,
  },
  verticalBar: {
    width: 1,
    height: '80%',
    backgroundColor: "#ccc",
  },
  followCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  followLabel: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
  },
  followButton: {
    flex: 1,
    backgroundColor: "#4B88A2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  followingButton: {
    backgroundColor: "#E63946", 
  },
  followButtonText: {
    color: "#ffffff",
    fontSize: 15,
    marginTop: -1,
    fontWeight: "bold",
  },
  PokeButton: {
    flex: 1,
    backgroundColor: "#4B88A2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  PokeButtonText: {
    color: "#ffffff",
    fontSize: 15,
    marginTop: -1,
    fontWeight: "bold",
  },
  separator: {
    width: '83%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 14,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: -3,
    marginVertical: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    position: 'relative',
    flex: 1,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#fff',
  },
  tabButtonText: {
    fontSize: 15,
    color: '#000',
  },
  activeTabIndicator: {
    position: 'static',
    bottom: -10,
    left: 0,
    right: 0,
    height: 1,
    width: 80,
    backgroundColor: '#888',
  },
  tabSeparator: {
    height: '65%',
    width: 1,
    backgroundColor: '#ccc',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: "#ebebeb",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  taskList: {
    width: '100%',
  },
  taskCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  taskDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
  },
  goBackButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  goBackButtonText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
});
