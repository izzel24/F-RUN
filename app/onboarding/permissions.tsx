import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    useFonts,
    Roboto_700Bold,
    Roboto_400Regular,
} from "@expo-google-fonts/roboto";

import { MapPin, Bell } from "lucide-react-native";

export default function Permissions() {
    const router = useRouter();

    const [loaded] = useFonts({
        Roboto_700Bold,
        Roboto_400Regular,
    });

    if (!loaded) return null;

    const requestPermissions = async () => {
        try {

            // GPS Permission
            const locationPermission =
                await Location.requestForegroundPermissionsAsync();

            const locationGranted =
                locationPermission.status === "granted";

            // save permission status
            const existing = await AsyncStorage.getItem(
                "userProfile"
            );

            const parsed = existing
                ? JSON.parse(existing)
                : {};

            const updated = {
                ...parsed,
                permissions: {
                    location: locationGranted,
                },
            };

            await AsyncStorage.setItem(
                "userProfile",
                JSON.stringify(updated)
            );

            // next screen
            router.push("/onboarding/summary");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View className="flex-1 bg-[#090a0b] px-6 pt-24 justify-between">

            {/* CONTENT */}
            <View className="gap-10">

                {/* HEADER */}
                <View className="gap-3">

                    <Text
                        className="text-[#BAE027] text-base"
                        style={{ fontFamily: "Roboto_400Regular" }}
                    >
                        Step 6 of 6
                    </Text>

                    <Text
                        className="text-white text-4xl leading-tight"
                        style={{ fontFamily: "Roboto_700Bold" }}
                    >
                        Enable permissions
                    </Text>

                    <Text
                        className="text-[#7E7E7E] text-base leading-6"
                        style={{ fontFamily: "Roboto_400Regular" }}
                    >
                        F-RUN uses your location to track runs, pace, and distance accurately.
                    </Text>

                </View>

                {/* PERMISSION CARDS */}
                <View className="gap-4">

                    {/* LOCATION */}
                    <View className="bg-[#111214] border border-[#1E1E1E] rounded-3xl p-5 flex-row gap-4">

                        <View className="w-14 h-14 rounded-2xl bg-[#BAE0271A] items-center justify-center">
                            <MapPin color={"#BAE027"} size={26} />
                        </View>

                        <View className="flex-1 gap-1">

                            <Text
                                className="text-white text-xl"
                                style={{ fontFamily: "Roboto_700Bold" }}
                            >
                                Location Access
                            </Text>

                            <Text
                                className="text-[#7E7E7E] text-base leading-6"
                                style={{ fontFamily: "Roboto_400Regular" }}
                            >
                                Track your route, running pace, and total distance during workouts.
                            </Text>

                        </View>

                    </View>

                    {/* NOTIFICATION */}
                    <View className="bg-[#111214] border border-[#1E1E1E] rounded-3xl p-5 flex-row gap-4">

                        <View className="w-14 h-14 rounded-2xl bg-[#BAE0271A] items-center justify-center">
                            <Bell color={"#BAE027"} size={26} />
                        </View>

                        <View className="flex-1 gap-1">

                            <Text
                                className="text-white text-xl"
                                style={{ fontFamily: "Roboto_700Bold" }}
                            >
                                Notifications
                            </Text>

                            <Text
                                className="text-[#7E7E7E] text-base leading-6"
                                style={{ fontFamily: "Roboto_400Regular" }}
                            >
                                Get reminders, recovery alerts, and daily motivation.
                            </Text>

                        </View>

                    </View>

                </View>

            </View>

            {/* BUTTON */}
            <View className="pb-10 gap-4">

                <Pressable
                    onPress={requestPermissions}
                    className="bg-[#BAE027] rounded-2xl py-5 items-center"
                >
                    <Text
                        className="text-black text-lg"
                        style={{ fontFamily: "Roboto_700Bold" }}
                    >
                        Continue
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => router.push("/onboarding/summary")}
                    className="items-center py-3"
                >
                    <Text
                        className="text-[#7E7E7E] text-base"
                        style={{ fontFamily: "Roboto_400Regular" }}
                    >
                        Skip for now
                    </Text>
                </Pressable>

            </View>

        </View>
    );
}