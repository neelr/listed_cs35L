import React from "react";
import { Button, Dimensions, StyleSheet, View, Image, Text } from "react-native";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../App";
import HomeButton from "../components/Button";
import { MaterialCommunityIcons } from '@expo/vector-icons';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const { width, height } = Dimensions.get('window');
const image1 = require("../assets/circles lol.png");

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [username, onChangeUsername] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [ tempPassword, setTempPassword] = React.useState('')

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Log In</Text>

            <TextInput
                editable
                value={username}
                onChangeText={username => onChangeUsername(username)}
                style={[styles.input, {marginTop: height* 0.06}]}
                placeholder="Username"
            >
            </TextInput>

            <View style={styles.passwordContainer}>
                <TextInput
                    editable
                    value={password}
                    onChangeText={password => onChangePassword(password)}
                    style={[styles.input, {paddingRight: width*0.07, marginTop: height* 0.04}]}
                    secureTextEntry={!showPassword}
                    placeholder="Password"
                    placeholderTextColor={"aaa"}
                >
                    
                </TextInput>
                <MaterialCommunityIcons 
                    name={showPassword ? 'eye' : 'eye-off'} 
                    size={24} 
                    color="#aaa"
                    style={[styles.icon, {marginTop: height * 0.04}]}
                    onPress={() => setShowPassword(!showPassword)} 
                /> 
                
            </View>

            <HomeButton title="Log in" onPress={() => { navigation.navigate("Home") }} margin={height * 0.04}></HomeButton>
            <Image source={require("../assets/circles lol.png")} style={styles.image}></Image>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        alignItems: 'center',
        justifyContent: 'center'
    },


    image: {
        bottom: -0.1 * height,
    },

    title: {
        fontFamily: "InknutAntiqua_400Regular",
        fontSize: width / 10.0,
        color: "#3B4552",
        //fontWeight : "bold",
    },

    input: {
        height: height * 0.07,
        width: width * 0.6,
        backgroundColor: "#DDDDDD",
        borderWidth: 0,
        borderRadius: 10,
        fontFamily: "InknutAntiqua_400Regular",
        paddingLeft: width * 0.04,
        color: "#3B4552",
        textAlignVertical: 'center',
    },

    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#f3f3f3',
    },

    icon: {
        marginLeft: -width*0.07
    }
});

export default LoginScreen;