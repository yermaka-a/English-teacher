import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface DeckCardProps {
  title: string;
  count: number;
  progress: number;
  color: string;
  icon: string;
}

const DeckCard = ({ title, count, progress, color, icon }: DeckCardProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className={`${color} rounded-2xl p-6 mb-4 border border-gray-200 dark:border-gray-700`}
      //   onPress={() =>
      //     router.push(`/deck/${title.toLowerCase().replace(/\s+/g, "-")}`)
      //   }
    >
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center">
          <FontAwesome name={icon as any} size={24} color="#4b5563" />
          <Text className="text-2xl font-bold text-gray-800 dark:text-white ml-3">
            {title}
          </Text>
        </View>
        <View className="bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full">
          <Text className="font-semibold text-gray-700 dark:text-white">
            {count} слов
          </Text>
        </View>
      </View>

      <View className="mb-2">
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-600 dark:text-gray-300">Прогресс</Text>
          <Text className="font-semibold text-gray-700 dark:text-white">
            {progress}%
          </Text>
        </View>
        <View className="h-2 bg-white/50 dark:bg-gray-800/50 rounded-full overflow-hidden">
          <View
            className="h-full bg-primary rounded-full"
            style={{ width: `${progress}%` }}
          />
        </View>
      </View>

      <TouchableOpacity className="mt-4 flex-row items-center justify-center bg-white/30 dark:bg-gray-800/30 py-2 rounded-lg">
        <FontAwesome name="play-circle" size={20} color="#3b82f6" />
        <Text className="text-primary font-semibold ml-2">Продолжить</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default DeckCard;
