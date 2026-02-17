import React, { useState, type ReactNode } from "react";
import { View } from "react-native";

interface CreateItemProps {
  children?: ReactNode;
}

const CreateItem = (props: CreateItemProps) => {
  const [pressed, setPressed] = useState(false);

  return (
    <View
      className="p-4 rounded-[15px] flex flex-row items-center gap-3"
      style={{
        backgroundColor: pressed ? "#9ca3af" : "#cbd5e1",
      }}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onTouchCancel={() => setPressed(false)}
    >
      {props.children}
    </View>
  );
};

export default CreateItem;
