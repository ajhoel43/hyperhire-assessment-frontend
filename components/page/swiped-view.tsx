import type { AccountProps } from "@/types/account";
import PeopleCard from "@/ui/people-card";
import { useRef, useState } from "react";
import { Text, View } from "react-native";
import Swiper from "react-native-deck-swiper";

type SwipeViewProps = {
	accounts: AccountProps[];
	handleSwipeLeft?: () => void;
	handleSwipeRight?: () => void;
};

const SwipedView = ({ accounts }: SwipeViewProps) => {
	const swiperRef = useRef<Swiper<AccountProps>>(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	// Fungsi untuk handle swipe kiri
	const handleSwipeLeft = () => {
		swiperRef.current?.swipeLeft();
	};

	// Fungsi untuk handle swipe kanan
	const handleSwipeRight = () => {
		swiperRef.current?.swipeRight();
	};

	return (
		<View className="flex flex-1 px-4 mt-2">
			{accounts.length > 0 ? (
				<Swiper
					ref={swiperRef}
					cards={accounts}
					renderCard={(card) => <PeopleCard data={card} />}
					onSwiped={(cardIndex) => {
						console.log("Swiped:", accounts[cardIndex].name);
						setCurrentIndex(cardIndex + 1);
					}}
					onSwipedAll={() => {
						console.log("All cards swiped!");
						setCurrentIndex(0); // Reset atau tampilkan pesan "no more users"
					}}
					cardIndex={currentIndex}
					backgroundColor={"transparent"}
					stackSize={10}
					cardVerticalMargin={10}
					cardHorizontalMargin={0}
					animateOverlayLabelsOpacity
					overlayLabels={{
						left: {
							title: "NOPE",
							style: {
								label: {
									backgroundColor: "#FF4757",
									borderColor: "#FF4757",
									color: "white",
									fontSize: 24,
								},
								wrapper: {
									flexDirection: "column",
									alignItems: "flex-end",
									justifyContent: "flex-start",
									marginTop: 30,
									marginLeft: -30,
								},
							},
						},
						right: {
							title: "LIKE",
							style: {
								label: {
									backgroundColor: "#2ED573",
									borderColor: "#2ED573",
									color: "white",
									fontSize: 24,
								},
								wrapper: {
									flexDirection: "column",
									alignItems: "flex-start",
									justifyContent: "flex-start",
									marginTop: 30,
									marginLeft: 30,
								},
							},
						},
					}}
				></Swiper>
			) : (
				<View className="flex-1 items-center justify-center">
					<Text className="text-gray-500 text-lg">
						Tidak ada pengguna lain di sekitar Anda.
					</Text>
				</View>
			)}
		</View>
	);
};

export default SwipedView;
