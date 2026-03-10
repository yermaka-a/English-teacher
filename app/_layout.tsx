import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import React, { Suspense } from "react";
import {
  ActivityIndicator,
  Platform,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-get-random-values";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  DB_NAME,
  expoDb,
  useAppDrizzleStudio,
  useAppMigrations,
} from "@/db/client.native";
import { NAV_THEME } from "@/lib/theme";
import { enableMapSet } from "immer";
import "./global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  enableMapSet();
  // Вызывается только в нативе, на вебе вернет заглушку
  const { success, error: migrationError } = useAppMigrations();
  useAppDrizzleStudio(expoDb);

  const [fontsLoaded] = useFonts({
    LoraMediumItalic: require("@/assets/fonts/Lora/static/Lora-MediumItalic.ttf"),
    Roboto: require("@/assets/fonts/Roboto/static/Roboto-Black.ttf"),
  });

  if (Platform.OS === "web") {
    return (
      <View>
        <Text>SQLite не поддерживается в вебе</Text>
      </View>
    );
  }

  if (migrationError)
    return (
      <View>
        <Text>Ошибка: {migrationError.message}</Text>
      </View>
    );

  if (!success || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <Suspense fallback={<ActivityIndicator size={"large"} />}>
      <SQLiteProvider
        databaseName={DB_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider value={NAV_THEME[colorScheme ?? "light"]}>
            <SafeAreaProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
              <PortalHost />
            </SafeAreaProvider>
          </ThemeProvider>
        </GestureHandlerRootView>
      </SQLiteProvider>
    </Suspense>
  );
}
