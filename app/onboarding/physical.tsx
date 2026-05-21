import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

import {
    useFonts,
    Roboto_700Bold,
    Roboto_400Regular,
} from "@expo-google-fonts/roboto";

export default function Physical() {
    const router = useRouter();

    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");

    const [loaded] = useFonts({
        Roboto_700Bold,
        Roboto_400Regular,
    });

    if (!loaded) return null;

    const savePhysicalData = async () => {
        try {

            // ambil profile lama
            const existing = await AsyncStorage.getItem(
                "userProfile"
            );

            const parsed = existing
                ? JSON.parse(existing)
                : {};

            // update profile
            const updated = {
                ...parsed,
                age: age || null,
                weight: weight || null,
                height: height || null,
            };

            // save lagi
            await AsyncStorage.setItem(
                "userProfile",
                JSON.stringify(updated)
            );

            // next screen
            router.push("/onboarding/permissions");

        } catch (error) {
            console.log(error);
        }
    };

    const skip = async () => {
        try {
            router.push("/onboarding/permissions");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView className="bg-[#090a0b] px-6 pt-24">

            <View className="flex-1">

                {/* HEADER */}
                <View className="gap-3">

                    <Text
                        className="text-[#BAE027] text-base"
                        style={{ fontFamily: "Roboto_400Regular" }}
                    >
                        Step 5 of 6
                    </Text>

                    <Text
                        className="text-white text-4xl leading-tight"
                        style={{ fontFamily: "Roboto_700Bold" }}
                    >
                        Tell us about{"\n"}yourself
                    </Text>

                    <Text
                        className="text-[#7E7E7E] text-base leading-6"
                        style={{ fontFamily: "Roboto_400Regular" }}
                    >
                        This helps F-RUN personalize your training and calorie estimation.
                    </Text>

                </View>

                {/* INPUTS */}
                <View className="pt-10 gap-5">

                    {/* AGE */}
                    <View className="gap-2">
                        <Text
                            className="text-white text-base"
                            style={{ fontFamily: "Roboto_400Regular" }}
                        >
                            Age
                        </Text>

                        <TextInput
                            value={age}
                            onChangeText={setAge}
                            keyboardType="numeric"
                            placeholder="e.g. 20"
                            placeholderTextColor="#666"
                            className="bg-[#111214] border border-[#1E1E1E] rounded-2xl px-5 py-5 text-white text-lg"
                        />
                    </View>

                    {/* WEIGHT */}
                    <View className="gap-2">
                        <Text
                            className="text-white text-base"
                            style={{ fontFamily: "Roboto_400Regular" }}
                        >
                            Weight (kg)
                        </Text>

                        <TextInput
                            value={weight}
                            onChangeText={setWeight}
                            keyboardType="numeric"
                            placeholder="e.g. 65"
                            placeholderTextColor="#666"
                            className="bg-[#111214] border border-[#1E1E1E] rounded-2xl px-5 py-5 text-white text-lg"
                        />
                    </View>

                    {/* HEIGHT */}
                    <View className="gap-2">
                        <Text
                            className="text-white text-base"
                            style={{ fontFamily: "Roboto_400Regular" }}
                        >
                            Height (cm)
                        </Text>

                        <TextInput
                            value={height}
                            onChangeText={setHeight}
                            keyboardType="numeric"
                            placeholder="e.g. 170"
                            placeholderTextColor="#666"
                            className="bg-[#111214] border border-[#1E1E1E] rounded-2xl px-5 py-5 text-white text-lg"
                        />
                    </View>

                </View>

                {/* BUTTONS */}
                <View className="pt-10 gap-4">

                    <Pressable
                        onPress={savePhysicalData}
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
                        onPress={skip}
                        className="py-4 items-center"
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
        </ScrollView>
    );
}