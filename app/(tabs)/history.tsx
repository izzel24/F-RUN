import RunMap from "components/RunMap";
import useRunStorage from "hooks/useRunStorage";
import { Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { Roboto_700Bold, Roboto_400Regular, useFonts } from '@expo-google-fonts/roboto'
import { ChevronRight, Trash, Trash2 } from "lucide-react-native";
import formatDuration from "utils/formatDuration";
import { useState } from "react";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function History() {

    const [refreshing, setRefreshing] = useState(false)

    const [loaded] = useFonts({
        Roboto_700Bold,
        Roboto_400Regular,
    })

    const { runHistory, getRunData, deleteRun } = useRunStorage()

    const onRefresh = async () => {

        setRefreshing(true)
        await getRunData()
        setRefreshing(false)
    }



    return (
        <SafeAreaView
            className=" bg-[#090a0b]"
            edges={["top"]}
        >
        <ScrollView className="px-5"
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor="#fffff0" // iOS
                    colors={["#fffff0"]} 
                />
            }
        >
            <View className="gap-5 h-screen items-center">
                {runHistory.map((item) => (
                    <Swipeable key={item.id}
                        overshootRight={false}
                        renderRightActions={() => (
                            <View className="p-5 justify-center">
                                <Pressable
                                    onPress={() => deleteRun(item.id)}
                                    className="p-5 rounded-full self-center "
                                    style={{ backgroundColor: "#c63f37" }}
                                >
                                    <Trash2 size={20} color={"#ffffff"} strokeWidth={2} className="text-[#c63f37]" />
                                </Pressable>
                            </View>
                        )}
                    >
                        <Pressable className=" w-full rounded-xl overflow-hidden" onPress={() => router.push(`/history/${item.id}`)}>
                            <RunMap
                                isPreview={true}
                                latitude={item.route[Math.floor(item.route.length / 2)].latitude}
                                longitude={item.route[Math.floor(item.route.length / 2)].longitude}
                                latitudeDelta={0.01}
                                longitudeDelta={0.01}
                                locations={item.route}
                                style={{ width: "100%", height: 130 }}
                                isMarkerHidden={true}
                            />
                            <View className="h-[120px]  bg-[#1b1c1f] pt-5 ">
                                <View className="flex-row gap-4 justify-between items-center px-5">
                                    <View className="gap-2 items-center">
                                        <Text className="text-white text-sm" style={{ fontFamily: "Roboto_400Regular" }}>Distance (KM)</Text>
                                        <Text className="text-white text-5xl leading-none" style={{ fontFamily: "Roboto_700Bold" }}>{item.distance.toFixed(2)}</Text>
                                    </View>
                                    <View className="gap-2 items-center">
                                        <Text className="text-white text-sm" style={{ fontFamily: "Roboto_400Regular" }}>Pace</Text>
                                        <Text className="text-white text-5xl leading-none" style={{ fontFamily: "Roboto_700Bold" }}>{item.pace.toFixed(2)}</Text>
                                    </View>
                                    <View className="gap-2 items-center">
                                        <Text className="text-white text-sm" style={{ fontFamily: "Roboto_400Regular" }}>Duration</Text>
                                        <Text className="text-white text-5xl leading-none" style={{ fontFamily: "Roboto_700Bold" }}>{formatDuration(item.duration)}</Text>
                                    </View>
                                </View>
                                <Pressable className="justify-center items-end mt-auto h-9 px-5 bg-gray-800">
                                    <ChevronRight color={"white"} size={20} />
                                </Pressable>
                            </View>
                        </Pressable>
                    </Swipeable>
                ))}
            </View>
        </ScrollView>
        </SafeAreaView>

    )
}
