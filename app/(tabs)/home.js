import { FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import host from "../../host";

export default function home() {
  const [chatContacts, setChatContacts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let userJson = await AsyncStorage.getItem("user");

      let user = JSON.parse(userJson);

      let response = await fetch(
        host+"/MyChatBackend/LoadHomeData?id=" +
          user.id
      );
      if (response.ok) {
        let json = await response.json();

        setChatContacts(json.json_chat_array);
      }
    }

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlashList
        data={chatContacts}
        estimatedItemSize={200}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.contactContainer} onPress={() => {
            router.push({pathname: '/chat', params: item})
          }}>
            <View
              style={
                item.other_user_status == 1 ? styles.view6_1 : styles.view6_2
              }
            >
              {item.avatar_image_found ? (
                <Image
                  source={
                    host+"/MyChatBackend/avatarImages/" +
                    item.other_user_mobile +
                    ".png"
                  }
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarView}>
                  <Text style={styles.userText}>
                    {item.other_user_avatar_letters}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.contactDetails}>
              <Text style={styles.contactName}>{item.other_user_name}</Text>
              <View style={styles.messageRow}>
                <FontAwesome6
                  name={item.seen ? "check-double" : "check"}
                  size={14}
                  color={item.seen ? "#34B7F1" : "#999"}
                />
                <Text numberOfLines={1} style={styles.lastMessage}>
                  {item.last_message}
                </Text>
              </View>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{item.dateTime}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10,
  },
  contactContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333"
  },
  contactDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
  timeContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  view6_1: {
    width: 55,
    height: 55,
    borderRadius: 80 / 2,
    borderWidth: 2,
    borderColor: "green",
    borderStyle: "solid",
  },
  view6_2: {
    width: 55,
    height: 55,
    borderRadius: 80 / 2,
    backgroundColor: "#B2B2B2",
    borderWidth: 2,
    borderColor: "red",
    borderStyle: "solid",
  },
  timeText: {
    fontSize: 12,
    color: "#999",
  },

  avatarView: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e1e1e1',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
});
