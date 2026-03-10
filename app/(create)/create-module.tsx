import { Divider } from "@/components/Divider";
import { TranslationCard } from "@/components/TranslationCard";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useImmer } from "use-immer";
import { v7 as UUIDv7 } from "uuid";

const CreateModule = () => {
  const FIRST_EL_ID = UUIDv7();
  const [topic, updateTopic] = useImmer("");
  const [translations, updateTranslations] = useImmer([
    {
      id: FIRST_EL_ID,
      term: "",
      translation: "",
    },
  ]);

  const addTranslationItem = () => {
    const ID = UUIDv7();
    updateTranslations((translations) => {
      translations.push({ id: ID, term: "", translation: "" });
    });
  };

  const deleteTranslationItem = (id: string) => {
    updateTranslations((translations) => {
      const index = translations.findIndex((t) => t.id === id);
      if (index !== -1 && index > 0) {
        translations.splice(index, 1);
      }
    });
  };

  const deleteEmptyTranslations = () => {
    updateTranslations((translations) => {
      if (translations.length === 1) {
        return translations;
      }

      const firstEl = translations[0];
      const nonEmpty = translations.filter(
        (t, index) => index === 0 || t.term.trim() !== "" || t.translation.trim() !== ""
      );

      if (nonEmpty.length === 1) {
        return nonEmpty;
      }

      return nonEmpty;
    });
  };

  const changeTerm = (v: string, id: string) => {
    updateTranslations((translations) => {
      const item = translations.find((v) => v.id === id);
      if (item) item.term = v;
    });
  };
  const changeTranslation = (v: string, id: string) => {
    updateTranslations((translations) => {
      const item = translations.find((v) => v.id === id);
      if (item) item.translation = v;
    });
  };

  const allCardsFilled = translations.every(
    (t) => t.term.trim() !== "" && t.translation.trim() !== ""
  );

  const hasEmptyCards = translations.some(
    (t, index) => index > 0 && (t.term.trim() === "" || t.translation.trim() === "")
  );

  const handleCreateModule = () => {
    if (!topic.trim()) {
      Alert.alert("Ошибка", "Введите название модуля");
      return;
    }
    if (!allCardsFilled) {
      Alert.alert("Ошибка", "Все карточки должны быть заполнены");
      return;
    }
    Alert.alert("Успех", `Модуль "${topic}" создан!`);
  };

  return (
    <>
      <Stack.Screen options={{ title: "Создаем модуль" }} />
      <SafeAreaView>
        <View className="flex  align-middle px-5 ">
          <TextInput
            className="text-xl font-bold text-[primary] text-center w-full"
            placeholder="Название модуля"
            placeholderTextColor="#9ca3af"
            value={topic}
            onChangeText={(v) => updateTopic(v)}
            textAlign="center"
          />
          <Divider className="self-center" />
        </View>
        <FlatList
          data={translations}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => null}
          renderItem={({ item, index }) => (
            <TranslationCard
              term={item.term}
              translation={item.translation}
              onChangeTerm={(v) => changeTerm(v, item.id)}
              onChangeTranslation={(v) => changeTranslation(v, item.id)}
              onDelete={() => deleteTranslationItem(item.id)}
            />
          )}
          ListFooterComponent={
            <View className="px-5 mb-10 flex flex-row gap-4 flex-wrap">
              {allCardsFilled && (
                <TouchableOpacity
                  onPress={handleCreateModule}
                  className="bg-green-500 px-4 py-2 rounded-lg"
                >
                  <Text className="text-white font-semibold">Создать модуль</Text>
                </TouchableOpacity>
              )}

              {hasEmptyCards && (
                <TouchableOpacity
                  onPress={deleteEmptyTranslations}
                  className="bg-red-500 px-4 py-2 rounded-lg"
                >
                  <Text className="text-white font-semibold">Удалить пустые</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={addTranslationItem}
                className="bg-gray-600 px-4 py-2 rounded-lg"
              >
                <Text className="text-white font-semibold">Добавить</Text>
              </TouchableOpacity>
            </View>
          }
          keyboardShouldPersistTaps="handled"
        />
      </SafeAreaView>
    </>
  );
};

export default CreateModule;
