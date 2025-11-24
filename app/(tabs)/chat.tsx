import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Chat = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center flex-row gap-2">
        <Ionicons name="chatbubbles-sharp" size={30} />
        <Text className="text-xl font-bold">Chat Page</Text>
      </View>

    </SafeAreaView>
  );
}

export default Chat;