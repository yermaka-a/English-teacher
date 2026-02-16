import React from "react";
import { Modal, Text, View } from "react-native";

interface CreateModalOptions {
  modalState: boolean;
  onClose: (state: boolean) => void;
}

const CreateModal = ({ modalState, onClose }: CreateModalOptions) => {
  return (
    <Modal
      animationType="fade"
      visible={modalState}
      transparent={true}
      onRequestClose={() => onClose(false)}
    >
      <View
        className="flex-1 bg-[rgba(0,0,0,0.5)] justify-end"
        onTouchEnd={() => onClose(false)}
      >
        <View
          className="bg-slate-200 p-6 rounded-t-[25px] w-full min-h-[300px]"
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <View className="w-10 h-1 bg-slate-400 rounded-full self-center mb-4" />
          <Text className="text-xl font-bold text-center">Create Modal</Text>
        </View>
      </View>
    </Modal>
  );
};

export default CreateModal;
