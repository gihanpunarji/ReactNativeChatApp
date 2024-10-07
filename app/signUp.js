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
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useCustomFonts } from "../useCustomFonts";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function signUp() {
  const [mobile, setMobile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  const handleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const handleCreateAccount = async () => {
    let form = new FormData();
    form.append("firstName", firstName);
    form.append("lastName", lastName);
    form.append("password", password);
    form.append("mobile", mobile);

    if(image != null) {
      form.append("avatar", {
        name: "avatar.png",
        type: "image/png",
        uri: image
      });
    }

    let response = await fetch(
      process.env.EXPO_PUBLIC_HOST_URL+"/MyChatBackend/SignUp",
      {
        method: "POST",
        body: form,
      }
    );

    if (response.ok) {
      let json = await response.json();
      if (json.success) {
        Alert.alert("Yehe", json.message);
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
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {image ? (
          <Image source={image} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>
              Select Profile Image
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Mobile"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
        placeholderTextColor={"#888"}
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        placeholderTextColor={"#888"}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        placeholderTextColor={"#888"}
      />
      <View style={styles.input2}>
        <TextInput
          style={styles.password}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={"#888"}
          secureTextEntry={!isVisible}
        />
        <TouchableOpacity style={styles.eye} onPress={handleVisibility}>
          <FontAwesome6 name={isVisible? "eye": "eye-slash"} size={16} color={"white"} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button2} onPress={()=> {
        router.replace("/")
      }}>
        <Text>Already Registered? Sign In</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F7F9FC", // Light background color
  },
  title: {
    fontSize: 60,
    marginTop: -50,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Montserrat-Bold",
    color: "#ff7e5f",
  },
  imageContainer: {
    alignSelf: "center",
    marginBottom: 20,
    color: "white",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#ff7e5f", // Border color to match the button
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // For Android shadow
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#FF926A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FF916C", // Border color to match the button
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // For Android shadow
  },
  imagePlaceholderText: {
    textAlign: "center",
    color: "white",
    fontWeight: "500", // Slightly bolder font
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
    marginTop: 20
  }
});

