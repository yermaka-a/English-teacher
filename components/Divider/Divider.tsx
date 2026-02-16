import { cn } from "@/helpers";
import React from "react";
import { View } from "react-native";

interface DividerOptions {
  className?: string;
}

const Divider = ({ className }: DividerOptions) => {
  return (
    <View className={cn("w-[90%] h-[1px]  bg-neutral-300", className)}></View>
  );
};

export default Divider;
