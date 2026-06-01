import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    useFonts,
    Roboto_700Bold,
    Roboto_400Regular,
} from "@expo-google-fonts/roboto";

const paces = [
    "< 4:00 /km",
    "5:00 – 6:00 /km",
    "6:00 – 7:00 /km",
    "7:00 – 8:00 /km",
    "8:00 – 9:00 /km",
    "> 9:00 /km",
];

export default function Pace() {
    const router = useRouter();

    const [loaded] = useFonts({
        Roboto_700Bold,
        Roboto_400Regular,
    });

    if (!loaded) return null;

    const savePace = async (pace: string | null) => {
        try {
            const existing = await AsyncStorage.getItem(
                "userProfile"
            );

            const parsed = existing
                ? JSON.parse(existing)
                : {};
            const updated = {
                ...parsed,
                pace: pace,
            };
            await AsyncStorage.setItem(
                "userProfile",
                JSON.stringify(updated)
            );
            router.push("/onboarding/physical");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView className="bg-[#090a0b] px-6 pt-24 pb-24">
            <View className="flex-1 ">

                <View className="gap-3">

                    <Text
                        className="text-[#BAE027] text-base"
                        style={{ fontFamily: "Roboto_400Regular" }}
                    >
                        Step 3 of 5
                    </Text>

                    <Text
                        className="text-white text-4xl leading-tight"
                        style={{ fontFamily: "Roboto_700Bold" }}
                    >
                        What’s your{"\n"}average pace?
                    </Text>

                    <Text
                        className="text-[#7E7E7E] text-base leading-6"
                        style={{ fontFamily: "Roboto_400Regular" }}
                    >
                        Optional — F-RUN can also learn this from your runs.
                    </Text>

                </View>
                <View className="pt-10 gap-4">

                    {paces.map((pace) => (
                        <Pressable
                            key={pace}
                            onPress={() => savePace(pace)}
                            className="bg-[#111214] border border-[#1E1E1E] rounded-2xl p-5"
                        >
                            <Text
                                className="text-white text-lg"
                                style={{ fontFamily: "Roboto_400Regular" }}
                            >
                                {pace}
                            </Text>
                        </Pressable>
                    ))}

                    {/* NOT SURE */}
                    <Pressable
                        onPress={() => savePace(null)}
                        className="bg-[#BAE02714] border border-[#BAE02733] rounded-2xl p-5 mt-4"
                    >
                        <Text
                            className="text-[#BAE027] text-lg text-center"
                            style={{ fontFamily: "Roboto_700Bold" }}
                        >
                            Not Sure
                        </Text>
                    </Pressable>

                </View>

            </View>
        </ScrollView>
    );
}