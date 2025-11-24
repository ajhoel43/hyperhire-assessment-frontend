import SwipedView from "@/page/swiped-view";
import { useLikedAccount } from "@/queries/useAccount";
import type { AccountProps } from "@/types/account";
import { Fontisto, Ionicons } from "@expo/vector-icons"; // Untuk ikon tombol
import { useRef, useState } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import type Swiper from "react-native-deck-swiper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LikedOpponents() {
  const swiperRef = useRef<Swiper<AccountProps> & { resetDeck: () => void }>(null);
  const [page, setPage] = useState(1);

  const { data: likedPeople, isLoading, isFetching, refetch } = useLikedAccount({ page, limit: 5 });

  const handleRewind = () => {
    // alert("Rewind fitur belum diimplementasikan secara langsung. Swipe lagi!");
    setPage(1); // reset pagination
    refetch();
    swiperRef.current?.resetDeck();
  };

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
        swipeAnimation={false}
        ref={swiperRef}
        loading={isLoading || isFetching}
        accounts={(likedPeople?.peoples || []) as AccountProps[]}
        fetchNext={() => setPage(prevState => prevState + 1)}
      />

      {/* Footer Buttons */}
      <View className="flex-row justify-around items-center py-4 z-10">
        <TouchableOpacity
          onPress={handleRewind}
          className="p-3 rounded-full shadow-md bg-gray-50"
        >
          <Ionicons name="reload" size={24} color="#FDCB02" />
        </TouchableOpacity>
        {/* 
        <TouchableOpacity className="bg-gray-100 p-3 rounded-full shadow-md">
          <Ionicons name="flash-sharp" size={24} color="#8A2BE2" />
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}
