import { FontAwesome6 } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const chat = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: "1", text: "Hey, how are you?", sender: "other" },
    { id: "2", text: "I'm fine, thanks! How about you?", sender: "me" },
  ]);

  return (
    <View style={styles.container}>
      {/* Top Bar with Avatar, Name, and Status */}
      <View style={styles.topBar}>
        <Image source={""} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userStatus}>Online</Text>
        </View>
      </View>

      <View style={styles.chatBody}>
        {/* Sender's Message */}
        <View style={styles.senderContainer}>
          <Text style={styles.senderName}>John Doe</Text>
          <View style={styles.senderMessageBox}>
            <Text style={styles.messageText}>Hello, how are you?</Text>
          </View>
          <Text style={styles.messageTime}>09:30 AM</Text>
        </View>

        {/* Receiver's Message */}
        <View style={styles.receiverContainer}>
          <Text style={styles.receiverName}>Jane Smith</Text>
          <View style={styles.receiverMessageBox}>
            <Text style={styles.messageText}>I'm doing well, thanks!</Text>
          </View>
          <Text style={styles.messageTime}>09:31 AM</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendButton}>
          <FontAwesome6 name="paper-plane" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#007AFF",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: "column",
  },
  userName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  userStatus: {
    color: "#d1f7c4", // Light green for online status
    fontSize: 14,
  },
  chatBody: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  senderContainer: {
    alignSelf: "flex-end",
    marginBottom: 15,
    maxWidth: "75%",
  },
  senderName: {
    color: "#007AFF", // Customize with any color you like
    fontWeight: "bold",
    marginBottom: 3,
    textAlign: "right",
  },
  senderMessageBox: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  receiverContainer: {
    alignSelf: "flex-start",
    marginBottom: 15,
    maxWidth: "75%",
  },
  receiverName: {
    color: "#FF5733", // Customize with any color you like
    fontWeight: "bold",
    marginBottom: 3,
  },
  receiverMessageBox: {
    backgroundColor: "#292726",
    padding: 10,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
  },
  messageText: {
    color: "white",
  },
  messageTime: {
    fontSize: 12,
    color: "#888",
    marginTop: 3,
    textAlign: "right", // For sender and receiver, time will be aligned based on the container
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 20,
  },
});

export default chat;
