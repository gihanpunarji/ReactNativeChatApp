import { useEffect } from "react";
import { Text, View } from "react-native";

export default function home() {
  useEffect(() => {
    async function fetchData() {
      let userJson = await AsyncStorage.getItem("user");

      let user = JSON.parse(userJson);
      let response = await fetch(
        "https://6461-112-134-193-84.ngrok-free.app/myChat/LoadHomeData?id=" +
          user.id
      );
      if (response.ok) {
        let json = await response.json();
        let chatArr = json.json_chat_array;
        setChatArray(chatArr);
      }
    }

    fetchData();
  }, []);

  return (
    <View>
      <Text>home</Text>
    </View>
  );
}
