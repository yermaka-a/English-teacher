import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";
export default function RootLayout() {
  const [fontsLoaded, LoadingError] = useFonts({
    LoraMediumItalic: require("@/assets/fonts/Lora/static/Lora-MediumItalic.ttf"),
    Roboto: require("@/assets/fonts/Roboto/static/Roboto-Black.ttf"),
  });
  if (fontsLoaded) {
    return (
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    );
  } else if (LoadingError) {
    console.error("loading error: ", LoadingError);
    return null;
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }
}
