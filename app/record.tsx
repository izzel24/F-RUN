import { useRouter } from "expo-router";
import useLocation from "hooks/useLocation";
import useUserProfile from "hooks/useUserProfile";
import { ChevronLeft, Play } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps"
import {Roboto_800ExtraBold, Roboto_700Bold, Roboto_400Regular, Roboto_500Medium, useFonts} from "@expo-google-fonts/roboto"


export default function Record() {

    const router = useRouter()

    const [loaded]= useFonts({
        Roboto_800ExtraBold,
        Roboto_700Bold,
        Roboto_500Medium,
        Roboto_400Regular
    })

    const { userData } = useUserProfile()
    const { lat, lon } = useLocation(userData?.permissions?.location)

    return (
        <View className="bg-[#090a0b] flex-1 relative">
            <Pressable onPress={() => router.back()} className="absolute top-14 rounded-full left-2 z-50 p-3 bg-[#BAE027]">
                <ChevronLeft color={'black'} size={20} />
            </Pressable>
            <MapView
                region={{
                    latitude: lat,
                    longitude: lon,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
                userInterfaceStyle="dark"

                style={{
                    width: "100%",
                    height: "50%",
                }} >
                <Marker
                    coordinate={{
                        latitude: lat,
                        longitude: lon
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
            </MapView>
            <View className="bg-[#1b1c1f] h-full -m-2 rounded-[30px] p-6 gap-4">
                <View className="flex-row justify-between border-b-2 border-gray-400 p-4">
                    <View className="gap-3 justify-center items-center">
                        <Text className="text-white text-sm" style= {{fontFamily: "Roboto_400Regular"}}>
                            DISTANCE (KM)
                        </Text>
                        <Text className="text-white text-[70px] leading-none" style= {{fontFamily: "Roboto_700Bold"}}>
                            0.00
                        </Text>
                    </View>
                    <View className="gap-3 justify-center items-center">
                        <Text className="text-white text-sm" style= {{fontFamily: "Roboto_400Regular"}}>
                            AVG PACE
                        </Text>
                        <Text className="text-white text-[70px] leading-none" style= {{fontFamily: "Roboto_700Bold"}}>
                            0.00
                        </Text>
                    </View>
                </View>
                <View>
                    <View className="gap-3 justify-center items-center pt-4">
                        <Text className="text-white text-sm" style={{ fontFamily: "Roboto_400Regular" }}>
                            Time
                        </Text>
                        <Text className="text-white text-[70px] leading-none" style={{ fontFamily: "Roboto_700Bold" }}>
                            00:00
                        </Text>
                    </View>
                </View>
                <View className="items-center pt-4">
                    <Pressable className="bg-[#BAE027] p-7 rounded-full">
                        <Play size={30} color={'#090a0b'} fill={"#090a0b"} className='' />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
