import Container from "@/page/container";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <Container>
      <View className="flex-1 flex-row gap-4 justify-center items-center">
        <Ionicons name="grid" size={30} />
        <Text className="font-bold text-xl">Explore Page</Text>
      </View>
    </Container>
  );
}
