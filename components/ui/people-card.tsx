import type { AccountProps } from "@/types/account";
import { Feather } from "@expo/vector-icons";
import { memo } from "react";
import { Dimensions, Image, Text, View } from "react-native";

type PeopleCardProps = {
	data: AccountProps;
};
const screenWidth = Dimensions.get("window").width;
const ASPECT_RATIO = 3 / 4;
const dynamicHeight = screenWidth / ASPECT_RATIO;

const PeopleCard = memo(function PeopleCard({ data }: PeopleCardProps) {

	return (
		<View
			className="relative overflow-hidden shadow-lg bg-amber-400 mx-4"
			style={{
				width: screenWidth,
				height: dynamicHeight,
			}}
		>
			<Image
				source={{ uri: data.pictures }}
				style={{ width: "100%", height: "100%" }}
				className="w-full h-full absolute top-0 left-0"
				resizeMode="cover"
			/>
			{/* <View className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent"> */}
			<View className="absolute top-0 left-0 right-0 p-4 bg-amber-400">
				<Text className="text-white text-lg font-bold bg-cyan-500">
					{data.name}, {data.age}
				</Text>
				<Text className="text-white">
					<Feather name="map-pin" size={18} />
					{data.location}
				</Text>
			</View>
		</View>
	);
});

export default PeopleCard;
