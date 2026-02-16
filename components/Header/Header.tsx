import { Text, View } from "react-native";
import { HeaderOptions } from "./types";
const Header = (options: HeaderOptions) => {
  return (
    <View className="p-5  flex justify-center   pl-5">
      <Text
        className="text-[2rem] color-primary font-extrabold font-RobotoBlack text-wrap bg-none"
        style={{
          textShadowColor: "rgba(140, 177, 229, 0.75)",
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 1,
        }}
      >
        {options.title}
      </Text>
    </View>
  );
};

export default Header;
