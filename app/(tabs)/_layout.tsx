import { Tabs } from "expo-router"
import { ClipboardPenLine, House, Play } from "lucide-react-native"
import { View } from "react-native"

export default function Tablayout() {
  return (
    <Tabs
        screenOptions={{
            headerShown: false, 
            tabBarStyle: {
                backgroundColor: "#111111",
                borderTopWidth: 0,
                height: 70,
                paddingBottom: 10,
                paddingTop: 10,
            },
            tabBarActiveTintColor: "#BAE027",
            tabBarInactiveTintColor: "#666",
        }}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: "Home",
                tabBarIcon: ({ color, size }) => (
                    <House color={color} size={size} />
                )
            }}
        />
        <Tabs.Screen 
            name="record"
            options={{
                title: "",
                tabBarIcon: () => (

                    <View
                        className="w-20 h-20 rounded-full bg-[#BAE027] items-center justify-center -mt-5"
                    >

                        <Play
                            color={"#090a0b"}
                            size={28}
                            fill={"#090a0b"}
                        />

                    </View>

                )
            }}
        />
        <Tabs.Screen 
            name="plan"
            options={{
                title: "Plan",
                tabBarIcon: ({ color, size  }) => (
                    <ClipboardPenLine color={color} size={size} />
                )
            }}
        />
    </Tabs>
  )
}
