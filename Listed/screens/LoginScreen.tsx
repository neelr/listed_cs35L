import React from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
} from "react-native";
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
import { AxiosError } from "axios";
import Spacer from "../components/Spacer";

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

const { width, height } = Dimensions.get("window");

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginError, setLoginError] = React.useState("");

  const onSuccessfulLogin = (data: LoginResponse) => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LandingPage", params: { currentUser: data } }],
    });
  };

  const onError = (error: AxiosError<ApiError>) => {
    setLoginError(error.response?.data.error || "An error occurred");
  };

  const { mutate: login } = useLogin({
    onSuccess: onSuccessfulLogin,
    onError: onError,
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"), // ADDED 
    // password: PASSWORD_SCHEMA,
  });

  const handleFormSubmit = (values: { email: string; password: string }) => {       // Added to pass all emails as lower
    const transformedValues = {
      ...values,
      email: values.email.toLowerCase(),
    };
    login(transformedValues);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        keyboardShouldPersistTaps="handled" // Ensure taps outside of TextInput dismiss the keyboard
      >
        <Text style={styles.title}>Log In</Text>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}     // updated from "login" to "handleFormSubmit"
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
                style={[
                  styles.input,
                  { marginTop: height * 0.05, paddingRight: width * 0.04 },
                ]}
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
                  size={width * 0.06}
                  color="#aaa"
                  style={{
                    marginLeft: -width * 0.06,
                    marginTop: height * 0.03,
                  }}
                  onPress={() => setShowPassword(!showPassword)}
                />
              </View>
              <WarningText
                message={errors.password}
                visible={touched.password}
              />
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
        <Spacer height={height * 0.2} />
      </ScrollView>
      <Image
        source={require("../assets/circles lol.png")}
        style={styles.image}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "#F8F9FA",
    justifyContent: "center",
  },
  image: {
    position: "absolute",
    bottom: -0.37 * height,
    zIndex: -1,
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
