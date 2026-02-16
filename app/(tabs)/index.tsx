import { Header } from "@/components/Header";
import { MenuCard } from "@/components/MenuCard";
import { TABS_TITLE } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  return (
    <SafeAreaView edges={["top"]}>
      <Header title={TABS_TITLE} />
      <MenuCard
        title="MenuCard"
        description="lorem ipsum fkfldf; sdlf dklf;sdklfdskf ew  efkle k;wfelwfke;l f;wle "
        image={<Ionicons name="alarm-outline" size={32} />}
      />
    </SafeAreaView>
  );
}
