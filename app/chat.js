import { FontAwesome6 } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal
} from "react-native";
import host from "../host";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const chat = () => {
  const userItem = useLocalSearchParams();

  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      let currentUserJson = await AsyncStorage.getItem("user");
      let currentUser = JSON.parse(currentUserJson);

      let response = await fetch(
        host +
          "/MyChatBackend/LoadChat?user_id=" +
          currentUser.id +
          "&other_user_id=" +
          userItem.other_user_id
      );
      if (response.ok) {
        let chatArray = await response.json();
        setChatMessages(chatArray);
      }
    }
    fetchMessages();
    setInterval(() => {
      fetchMessages();
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      {/* Top Bar with Avatar, Name, and Status */}
      <View style={styles.topBar}>
        {userItem.avatar_image_found == "true" ? (
          <Image
            source={
              host +
              "/MyChatBackend/avatarImages/" +
              userItem.other_user_mobile +
              ".png"
            }
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatarView}>
            <Text style={styles.userText}>
              {userItem.other_user_avatar_letters}
            </Text>
          </View>
        )}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userItem.other_user_name}</Text>
          <Text style={styles.userStatus}>
            {userItem.other_user_status == 1 ? "Online" : "Offline"}
          </Text>
        </View>
      </View>

      <View style={styles.chatBody}>
        {/* Sender's Message */}
        <FlashList
          data={chatMessages}
          renderItem={({ item }) => (
            <View
              style={
                item.side == "right"
                  ? styles.senderContainer
                  : styles.receiverContainer
              }
            >
              <TouchableOpacity
                onLongPress={() => {
                  Alert.alert("Delete Message", "Select a option", [
                    {
                      text: "Delete for everyone",
                      onPress: async () => {
                        console.log(item.messageId);
                        
                        let response = await fetch(host+"/MyChatBackend/DeleteMessage?msgid="+item.messageId);
                        if(response.ok) {
                          let json = await response.json();
                          if(json.success) {
                            console.log("deleted")
                          }
                        }
                      },
                    },
                    {
                      text: "Delete for me",
                      onPress: () => console.log("Delete for me"),
                    },
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel"),
                    },
                  ]);
                }}
                delayLongPress={500}
                style={
                  item.side == "right"
                    ? styles.senderMessageBox
                    : styles.receiverMessageBox
                }
              >
                <Text style={styles.messageText}>{item.message}</Text>
              </TouchableOpacity>
              <View style={styles.seenContainer}>
                <Text style={styles.messageTime}>{item.date_time}</Text>
                {item.side == "right" ? (
                  <FontAwesome6
                    name={item.status == 1 ? "check-double" : "check"}
                    size={12}
                    color={item.status == 1 ? "#34B7F1" : "#333"}
                  />
                ) : null}
              </View>
            </View>
          )}
          estimatedItemSize={200}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message"
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={async () => {
            if (message.length != 0) {
              let currentUserJson = await AsyncStorage.getItem("user");
              let currentUser = JSON.parse(currentUserJson);

              console.log("current user" + currentUser.id);
              console.log("other user" + userItem.other_user_id);

              let response = await fetch(
                host +
                  "/MyChatBackend/SendChat?user_id=" +
                  currentUser.id +
                  "&other_user_id=" +
                  userItem.other_user_id +
                  "&message=" +
                  message
              );

              if (response.ok) {
                let json = await response.json();
                if (json.success) {
                  console.log("sent");
                  setMessage("");
                }
              }
            }
          }}
        >
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
    paddingTop: 5,
  },
  senderContainer: {
    alignSelf: "flex-end",
    marginBottom: 4,
    maxWidth: "75%",
  },
  senderMessageBox: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  receiverContainer: {
    alignSelf: "flex-start",
    marginBottom: 4,
    maxWidth: "75%",
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
  seenContainer: {
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
  },
  avatarView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e1e1e1",
    justifyContent: "center",
    alignItems: "center",
  },
  userText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
  },
});

export default chat;
