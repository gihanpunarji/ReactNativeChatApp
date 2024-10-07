import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={16} name="house" color={color} />
          ),
        }}
      />
      <Tabs.Screen name="group" 
      options={{
        title: 'Groups',
        tabBarIcon: ({ color }) => <FontAwesome6 size={16} name="user-group" color={color} />,
      }}/>
      <Tabs.Screen name="profile" 
      options={{
        title: 'Profile',
        tabBarIcon: ({ color }) => <FontAwesome6 size={16} name="user" color={color} />,
      }}/>
    </Tabs>
  );
};

export default TabLayout;
