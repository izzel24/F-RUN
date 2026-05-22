import { useRouter } from "expo-router";
import useLocation from "hooks/useLocation";
import useUserProfile from "hooks/useUserProfile";
import { Check, ChevronLeft, Pause, Play } from "lucide-react-native";
import { Modal, Pressable, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps"
import { Roboto_800ExtraBold, Roboto_700Bold, Roboto_400Regular, Roboto_500Medium, Roboto_300Light, useFonts } from "@expo-google-fonts/roboto"
import { useEffect, useRef, useState } from "react";
import useRunTracking from "hooks/useRunTracking"

import AsyncStorage from "@react-native-async-storage/async-storage";
import formatDuration from "utils/formatDuration";
import useRunStorage from "hooks/useRunStorage";


export default function Record() {

    const [loaded] = useFonts({
        Roboto_800ExtraBold,
        Roboto_700Bold,
        Roboto_500Medium,
        Roboto_400Regular,
        Roboto_300Light
    })

    const router = useRouter()
    const [isRunning, setIsRunning] = useState(false)
    const [seconds, setSeconds] = useState(0)
    const [isFinish, setIsFinish] = useState(false)
    const [isDiscardModal, setIsDiscardModal] = useState(false);

    const { userData } = useUserProfile()
    const { lat, lon } = useLocation(userData?.permissions?.location)
    const { locations, totalDistance, pace, resetRun } = useRunTracking(isRunning, seconds)
    const { saveRun } = useRunStorage()

    const totalDistanceInKm = totalDistance / 1000
    const latestRunLocation = locations[locations.length - 1]
    const currentLatitude = isRunning ? latestRunLocation?.latitude || lat : lat
    const currentLongitude = isRunning ? latestRunLocation?.longitude || lon : lon
    const mapRef = useRef<MapView | null>(null)

    useEffect(() => {

        if (
            !currentLatitude ||
            !currentLongitude
        ) return;

        mapRef.current?.animateToRegion({

            latitude: currentLatitude,
            longitude: currentLongitude,

            latitudeDelta: 0.001,
            longitudeDelta: 0.001,

        })

    }, [currentLatitude, currentLongitude])


    useEffect(() => {

        let interval;

        if (isRunning) {

            interval = setInterval(() => {

                setSeconds(prev => prev + 1)

            }, 1000)

        }

        return () => clearInterval(interval)

    }, [isRunning])

    const minutes = formatDuration(Math.floor(seconds / 60))
    const remainSeconds = formatDuration(seconds % 60)


    const resetAll = () => {
        setIsRunning(false);
        setSeconds(0);
        setIsFinish(false);
        resetRun()
       
    };

    const handleSaveRun = async() => {

        await saveRun({
            distance: totalDistanceInKm,
            pace: 0,
            route: locations,
            duration: seconds
        })

        resetAll()

        router.push('/')
    }

    const back = () => {
        if (seconds > 0) {
            setIsDiscardModal(true);
            return;
        }

        resetRun()
        router.back();
    };


    return (
        <View className="bg-[#090a0b] h-screen pb-20 relative">
            <Pressable onPress={back} className="absolute top-14 rounded-full left-2 z-50 p-3 bg-[#BAE027] items-center justify-center">
                <ChevronLeft color={'black'} size={20} strokeWidth={4} />
            </Pressable>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isFinish}
            >
                <Pressable
                    onPress={() => setIsFinish(false)}
                    className="flex-1 bg-black/50 justify-center items-center w-full h-full" style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
                >
                    <View className="rounded-2xl " style={{ backgroundColor: "#090a0b", padding: 32, gap: 40 }}>
                        <View>
                            <Text className="text-white text-4xl text-center" style={{ fontFamily: "Roboto_500Medium" }}>
                                Run Completed!!
                            </Text>

                            <Text className="text-white text-center mt-2" style={{ fontFamily: "Roboto_300Light" }}>
                                Great job! Here’s your result
                            </Text>
                        </View>

                        <View className="items-center">
                            <Text className="text-[#BAE027] text-6xl font-bold" style={{ fontFamily: "Roboto_700Bold" }}>
                                {totalDistanceInKm.toFixed(2)} km
                            </Text>
                            <Text className="text-white" style={{ fontFamily: "Roboto_400Regular" }}>
                                {minutes.toString().padStart(2, "0")}:{remainSeconds.toString().padStart(2, "0")} • {pace.toFixed(2)} /km
                            </Text>
                        </View>
                        <View className="flex-row justify-center gap-4">
                            <Pressable onPress={() => setIsFinish(false)} className="p-3  bg-[#1b1c1f] rounded-full " style={{ paddingInline: 20 }}>
                                <Text className="text-[#BAE027] text-center" style={{ fontFamily: "Roboto_400Regular" }}>
                                    Discard
                                </Text>
                            </Pressable>
                            <Pressable className="bg-[#BAE027] p-3 px-7 rounded-full" style={{ paddingInline: 20 }} onPress={() => handleSaveRun()}>
                                <Text className="text-black font-bold text-center" style={{ fontFamily: "Roboto_400Regular" }}>
                                    Save Run
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </Modal>
            <Modal
                transparent
                animationType="fade"
                visible={isDiscardModal}
            >
                <Pressable
                    onPress={() => setIsDiscardModal(false)}
                    className="flex-1 justify-center items-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
                >
                    <View
                        className="rounded-2xl"
                        style={{
                            backgroundColor: "#090a0b",
                            padding: 32,
                            gap: 30,
                            width: "80%",
                        }}
                    >
                        <View>
                            <Text
                                className="text-white text-3xl text-center"
                                style={{ fontFamily: "Roboto_500Medium" }}
                            >
                                Discard Run?
                            </Text>

                            <Text
                                className="text-white text-center mt-2"
                                style={{ fontFamily: "Roboto_300Light" }}
                            >
                                Your current run progress will be lost.
                            </Text>
                        </View>

                        <View className="flex-row justify-center gap-4">
                            <Pressable
                                onPress={() => setIsDiscardModal(false)}
                                className="bg-[#1b1c1f] p-3 rounded-full px-6"
                            >
                                <Text className="text-[#BAE027]">
                                    Cancel
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() => {
                                    setIsRunning(false);
                                    setSeconds(0);
                                    setIsFinish(false);
                                    setIsDiscardModal(false);

                                    router.back();
                                }}
                                className="bg-[#BAE027] p-3 rounded-full px-6"
                            >
                                <Text className="text-[#090a0b]">
                                    Discard
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </Modal>
            <MapView
                ref={mapRef}
                initialRegion={{
                    latitude: currentLatitude || -6.2,
                    longitude: currentLongitude || 106.816,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
                userInterfaceStyle="dark"

                style={{
                    width: "100%",
                    height: "40%",
                }} >
                <Marker
                    coordinate={{
                        latitude: currentLatitude,
                        longitude: currentLongitude
                    }}
                >
                    <View style={{
                        backgroundColor: '#BAE027',
                        padding: 10,
                        borderRadius: 20,
                        borderWidth: 3,
                        borderColor: '#6F8518'
                    }}>
                    </View>
                </Marker>
                <Polyline
                    coordinates={locations}
                    strokeWidth={8}
                    strokeColor="#BAE027"
                />
            </MapView>
            <View className="bg-[#090a0b] h-[60%] -m-2 rounded-t-[30px] ">
                <View className="justify-between h-[75%] px-6 gap-4">
                    <View className="h-full">
                        <View className="flex-row h-[50%] justify-between border-b border-[#f9f9f91b] px-4">
                            <View className="gap-3 justify-center items-center">
                                <Text className="text-white text-sm" style={{ fontFamily: "Roboto_400Regular" }}>
                                    DISTANCE
                                </Text>
                                <View className="">
                                    <Text className="text-white text-[64px] leading-none" style={{ fontFamily: "Roboto_700Bold" }}>
                                        {totalDistanceInKm.toFixed(2)}
                                    </Text>
                                    <Text className="text-[#BAE027] text-[25px] leading-none" style={{ fontFamily: "Roboto_700Bold" }}>
                                        km
                                    </Text>
                                </View>
                            </View>
                            <View className="gap-3 justify-center items-center">
                                <Text className="text-white text-sm" style={{ fontFamily: "Roboto_400Regular" }}>
                                    AVG PACE
                                </Text>
                                <View>
                                    <Text className="text-white text-[64px] leading-none" style={{ fontFamily: "Roboto_700Bold" }}>
                                        {pace.toFixed(2)}
                                    </Text>
                                    <Text className="text-[#BAE027] text-[25px] leading-none" style={{ fontFamily: "Roboto_700Bold" }}>
                                        /km
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View className="h-[50%] items-center justify-center">
                            <View className="gap-3 justify-center items-center ">
                                <Text className="text-white text-sm" style={{ fontFamily: "Roboto_400Regular" }}>
                                    Time
                                </Text>
                                <Text className="text-white text-[90px] leading-none" style={{ fontFamily: "Roboto_700Bold" }}>
                                    {minutes}:{remainSeconds}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View className="flex-row justify-center items-center relative h-[25%]">
                        <Pressable onPress={() => setIsRunning(prev => !prev)} className={`${isRunning ? "bg-[#1b1c1f]" : "bg-[#BAE027]"} shadow-[0_0_3px_0_rgba(0,0,0,0.25)] p-7 rounded-full`}>
                            {
                                isRunning ? <Pause size={30} color={'#BAE027'} fill={"#BAE027"} className='' /> : <Play size={30} color={'#090a0b'} fill={"#090a0b"} className='' />
                            }
                        </Pressable>

                        {
                            seconds > 1 && !isRunning ? (
                                <View className="absolute right-2 ">
                                    <Pressable className="bg-[#1b1c1f] p-5 rounded-full" onPress={() => setIsFinish(true)}>
                                        <Check color={"#BAE027"} size={20} strokeWidth={5} />
                                    </Pressable>
                                </View>
                            ) : ""
                        }
                    </View>
                </View>
            </View>
        </View>
    )
}
