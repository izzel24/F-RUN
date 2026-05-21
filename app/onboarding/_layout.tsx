import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <Stack>
        <Stack.Screen 
            name='index'
            options={{
                headerShown:false,
                title: 'Welcome'
            }}
        />
        <Stack.Screen 
            name='goals'
            options={{
                headerShown:false,
                title: 'Goals'
            }}
        />
        <Stack.Screen 
            name='level'
            options={{
                headerShown:false,
                title: 'Level'
            }}
        />
        <Stack.Screen 
            name='frequency'
            options={{
                headerShown:false,
                title: 'Frequency'
            }}
        />
        <Stack.Screen 
            name='pace'
            options={{
                headerShown:false,
                title: 'Pace'
            }}
        />
        <Stack.Screen 
            name='physical'
            options={{
                headerShown:false,
                title: 'Physical'
            }}
        />
    </Stack>
  )
}
