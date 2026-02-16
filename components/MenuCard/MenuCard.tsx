import { Divider } from "@/components/Divider";
import type { MenuCardOptions } from "@/components/MenuCard";
import React from "react";
import { Text, View } from "react-native";
const MenuCard = (options: MenuCardOptions) => {
  return (
    <View className="px-5">
      <View className="shadow-sm  p-4 bg-slate-100 rounded-lg  shadow-blue-300 flex gap-1">
        <View className="flex flex-row gap-1">
          {options.image ?? null}
          <Text className="font-medium text-[1.5rem] text-wrap">
            {options.title}
          </Text>
        </View>
        <Divider className="mb-2" />
        <View>
          <Text className="text-[1.1rem] text-wrap w-[90%] ">
            {options.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MenuCard;
