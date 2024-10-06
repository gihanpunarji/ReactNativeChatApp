import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useCustomFonts } from "../useCustomFonts";
import { FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function signIn() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function checkUser() {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user != null) {
          router.replace("/home");
        }
      } catch (e) {}
    }
    checkUser();
  }, []);

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSignIn = async () => {
    let response = await fetch(
      "https://404d-112-134-196-27.ngrok-free.app/MyChatBackend/SignIn",
      {
        method: "POST",
        body: JSON.stringify({
          mobile: mobile,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      let json = await response.json();
      if (json.success) {
        console.log(json.user);
        await AsyncStorage.setItem("user", JSON.stringify(json.user));
        router.replace("/home");
      } else {
        Alert.alert("Error...", json.message);
      }
    }
  };

  const { loaded, error } = useCustomFonts();

  useEffect(() => {
    if (loaded || error) {
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <LinearGradient colors={["#F2D7CF", "#F2BEAC"]} style={styles.container}>
      <Text style={styles.title}>My Chat</Text>

      <TextInput
        style={styles.input}
        placeholder="Mobile"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
        placeholderTextColor={"white"}
      />
      <View style={styles.input2}>
        <TextInput
          style={styles.password}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={"white"}
          secureTextEntry={!isVisible}
        />
        <TouchableOpacity style={styles.eye} onPress={handleVisibility}>
          <FontAwesome6
            name={isVisible ? "eye" : "eye-slash"}
            size={16}
            color={"white"}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => {
          router.replace("/signUp");
        }}
      >
        <Text>New User? Regester Here</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F7F9FC", // Light background color
  },
  title: {
    fontSize: 60,
    marginTop: -100,
    marginBottom: 50,
    textAlign: "center",
    fontFamily: "Montserrat-Bold",
    color: "#ff7e5f",
  },
  input: {
    height: 50,
    borderColor: "#F2BEBD",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#F2BEAC",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
  },
  input2: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#F2BEBD",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#F2BEAC",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  password: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#ff7e5f",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // For Android shadow
  },
  eye: {
    justifyContent: "center",
    paddingEnd: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  button2: {
    alignItems: "center",
    marginTop: 20,
  },
});
