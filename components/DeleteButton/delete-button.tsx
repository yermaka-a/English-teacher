import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface DeleteButtonProps {
  onPress: () => void;
}

const DeleteButton = ({ onPress }: DeleteButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="p-1">
      <View className="bg-red-500/20 rounded-full p-1">
        <Ionicons name="trash-outline" color="#ef4444" size={20} />
      </View>
    </TouchableOpacity>
  );
};

export default DeleteButton;
