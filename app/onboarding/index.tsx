import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import {
    useFonts,
    Roboto_700Bold,
    Roboto_400Regular,
} from "@expo-google-fonts/roboto";

export default function Onboarding() {
    const router = useRouter();

    const [loaded] = useFonts({
        Roboto_700Bold,
        Roboto_400Regular,
    });

    if (!loaded) return null;

    return (
        <View className="h-full bg-[#090a0b] justify-around p-5 gap-5">
            {/* TOP */}
            <View className="gap-6">
                <View className="w-20 h-20 rounded-full bg-[#BAE027] items-center justify-center">
                    <Text
                        className="text-black text-3xl"
                        style={{ fontFamily: "Roboto_700Bold" }}
                    >
                        F
                    </Text>
                </View>

                <View className="gap-3">
                    <Text
                        className="text-white text-5xl leading-tight"
                        style={{ fontFamily: "Roboto_700Bold" }}
                    >
                        Run smarter,{"\n"}not harder.
                    </Text>

                    <Text
                        className="text-[#8D8D8D] text-lg leading-7"
                        style={{ fontFamily: "Roboto_400Regular" }}
                    >
                        Adaptive running plans based on your goals, progress, and daily condition.
                    </Text>
                </View>
            </View>

            {/* BOTTOM */}
            <View className="gap-6">
                {/* FEATURES */}
                <View className="gap-4">
                    <View className="flex-row items-center gap-3">
                        <View className="w-3 h-3 rounded-full bg-[#BAE027]" />
                        <Text
                            className="text-white text-base"
                            style={{ fontFamily: "Roboto_400Regular" }}
                        >
                            Personalized running plans
                        </Text>
                    </View>

                    <View className="flex-row items-center gap-3">
                        <View className="w-3 h-3 rounded-full bg-[#BAE027]" />
                        <Text
                            className="text-white text-base"
                            style={{ fontFamily: "Roboto_400Regular" }}
                        >
                            Smart pace & recovery recommendations
                        </Text>
                    </View>

                    <View className="flex-row items-center gap-3">
                        <View className="w-3 h-3 rounded-full bg-[#BAE027]" />
                        <Text
                            className="text-white text-base"
                            style={{ fontFamily: "Roboto_400Regular" }}
                        >
                            Weather-aware training suggestions
                        </Text>
                    </View>
                </View>

                {/* BUTTON */}
                <Pressable
                    onPress={() => router.push("/onboarding/goals")}
                    className="py-5 px-5 flex-row bg-[#bae027] items-center justify-between rounded-2xl"
                >
                    <Text
                        className="text-black text-lg"
                        style={{ fontFamily: "Roboto_700Bold" }}
                    >
                        Get Started
                    </Text>

                    <ChevronRight color={"black"} size={24} />
                </Pressable>
            </View>
        </View>
    );
}