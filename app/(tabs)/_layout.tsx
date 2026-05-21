import { Tabs } from "expo-router"
import { ClipboardPenLine, House } from "lucide-react-native"

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
