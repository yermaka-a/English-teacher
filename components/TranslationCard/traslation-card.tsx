import { DeleteButton } from "@/components/DeleteButton";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface TranslationCardProps {
  term: string;
  translation: string;
  onChangeTerm: (value: string) => void;
  onChangeTranslation: (value: string) => void;
  onDelete?: () => void;
}

const TranslationCard = ({
  term,
  translation,
  onChangeTerm,
  onChangeTranslation,
  onDelete,
}: TranslationCardProps) => {
  const [editingField, setEditingField] = useState<
    "term" | "translation" | null
  >(null);

  const handleClose = () => {
    Keyboard.dismiss();
    setEditingField(null);
  };

  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="p-5"
        >
          <View className="p-1 bg-secondary rounded-lg gap-2">
            {editingField === "term" ? (
              <TextInput
                autoFocus
                className="bg-secondary py-2 pl-5 text-primary"
                placeholder="Термин"
                value={term}
                onChangeText={onChangeTerm}
                onBlur={() => setEditingField(null)}
                returnKeyType="next"
                onSubmitEditing={() => {
                  console.log("trans");
                  setEditingField("translation");
                }}
              />
            ) : (
              <Text
                className="bg-secondary py-2 pl-5 text-primary opacity-70"
                onPress={() => setEditingField("term")}
              >
                {term || "Термин"}
              </Text>
            )}

            <View className="h-[1px] bg-gray-300 w-[90%] self-center" />

            {editingField === "translation" ? (
              <TextInput
                autoFocus
                className="bg-secondary py-2 pl-5 text-primary"
                placeholder="Перевод"
                value={translation}
                onChangeText={onChangeTranslation}
                onBlur={() => setEditingField(null)}
                returnKeyType="done"
                onSubmitEditing={handleClose}
              />
            ) : (
              <Text
                className="bg-secondary py-2 pl-5 text-primary opacity-70"
                onPress={() => setEditingField("translation")}
              >
                {translation || "Перевод"}
              </Text>
            )}
          </View>
          {onDelete && (
            <View className="absolute right-2 top-2">
              <DeleteButton onPress={onDelete} />
            </View>
          )}
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TranslationCard;
