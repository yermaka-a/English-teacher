import { CreateModal } from "@/components/CreateModal";
import { TABS_NAMES } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
const TabsLayout = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tabs
        screenOptions={{
          sceneStyle: { backgroundColor: "" },
          tabBarActiveTintColor: "#8CBFFF",
          animation: "shift",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: TABS_NAMES.home,
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="mock_create"
          options={{
            title: TABS_NAMES.create,
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons name="add-outline" size={32} color={color} />
            ),
            tabBarButton: (props) => {
              const { style, children } = props;

              return (
                <TouchableOpacity
                  style={style}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  {children}
                </TouchableOpacity>
              );
            },
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: TABS_NAMES.library,
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons name="library-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="practice"
          options={{
            title: TABS_NAMES.practice,
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="extension-puzzle-outline"
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
      <CreateModal
        modalState={modalVisible}
        onRequestClose={(e) => setModalVisible(false)}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default TabsLayout;
