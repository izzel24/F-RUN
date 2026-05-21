import '../global.css';
import { Stack } from 'expo-router'


export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen 
                name='(tabs)'
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen 
                name='onboarding' 
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen 
                name='record'
                options={{
                    presentation: 'fullScreenModal',
                    headerShown: false
                }}
            />
        </Stack>
    )
}