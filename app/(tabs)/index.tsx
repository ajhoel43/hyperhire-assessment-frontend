// App.js

import SwipedView from "@/page/swiped-view";
import { useLikeMutation, useRecommendationAccount } from "@/queries/useAccount";
import type { AccountProps } from "@/types/account";
import Button from "@/ui/button";
import { AntDesign, Fontisto, Ionicons } from "@expo/vector-icons"; // Untuk ikon tombol
import { useCallback, useRef, useState } from "react";
import { StatusBar, Text, View } from "react-native";
import type Swiper from "react-native-deck-swiper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecommendedPeople() {
	// const [currentIndex, setCurrentIndex] = useState(0);
	const swiperRef = useRef<Swiper<AccountProps> & { resetDeck: () => void }>(null);
	const [page, setPage] = useState(1);

	const { data: recommendPeople, isLoading, isFetching, refetch } = useRecommendationAccount({ page, limit: 5 });
	const { likeAccount, dislikeAccount } = useLikeMutation();

	const handleSwipeLeft = () => {
		swiperRef.current?.swipeLeft();
	};

	const handleSwipeRight = () => {
		swiperRef.current?.swipeRight();
	};

	const handleRewind = () => {
		// alert("Rewind fitur belum diimplementasikan secara langsung. Swipe lagi!");
		setPage(1); // reset pagination
		refetch();
		swiperRef.current?.resetDeck();
	};

	const onLike = useCallback(async (account: AccountProps) => {
		try {

			await likeAccount.mutateAsync({ accountId: account.id });
		} catch (error) {
			console.log("onLike Error", error);
		}
	}, [likeAccount]);

	const onDislike = useCallback(async (account: AccountProps) => {
		try {
			await dislikeAccount.mutateAsync({ accountId: account.id });
		} catch (error) {
			console.log("onDislike Error", error);
		}
	}, [dislikeAccount])

	return (
		<SafeAreaView className="flex-1 bg-gray-100">
			<StatusBar barStyle="dark-content" />

			{/* Header */}
			<View className="flex-row items-center justify-center px-4 pb-2 pt-4 gap-1">
				<Fontisto name="tinder" size={30} color="#FD3A73" />
				<Text className="font-bold text-[32px] text-[#FD3A73]">tinder</Text>
			</View>

			{/* Swiper Area */}
			<SwipedView
				ref={swiperRef}
				loading={isLoading || isFetching}
				accounts={(recommendPeople?.peoples.data || []) as AccountProps[]}
				fetchNext={() => setPage(prevState => prevState + 1)}
				onSwipeRight={onLike}
				onSwipeLeft={onDislike}
			/>

			{/* Footer Buttons */}
			<View className="flex-row justify-around items-center py-4 z-10">
				<Button onPress={handleRewind}>
					<Ionicons name="reload" size={24} color="#FDCB02" />
				</Button>
				<Button onPress={handleSwipeLeft}>
					<AntDesign name="close" size={30} color="#FD3A73" />
				</Button>
				<Button onPress={handleSwipeRight}>
					<AntDesign name="heart" size={30} color="#2ED573" />
				</Button>
				<Button>
					<Ionicons name="flash-sharp" size={24} color="#8A2BE2" />
				</Button>
			</View>
		</SafeAreaView>
	);
}
