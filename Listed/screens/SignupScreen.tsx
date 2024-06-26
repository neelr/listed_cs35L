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
import WarningText from "../components/WarningText";
import Spacer from "../components/Spacer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import * as Yup from "yup";
import { PASSWORD_SCHEMA } from "../constants";
import { useSignup } from "../hooks/useSignUp";
import { ApiError, LoginResponse } from "../types/authTypes";
import { AxiosError } from "axios";

type SignupScreenProps = NativeStackScreenProps<RootStackParamList, "Signup">;

const { width, height } = Dimensions.get("window");
const image1 = require("../assets/circles lol.png");

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [signupError, setSignupError] = React.useState("");

  const onSuccessfulSignup = (data: LoginResponse) => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LandingPage", params: { currentUser: data } }],
    });
  };

  const onError = (error: AxiosError<ApiError> & ApiError) => {
    // clear password fields
    setSignupError(
      error.response?.data.error || error.error || "An error occurred"
    );
  };

  const { mutate: signup } = useSignup({
    onSuccess: onSuccessfulSignup,
    onError: onError,
  });

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: PASSWORD_SCHEMA,
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
  });

  const handleFormSubmit = (values: typeof initialValues) => {    //Added this to lower all emails auto
    const transformedValues = {
      ...values,
      email: values.email.toLowerCase(),
    };
    signup(transformedValues);
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
        <Text style={styles.title}>Sign Up</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit} // Changed to handleFormSubmit from signup
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldTouched,
            values,
            errors,
            touched,
          }) => (
            <View style={{ alignItems: "center" }}>
              <TextInput
                editable
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                style={[styles.input, { marginTop: height * 0.04 }]}
                placeholder="Username"
              />
              <WarningText
                message={errors.username}
                visible={touched.username}
              />

              <TextInput
                editable
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                style={[styles.input, { marginTop: height * 0.04 }]}
                placeholder="Email"
              />
              <WarningText message={errors.email} visible={touched.email} />

              <View style={styles.passwordContainer}>
                <TextInput
                  editable
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  onFocus={() => setFieldTouched("password")}
                  style={[
                    styles.input,
                    { paddingRight: width * 0.06, marginTop: height * 0.04 },
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
                    marginLeft: width * -0.06,
                    marginTop: height * 0.04,
                  }}
                  onPress={() => setShowPassword(!showPassword)}
                />
              </View>
              <WarningText
                message={errors.password}
                visible={touched.password}
              />

              <View style={styles.passwordContainer}>
                <TextInput
                  editable
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  style={[
                    styles.input,
                    { paddingRight: width * 0.06, marginTop: height * 0.04 },
                  ]}
                  secureTextEntry={!showConfirmPassword}
                  placeholder="Confirm Password"
                  placeholderTextColor="#aaa"
                />
                <Ionicons
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  size={width * 0.06}
                  color="#aaa"
                  style={{
                    marginLeft: -width * 0.06,
                    marginTop: height * 0.04,
                  }}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </View>

              <WarningText
                message={errors.confirmPassword}
                visible={touched.confirmPassword}
              />

              <HomeButton
                title="Sign up"
                onPress={() => {
                  handleSubmit();
                }}
                customStyles={{ marginTop: height * 0.04 }}
              />

              <WarningText message={signupError} visible={!!signupError} />
            </View>
          )}
        </Formik>
        <Spacer height={height * 0.2} />
      </ScrollView>
      <Image source={image1} style={styles.image} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  image: {
    position: "absolute",
    bottom: -0.24 * height,
    zIndex: -1,
    width: width * 1,
  },
  title: {
    fontFamily: "InknutAntiqua_400Regular",
    fontSize: width / 10.0,
    color: "#3B4552",
  },
  input: {
    height: height * 0.05,
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

export default SignupScreen;
