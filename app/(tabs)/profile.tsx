import Container from "@/ui/container";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const Profile = () => {
  return (
    <Container>
      <View className="flex-1 justify-center items-center flex-row gap-2">
        <Ionicons name="person" size={30} />
        <Text className="font-bold text-xl">Profile Page</Text>
      </View>
    </Container>
  );
};

export default Profile;
