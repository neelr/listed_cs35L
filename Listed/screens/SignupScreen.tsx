import React from "react";
import { Dimensions, StyleSheet, View, Image, Text } from "react-native";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import HomeButton from "../components/Button";
import WarningText from "../components/WarningText";
import Spacer from "../components/Spacer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { PASSWORD_SCHEMA } from "../constants";

type SignupScreenProps = NativeStackScreenProps<RootStackParamList, "Signup">;

const { width, height } = Dimensions.get("window");
const image1 = require("../assets/circles lol.png");

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign up</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          navigation.navigate("TaskManager");
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <TextInput
              editable
              value={values.username}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              style={[styles.input, { marginTop: height * 0.04 }]}
              placeholder="Username"
            />
            <WarningText message={errors.username} visible={touched.username} />

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
                style={[
                  styles.input,
                  { paddingRight: width * 0.07, marginTop: height * 0.04 },
                ]}
                secureTextEntry={!showPassword}
                placeholder="Password"
                placeholderTextColor="#aaa"
              />
              <MaterialCommunityIcons
                name={showPassword ? "eye" : "eye-off"}
                size={24}
                color="#aaa"
                style={[styles.icon, { marginTop: height * 0.04 }]}
                onPress={() => setShowPassword(!showPassword)}
              />
            </View>
            <WarningText message={errors.password} visible={touched.password} />

            <View style={styles.passwordContainer}>
              <TextInput
                editable
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                style={[
                  styles.input,
                  { paddingRight: width * 0.07, marginTop: height * 0.04 },
                ]}
                secureTextEntry={!showConfirmPassword}
                placeholder="Confirm Password"
                placeholderTextColor="#aaa"
              />
              <MaterialCommunityIcons
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={24}
                color="#aaa"
                style={[styles.icon, { marginTop: height * 0.04 }]}
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
          </View>
        )}
      </Formik>

      <Spacer height={height * 0.2} />

      <Image source={image1} style={styles.image} />
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

  image: {
    position: "absolute",
    bottom: -0.1 * height,
    zIndex: -1,
  },

  title: {
    fontFamily: "InknutAntiqua_400Regular",
    fontSize: width / 10.0,
    color: "#3B4552",
    //fontWeight : "bold",
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
    // backgroundColor: '#f3f3f3',
  },

  icon: {
    marginLeft: -width * 0.07,
  },
});

export default SignupScreen;
