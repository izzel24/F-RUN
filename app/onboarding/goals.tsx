import {
    View,
    Text,
    Pressable,
    ScrollView,
    TextInput,
} from "react-native";

import { useRouter } from "expo-router";

import {
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_400Regular,
    useFonts,
} from "@expo-google-fonts/roboto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const goals = [
    "Lose Weight",
    "Build Consistency",
    "Improve Pace",
    "5K Preparation",
    "Half Marathon",
    "Stay Active",
];

export default function Goals() {

    const router = useRouter();

    const [name, setName] = useState("");

    const [selectedGoal, setSelectedGoal] =
        useState("");

    const [loaded] = useFonts({
        Roboto_700Bold,
        Roboto_500Medium,
        Roboto_400Regular,
    });

    if (!loaded) return null;

    const saveGoal = async () => {

        try {

            const existing =
                await AsyncStorage.getItem(
                    "userProfile"
                );

            const parsed = existing
                ? JSON.parse(existing)
                : {};

            const updated = {
                ...parsed,
                name: name,
                goal: selectedGoal,
            };

            await AsyncStorage.setItem(
                "userProfile",
                JSON.stringify(updated)
            );

            router.push("/onboarding/frequency");

        } catch (error) {
            console.log(error);
        }
    };

    const isValid =
        name.trim() && selectedGoal;

    return (
        <ScrollView
            className="flex-1 bg-[#090a0b]"
            contentContainerStyle={{
                paddingHorizontal: 24,
                paddingTop: 96,
                paddingBottom: 40,
            }}
            showsVerticalScrollIndicator={false}
        >

            {/* HEADER */}
            <View className="gap-4">

                <Text
                    className="text-[#BAE027] text-base"
                    style={{
                        fontFamily:
                            "Roboto_500Medium",
                    }}
                >
                    Step 1 of 5
                </Text>

                <View className="gap-2">

                    <Text
                        className="text-white text-5xl leading-[58px]"
                        style={{
                            fontFamily:
                                "Roboto_700Bold",
                        }}
                    >
                        Tell us{"\n"}about yourself
                    </Text>

                    <Text
                        className="text-[#7C7D81] text-base leading-7"
                        style={{
                            fontFamily:
                                "Roboto_400Regular",
                        }}
                    >
                        Enter your name and choose
                        your running goal to start
                        building your personalized
                        running experience.
                    </Text>

                </View>

            </View>

            {/* NAME INPUT */}
            <View className="pt-12 gap-3">

                <Text
                    className="text-white text-base"
                    style={{
                        fontFamily:
                            "Roboto_500Medium",
                    }}
                >
                    Your Name
                </Text>

                <View className="bg-[#111214] border border-[#1B1C1F] rounded-3xl px-5 py-1">

                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your name"
                        placeholderTextColor="#5F6165"
                        className="text-white text-lg py-5"
                        style={{
                            fontFamily:
                                "Roboto_400Regular",
                        }}
                    />

                </View>

            </View>

            {/* GOALS */}
            <View className="pt-12 gap-4">

                <Text
                    className="text-white text-base"
                    style={{
                        fontFamily:
                            "Roboto_500Medium",
                    }}
                >
                    Running Goal
                </Text>

                <View className="gap-4">

                    {goals.map((goal) => {

                        const isSelected =
                            selectedGoal === goal;

                        return (
                            <Pressable
                                key={goal}
                                onPress={() =>
                                    setSelectedGoal(goal)
                                }
                                className={`
                                    rounded-3xl p-5 border
                                    ${isSelected
                                        ? "bg-[#BAE02714] border-[#BAE027]"
                                        : "bg-[#111214] border-[#1B1C1F]"
                                    }
                                `}
                            >

                                <View className="flex-row items-center justify-between">

                                    <Text
                                        className={`
                                            text-lg
                                            ${isSelected
                                                ? "text-[#BAE027]"
                                                : "text-white"
                                            }
                                        `}
                                        style={{
                                            fontFamily:
                                                isSelected
                                                    ? "Roboto_700Bold"
                                                    : "Roboto_400Regular",
                                        }}
                                    >
                                        {goal}
                                    </Text>

                                    <View
                                        className={`
                                            w-6 h-6 rounded-full border items-center justify-center
                                            ${isSelected
                                                ? "border-[#BAE027]"
                                                : "border-[#34363A]"
                                            }
                                        `}
                                    >
                                        {isSelected && (
                                            <View className="w-3 h-3 rounded-full bg-[#BAE027]" />
                                        )}
                                    </View>

                                </View>

                            </Pressable>
                        );
                    })}

                </View>

            </View>

            {/* BUTTON */}
            <Pressable
                disabled={!isValid}
                onPress={saveGoal}
                className={`
                    mt-12 rounded-3xl py-5 items-center
                    ${isValid
                        ? "bg-[#BAE027]"
                        : "bg-[#1A1B1E]"
                    }
                `}
            >

                <Text
                    className={`
                        text-lg
                        ${isValid
                            ? "text-black"
                            : "text-[#5F6165]"
                        }
                    `}
                    style={{
                        fontFamily:
                            "Roboto_700Bold",
                    }}
                >
                    Continue
                </Text>

            </Pressable>

        </ScrollView>
    );
}