import { cn } from "@/lib";
import React, { type ReactNode } from "react";
import { Pressable, View } from "react-native";

interface CreateItemProps {
  onPress?: () => void;
  children?: ReactNode;
}

const CreateItem = (props: CreateItemProps) => {
  return (
    <Pressable onPress={props.onPress}>
      {({ pressed }) => (
        <View
          className={cn(
            "p-4 rounded-[15px] flex flex-row items-center gap-3",
            pressed ? "bg-slate-300" : "bg-slate-100 opacity-80",
          )}
        >
          {props.children}
        </View>
      )}
    </Pressable>
  );
};

export default CreateItem;
