// App.js

import SwipedView from "@/page/swiped-view";
import type { AccountProps } from "@/types/account";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons"; // Untuk ikon tombol
import React, { useRef, useState } from "react";
import { StatusBar, TouchableOpacity, View } from "react-native";
import type Swiper from "react-native-deck-swiper";
import { SafeAreaView } from "react-native-safe-area-context";

// Data dummy untuk demonstrasi
const DUMMY_USERS: AccountProps[] = [
	{
		id: 1,
		name: "Sarah",
		age: 24,
		location: "Jakarta, Indonesia",
		pictures:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: 2,
		name: "David",
		age: 27,
		location: "Tangerang, Banten",
		pictures:
			"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: 3,
		name: "Maria",
		age: 22,
		location: "Depok, Jawa Barat",
		pictures:
			"https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: 4,
		name: "Alex",
		age: 29,
		location: "Jakarta, Indonesia",
		pictures:
			"https://images.unsplash.com/photo-1557862590-f92524f2b1d3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
];

export default function App() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const swiperRef = useRef<Swiper<AccountProps>>(null);

	// Fungsi untuk handle swipe kiri
	const handleSwipeLeft = () => {
		swiperRef.current?.swipeLeft();
	};

	// Fungsi untuk handle swipe kanan
	const handleSwipeRight = () => {
		swiperRef.current?.swipeRight();
	};

	// Fungsi untuk handle swipe ulang (rewind)
	const handleRewind = () => {
		// Note: react-native-deck-swiper tidak memiliki method rewind bawaan
		// Anda mungkin perlu mengimplementasikan logika custom jika ingin fitur ini
		// Untuk demo ini, kita akan melewati saja atau melakukan swipeRight lagi
		alert("Rewind fitur belum diimplementasikan secara langsung. Swipe lagi!");
	};

	return (
		<SafeAreaView className="flex-1 bg-gray-100 pt-8">
			<StatusBar barStyle="dark-content" />

			{/* Header */}
			<View className="flex-row items-center justify-between px-4 pb-2">
				<TouchableOpacity>
					<Feather name="user" size={28} color="#A0A0A0" />
				</TouchableOpacity>
				<Ionicons name="flame" size={32} color="#FD3A73" />
				<TouchableOpacity>
					<Ionicons name="chatbubbles-outline" size={28} color="#A0A0A0" />
				</TouchableOpacity>
			</View>

			{/* Swiper Area */}
			<SwipedView accounts={DUMMY_USERS} />

			{/* Footer Buttons */}
			<View className="flex-row justify-around items-center py-4 bg-white border-t border-gray-200">
				<TouchableOpacity
					onPress={handleRewind}
					className="bg-yellow-100 p-3 rounded-full shadow-md"
				>
					<Ionicons name="reload" size={24} color="#FDCB02" />
				</TouchableOpacity>

				<TouchableOpacity
					onPress={handleSwipeLeft}
					className="bg-red-100 p-4 rounded-full shadow-lg"
				>
					<AntDesign name="close" size={30} color="#FD3A73" />
				</TouchableOpacity>

				<TouchableOpacity
					onPress={handleSwipeRight}
					className="bg-green-100 p-4 rounded-full shadow-lg"
				>
					<AntDesign name="heart" size={30} color="#2ED573" />
				</TouchableOpacity>

				<TouchableOpacity className="bg-purple-100 p-3 rounded-full shadow-md">
					<Ionicons name="flash-sharp" size={24} color="#8A2BE2" />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
