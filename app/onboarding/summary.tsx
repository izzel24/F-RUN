import { View, Text, Pressable, ActivityIndicator, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import calculateRunnerLevel from "utils/calculateRunnerLevel";
import useRunnerProfileStorage from "hooks/useRunnerProfileStorage";

import {useFonts, Roboto_700Bold, Roboto_500Medium, Roboto_400Regular,} from "@expo-google-fonts/roboto";

type UserProfile = {
    goal?: string;
    level?: string;
    frequency?: string;
    pace?: string | null;
    age?: string | null;
    weight?: string | null;
    height?: string | null;
};


export default function Summary() {
    const router = useRouter();

    const { saveRunnerProfile } = useRunnerProfileStorage()
    
    const [profile, setProfile] = useState<UserProfile | null>(null);
    
    const [loaded] = useFonts({
        Roboto_700Bold,
        Roboto_500Medium,
        Roboto_400Regular,
    });
    
    const runnerProfile =
        calculateRunnerLevel({
            age: Number(profile?.age),
            weight: Number(profile?.weight),
            height: Number(profile?.height),
            frequency: profile?.frequency,
            pace: profile?.pace,
        });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {

            const data = await AsyncStorage.getItem(
                "userProfile"
            );

            if (data) {
                setProfile(JSON.parse(data));
            }

        } catch (error) {
            console.log(error);
        }
    };

    if (!loaded || !profile) {
        return (
            <View className="flex-1 bg-[#090a0b] items-center justify-center">
                <ActivityIndicator size={"large"} color={"#BAE027"} />
            </View>
        );
    }

    return (
        <ScrollView className="bg-[#090a0b] px-6 pt-24 pb-24 ">
            <View className="flex-1 justify-between">
                <View className="gap-8">
                    <View className="gap-3">
                        <Text
                            className="text-[#BAE027] text-base"
                            style={{ fontFamily: "Roboto_400Regular" }}
                        >
                            Your plan is ready
                        </Text>

                        <Text
                            className="text-white text-4xl leading-tight"
                            style={{ fontFamily: "Roboto_700Bold" }}
                        >
                            Welcome to{"\n"}F-RUN
                        </Text>

                        <Text
                            className="text-[#7E7E7E] text-base leading-6"
                            style={{ fontFamily: "Roboto_400Regular" }}
                        >
                            Your adaptive running experience has been personalized based on your profile.
                        </Text>

                    </View>
                    <View className="bg-[#111214] border border-[#1E1E1E] rounded-3xl p-6 gap-6">
                        <View className="gap-1">
                            <Text
                                className="text-[#7E7E7E] text-sm"
                                style={{ fontFamily: "Roboto_400Regular" }}
                            >
                                Goal
                            </Text>

                            <Text
                                className="text-white text-2xl"
                                style={{ fontFamily: "Roboto_700Bold" }}
                            >
                                {profile.goal}
                            </Text>
                        </View>
                        <View className="gap-1">
                            <Text
                                className="text-[#7E7E7E] text-sm"
                                style={{ fontFamily: "Roboto_400Regular" }}
                            >
                            </Text>

                            <Text
                                className="text-white text-2xl"
                                style={{ fontFamily: "Roboto_700Bold" }}
                            >
                                {profile.frequency}
                            </Text>
                        </View>

                        <View className="gap-1">
                            <Text
                                className="text-[#7E7E7E] text-sm"
                                style={{ fontFamily: "Roboto_400Regular" }}
                            >
                                Average Pace
                            </Text>

                            <Text
                                className="text-white text-2xl"
                                style={{ fontFamily: "Roboto_700Bold" }}
                            >
                                {profile.pace || "Will learn from your runs"}
                            </Text>
                        </View>

                    </View>

                    <View className="bg-[#BAE02714] border border-[#BAE02733] rounded-3xl p-5">

                        <Text className="text-white">
                            Level: {runnerProfile.level}
                        </Text>

                        <Text className="text-white">
                            Score: {runnerProfile.score}
                        </Text>

                        <Text className="text-white">
                            Plan: {runnerProfile.recommendedPlan}
                        </Text>

                    </View>

                </View>
                <View className="pt-10">

                    <Pressable
                        onPress={() => router.replace("/(tabs)")}
                        className="bg-[#BAE027] rounded-2xl py-5 items-center"
                    >
                        <Text
                            className="text-black text-lg"
                            style={{ fontFamily: "Roboto_700Bold" }}
                        >
                            Start Running
                        </Text>
                    </Pressable>

                </View>

            </View>
        </ScrollView>
    );
}