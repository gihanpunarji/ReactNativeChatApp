import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentUser, setCurrentUser] = useState([]);
  const [avatarImageFound, setAvatarImageFound] = useState(false);

  console.log(currentUser);

  const handleSave = async () => {
    let user = {
      id: currentUser.id,
      firstName: firstName,
      lastName: lastName,
    };
    let response = await fetch(
      process.env.EXPO_PUBLIC_HOST_URL + "/MyChatBackend/UpdateUser",
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      let json = await response.json();
      setFirstName(json.first_name);
      setLastName(json.last_name);
    }
  };

  useEffect(() => {
    async function fetchUserProfile() {
      let currentUserJson = await AsyncStorage.getItem("user");
      setCurrentUser(JSON.parse(currentUserJson));
    }
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (currentUser) {
      async function checkAvatarImage() {
        try {
          const timestamp = new Date().getTime();
          let response = await fetch(
            process.env.EXPO_PUBLIC_HOST_URL +
              "/MyChatBackend/avatarImages/" +
              currentUser.mobile +
              ".png?ts=" +
              timestamp
          );

          if (response.ok) {
            setAvatarImageFound(true);
            console.log(response.status);
          } else {
            setAvatarImageFound(false);
          }
        } catch (e) {
          console.log("Error fetching the image");
          setAvatarImageFound(false);
        }
      }
      checkAvatarImage();
    }
  }, [currentUser]);

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <View style={styles.imageContainer}>
        {avatarImageFound ? (
          <Image
            source={
              process.env.EXPO_PUBLIC_HOST_URL +
              "/MyChatBackend/avatarImages/" +
              currentUser.mobile +
              ".png"
            }
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.avatarView}>
            <Text style={styles.userText}>No Profile Image</Text>
          </View>
        )}
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter First Name"
          value={currentUser.fname}
          onChangeText={setFirstName}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Last Name"
          value={currentUser.lname}
          onChangeText={setLastName}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          Alert.alert("Logout", "Do you want to logout from the app", [
            {
              text: "Logout",
              onPress: async () => {
                await AsyncStorage.removeItem("user");
                router.replace("/")
              },
            },
            {
              text: "Cancel",
              onPress: () => {
                console.log("cancel")
              },
            },
          ]);
        }}
      >
        <Text style={styles.saveButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  inputContainer: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#ee3311",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  avatarView: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#e1e1e1",
    justifyContent: "center",
    alignItems: "center",
  },
  userText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});

export default profile;
