import React from "react";
import { Dimensions, StyleSheet, View, Image, Text } from "react-native";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/StackNavigator";
import HomeButton from "../components/Button";
//import { MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import * as Yup from "yup";
import { PASSWORD_SCHEMA } from "../constants";
import WarningText from "../components/WarningText";
import { useLogin } from "../hooks/useLogin";
import { ApiError, LoginResponse } from "../types/authTypes";

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

const { width, height } = Dimensions.get("window");

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginError, setLoginError] = React.useState("");

  const onSuccessfulLogin = (data: LoginResponse) => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LandingPage" }],
    });
  };

  const onError = (error: ApiError) => {
    setLoginError("Invalid email or password");
  };

  const { mutate: login } = useLogin({
    onSuccess: onSuccessfulLogin,
    onError: onError,
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: PASSWORD_SCHEMA,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <Formik
        initialValues={{
          email: "crazyguy+5@gmail.com",
          password: "CrazyWacky123$",
        }}
        validationSchema={validationSchema}
        onSubmit={login}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={{ alignItems: "center" }}>
            <TextInput
              editable
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              style={[styles.input, { marginTop: height * 0.05, paddingRight: width * 0.04 }]}
              placeholder="Email"
              placeholderTextColor="#aaa"
            />
            <WarningText message={errors.email} visible={touched.email} />
            <View style={styles.passwordContainer}>
              <TextInput
                editable
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                style={[
                  styles.input,
                  { paddingRight: width * 0.11, marginTop: height * 0.03 },
                ]}
                secureTextEntry={!showPassword}
                placeholder="Password"
                placeholderTextColor="#aaa"
              />

              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#aaa"
                style={[styles.icon, { marginTop: height * 0.03 }]}
                onPress={() => setShowPassword(!showPassword)} />

            </View>
            <WarningText message={errors.password} visible={touched.password} />
            <HomeButton
              title="Log in"
              onPress={() => {
                handleSubmit();
              }}
              customStyles={{ marginTop: height * 0.03 }}
            />
            <WarningText message={loginError} visible={!!loginError} />
          </View>
        )}
      </Formik>

      <Image
        source={require("../assets/circles lol.png")}
        style={styles.image}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    justifyContent: "center",
  },
  mainView: {
    alignItems: "center",
    //justifyContent: "center",
  },
  image: {
    bottom: -0.1 * height,
    width: width * 1,
  },
  title: {
    fontFamily: "InknutAntiqua_400Regular",
    fontSize: width / 10.0,
    color: "#3B4552",
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
    textAlignVertical: "center",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginLeft: -width * 0.07,
  },
});

export default LoginScreen;
