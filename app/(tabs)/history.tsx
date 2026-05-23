import RunMap from "components/RunMap";
import useRunStorage from "hooks/useRunStorage";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function History() {



    const { runHistory } = useRunStorage()



    return (
            <ScrollView className="bg-[#090a0b] px-10 pt-20">
                <View className="gap-5">
                    {runHistory.map((item) => (
                        <View key={item.id} className="aspect-video w-full">
                            <RunMap
                                latitude={item.route[0].latitude}
                                longitude={item.route[0].longitude}
                                latitudeDelta={0.01}
                                longitudeDelta={0.01}
                                locations={item.route}
                                style={{ width: "100%", height: 100 }}
                            />
                            <View>
                                
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
    
    )
}
