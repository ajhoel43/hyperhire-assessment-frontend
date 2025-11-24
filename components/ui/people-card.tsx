import type { AccountProps } from "@/types/account";
import { Feather } from "@expo/vector-icons";
import { memo } from "react";
import { Image, Text, View } from "react-native";

type PeopleCardProps = {
	data: AccountProps;
};
// const screenWidth = Dimensions.get("window").width;
// const ASPECT_RATIO = 3 / 4;
// const dynamicHeight = screenWidth / ASPECT_RATIO;

const PeopleCard = memo(function PeopleCard({ data }: PeopleCardProps) {
	return (
		<View className="relative overflow-hidden shadow-lg h-[80%] rounded-3xl mx-2">
			<Image
				source={{ uri: data.pictures }}
				className="w-full h-full absolute top-0 left-0"
				resizeMode="cover"
			/>
			<View className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/40 to-transparent h-28 gap-2">
				<Text className="text-white text-lg font-bold">
					{data.name}, {data.age}
				</Text>
				<Text className="text-white flex gap-2 items-center">
					<Feather name="map-pin" size={18} />
					{data.location}
				</Text>
			</View>
		</View>
	);
});

export default PeopleCard;
