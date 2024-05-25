import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../App";

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollowPress = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.header}>
                    <Image
                        source={{ uri: 'https://media.licdn.com/dms/image/D5603AQFtnBNOmlHC6w/profile-displayphoto-shrink_200_200/0/1668776284501?e=2147483647&v=beta&t=ENov3OUPI6VuaGAr83I0XARVx86lh6hZfPIIBJAezKI' }} 
                        style={styles.profileImage}
                    />
                    <View>
                        <Text style={styles.name}>Random Joe</Text>
                        <Text style={styles.username}>@randomjoe</Text>
                    </View>
                </View>
                <Text style={styles.bio}>
                    Software Developer. Tech Enthusiast. Avid Learner. Always curious and exploring new things!
                </Text>
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
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.followButton, isFollowing ? styles.followingButton : {}]}
                        onPress={handleFollowPress}
                    >
                        <Text style={styles.followButtonText}>
                            {isFollowing ? "Unfollow" : "Follow"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.messageButton}>
                        <Text style={styles.messageButtonText}>Message</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.goBackButtonText}>Go back</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#3B4552",
        padding: 20,
    },
    profileContainer: {
        alignItems: "center",
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#f8f9fa",
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginTop: 20, 
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        width: '100%',
    },
    profileImage: {
        width: 92,
        height: 92,
        borderRadius: 50,
        marginRight: 20, // Space between image and name
        borderColor: "#2B78C2",
        borderWidth: 2,
    },
    name: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#333",
    },
    username: {
        fontSize: 14,
        color: "#666",
    },
    bio: {
        fontSize: 16,
        color: "#666",
        textAlign: "left",
        marginBottom: 20,
        width: '100%',
    },
    followContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        marginBottom: 20,
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
        backgroundColor: "#2B78C2",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10, // Space between buttons
        height: 40, // Set height for shorter buttons
        justifyContent: "center",
        alignItems: "center",
    },
    followingButton: {
        backgroundColor: "#E63946", 
    },
    followButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    messageButton: {
        flex: 1,
        backgroundColor: "#2B78C2",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        height: 40, // Set height for shorter buttons
        justifyContent: "center",
        alignItems: "center",
    },
    messageButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    goBackButton: {
        backgroundColor: "#ccc",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    goBackButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
