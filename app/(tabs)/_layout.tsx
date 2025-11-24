import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabLayout() {
	// const colorScheme = useColorScheme() || "light";
	const colorScheme = "light";
	const iconSize = 24;

	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					backgroundColor: Colors[colorScheme].background,
					borderTopWidth: 0,
					height: 60,
				},
				tabBarItemStyle: {
					paddingVertical: Platform.OS === "android" ? 4 : 10,
				},
				tabBarLabelStyle: {
					marginBottom: 0,
				},
				tabBarActiveTintColor: Colors[colorScheme].tint,
				headerShown: false,
				tabBarShowLabel: false,
				tabBarButton: HapticTab,
			}}
		>
			<Tabs.Screen
				name="recommended"
				options={{
					title: "Recommendations",
					tabBarIcon: ({ color, focused }) => (
						<Fontisto
							size={iconSize}
							name="tinder"
							color={focused ? "#FD3A73" : color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="likedOpponents"
				options={{
					title: "Liked Opponents",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons
							size={iconSize}
							name="star-four-points"
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: "Explore",
					tabBarIcon: ({ color }) => (
						<Ionicons size={iconSize} name="grid" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="chat"
				options={{
					tabBarIcon: ({ color }) => (
						<Ionicons size={iconSize} name="chatbubbles-sharp" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					tabBarIcon: ({ color }) => (
						<Ionicons size={iconSize} name="person" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
