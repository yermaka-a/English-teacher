import CreateItem from "@/components/CreateModal/CreateItem";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, type ReactNode } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { scheduleOnRN } from "react-native-worklets";

interface CreateModalOptions {
  modalState: boolean;
  onClose: (value: boolean) => void;
}
type Topics = "CreateModule" | "CreateFolder";

interface CreateItemProps {
  topicKey: Topics;
  topic: string;
  renderIcon: () => ReactNode;
}

const CreateModal = ({ modalState, onClose }: CreateModalOptions) => {
  const overlayOpacity = useSharedValue(0);
  const slideOffset = useSharedValue(300);
  const translationY = useSharedValue(0); // для отслеживания смещения в жесте

  const topics = useRef<CreateItemProps[]>([
    {
      topicKey: "CreateModule",
      topic: "Создать модуль",
      renderIcon: () => <Ionicons name="card-outline" size={32} />,
    },
    {
      topicKey: "CreateFolder",
      topic: "Создать папку",
      renderIcon: () => <Ionicons name="folder-open-outline" size={32} />,
    },
  ]);
  useEffect(() => {
    if (modalState) {
      overlayOpacity.value = withTiming(1, {
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
      slideOffset.value = withSpring(0, { stiffness: 150 });
    } else {
      overlayOpacity.value = withTiming(0, { duration: 150 });
      slideOffset.value = withTiming(300, {
        duration: 200,
        easing: Easing.in(Easing.ease),
      });
    }
  }, [modalState]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: slideOffset.value }],
  }));

  // Создаём жест панорамирования с помощью Gesture.Pan
  const panGesture = Gesture.Pan()
    .onStart(() => {
      // Запоминаем текущее смещение при старте жеста
      translationY.value = slideOffset.value;
    })
    .onUpdate((event) => {
      // Обновляем смещение, следуя за пальцем, но не позволяем уйти выше 0
      const newOffset = translationY.value + event.translationY;
      slideOffset.value = Math.max(0, newOffset);
    })
    .onEnd(() => {
      const threshold = 100;
      if (slideOffset.value > threshold) {
        // Закрываем модалку
        slideOffset.value = withTiming(300, { duration: 200 }, (finished) => {
          if (finished) {
            scheduleOnRN(onClose, false);
          }
        });
        overlayOpacity.value = withTiming(0, { duration: 150 });
      } else {
        // Возвращаем на место
        slideOffset.value = withSpring(0, { stiffness: 150 });
      }
    });

  if (!modalState) return null;

  return (
    <View className="absolute inset-0">
      <TouchableWithoutFeedback onPress={() => onClose(false)}>
        <Animated.View
          className="absolute inset-0 bg-black/50"
          style={overlayStyle}
        />
      </TouchableWithoutFeedback>

      {/* Оборачиваем контент в GestureDetector */}
      <GestureDetector gesture={panGesture}>
        <Animated.View
          className="absolute bottom-0 left-0 right-0 bg-slate-200 p-6 rounded-t-[25px] min-h-[300px]"
          style={contentStyle}
        >
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View className="flex gap-4">
              <View className="w-10 h-1 bg-slate-400 rounded-full self-center mb-4" />
              {topics.current.map((v) => (
                <CreateItem key={v.topicKey}>
                  {v.renderIcon()}
                  <Text className="text-[16px] font-LoraMediumItalick">
                    {v.topic}
                  </Text>
                </CreateItem>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default CreateModal;
