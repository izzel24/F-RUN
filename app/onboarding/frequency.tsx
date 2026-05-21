import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    useFonts,
    Roboto_700Bold,
    Roboto_400Regular,
} from "@expo-google-fonts/roboto";

const frequencies = [
    {
        title: "1 – 2 x / week",
        description: "Light and flexible training",
    },
    {
        title: "3 – 4 x / week",
        description: "Balanced weekly routine",
    },
    {
        title: "> 5 x / week",
        description: "High consistency training",
    },
];

export default function Frequency() {
    const router = useRouter();

    const [loaded] = useFonts({
        Roboto_700Bold,
        Roboto_400Regular,
    });

    if (!loaded) return null;

    const saveFrequency = async (frequency: string) => {
        try {

            // ambil data lama
            const existing = await AsyncStorage.getItem(
                "userProfile"
            );

            const parsed = existing
                ? JSON.parse(existing)
                : {};

            // update profile
            const updated = {
                ...parsed,
                frequency: frequency,
            };

            // save lagi
            await AsyncStorage.setItem(
                "userProfile",
                JSON.stringify(updated)
            );

            // next screen
            router.push("/onboarding/pace");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View className="flex-1 bg-[#090a0b] px-6 pt-24">

            {/* HEADER */}
            <View className="gap-3">

                <Text
                    className="text-[#BAE027] text-base"
                    style={{ fontFamily: "Roboto_400Regular" }}
                >
                    Step 3 of 6
                </Text>

                <Text
                    className="text-white text-4xl leading-tight"
                    style={{ fontFamily: "Roboto_700Bold" }}
                >
                    How often{"\n"}do you run?
                </Text>

                <Text
                    className="text-[#7E7E7E] text-base"
                    style={{ fontFamily: "Roboto_400Regular" }}
                >
                    This helps F-RUN calculate your weekly load and recovery.
                </Text>

            </View>

            {/* OPTIONS */}
            <View className="pt-10 gap-4">

                {frequencies.map((item) => (
                    <Pressable
                        key={item.title}
                        onPress={() => saveFrequency(item.title)}
                        className="bg-[#111214] border border-[#1E1E1E] rounded-2xl p-5"
                    >
                        <View className="gap-1">

                            <Text
                                className="text-white text-xl"
                                style={{ fontFamily: "Roboto_700Bold" }}
                            >
                                {item.title}
                            </Text>

                            <Text
                                className="text-[#7E7E7E] text-base"
                                style={{ fontFamily: "Roboto_400Regular" }}
                            >
                                {item.description}
                            </Text>

                        </View>
                    </Pressable>
                ))}

            </View>

        </View>
    );
}