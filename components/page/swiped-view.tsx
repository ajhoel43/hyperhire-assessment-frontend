import type { AccountProps } from "@/types/account";
import PeopleCard from "@/ui/people-card";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-deck-swiper";

type SwipeViewProps = {
	accounts: AccountProps[];
	loading?: boolean;
	fetchNext?: () => void;
	onSwipe?: (account: AccountProps) => void;
	onSwipeLeft?: (account: AccountProps) => void;
	onSwipeRight?: (account: AccountProps) => void;
};

const SwipedView = forwardRef(({
	accounts,
	loading = false,
	fetchNext,
	onSwipe,
	onSwipeLeft,
	onSwipeRight
}: SwipeViewProps, ref) => {
	const swiperRef = useRef<Swiper<AccountProps>>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const stackLeft = accounts.length - (currentIndex);

	useImperativeHandle(ref, () => ({
		swipeLeft: () => {
			swiperRef.current?.swipeLeft();
		},
		swipeRight: () => {
			swiperRef.current?.swipeRight();
		},
		resetDeck: () => {
			swiperRef.current?.jumpToCardIndex(0);
			setCurrentIndex(0);
			if (onSwipe) onSwipe(accounts[0]);
		}
	}));

	return (
		<View className="flex flex-1 px-4 mt-2">
			{loading === true ?
				<View className="flex-1 justify-center items-center gap-2">
					<ActivityIndicator size={32} color="#FF4757" />
					<Text className="text-lg">Fetching Accounts...</Text>
				</View>
				:
				(stackLeft > 0 ? (
					<Swiper
						ref={swiperRef}
						cards={accounts}
						renderCard={(card) => <PeopleCard data={card} />}
						onSwiped={(cardIndex) => {
							// console.log(`Swiped ${cardIndex}:`, accounts[cardIndex].name);
							setCurrentIndex(cardIndex + 1);
							if (onSwipe) onSwipe(accounts[cardIndex]);
						}}
						onSwipedLeft={(cardIndex) => {
							// console.log("Swiped Left", accounts[cardIndex].name);
							if (onSwipeLeft) onSwipeLeft(accounts[cardIndex]);
						}}
						onSwipedRight={(cardIndex) => {
							// console.log("Swiped Right", accounts[cardIndex].name);
							if (onSwipeRight) onSwipeRight(accounts[cardIndex]);
						}}
						onSwipedAll={() => {
							if (fetchNext) {
								fetchNext();
								setCurrentIndex(0);
							}
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
							No more user near you.
						</Text>
						{
							fetchNext &&
							<TouchableOpacity className="bg-cyan-300 py-2 px-8 rounded-xl" onPress={() => {
								fetchNext();
								setCurrentIndex(0); // reset current index
							}}>
								<Text>Fetch Next Page</Text>
							</TouchableOpacity>
						}
					</View>
				))}
		</View>
	);
});

export default SwipedView;
