import { Image, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_500Medium, Roboto_300Light } from '@expo-google-fonts/roboto'
import { LinearGradient } from 'expo-linear-gradient'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Bell, Flame, Hourglass, Play, SportShoe } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage' 
import { Redirect, router } from 'expo-router';
import useWeather from 'hooks/useWeather';
import useUserProfile from 'hooks/useUserProfile';
import Greetings from 'utils/getGreetings';
import useLocation from 'hooks/useLocation';
import { useState } from 'react';



export default function Index() {

  const [refreshing, setRefreshing] = useState(false)

  const {userData, isLoading} = useUserProfile()
  const { lat, lon } = useLocation(userData?.permissions?.location)

  const { temp, weather, icon } = useWeather(lat, lon)

  const clearStorage = async() => {
    await AsyncStorage.clear()
  }

  // clearStorage()

  const [loaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_300Light,
  })
  
    if(isLoading){
      return null;
    }

    if(!userData){
      return <Redirect href={'/onboarding'} />
    }

  if (!loaded) {
    return null
  }

  const onRefresh = async() => {

      setRefreshing(true)

      router.replace('/')

      setRefreshing(false)
  }

  return (
    <ScrollView className='bg-[#090a0b] p-2 ' 
      refreshControl={
        <RefreshControl 
        refreshing={refreshing}
        onRefresh={onRefresh}  />
      }
    >
      <View className='pt-14 pb-8 px-2 flex-row items-center justify-between'>
        <View className='flex-row items-center gap-4'>
          <View className='w-14 h-14 rounded-full bg-[#1b1c1f] items-center justify-center border border-[#2A2B2E]'>
            <Text
              className='text-white text-xl'
              style={{ fontFamily: "Roboto_700Bold" }}
            >
              {userData?.name?.[0]?.toUpperCase()}
            </Text>
          </View>

          <View className='gap-1'>
            <Text
              className='text-[#7C7D81] text-sm'
              style={{ fontFamily: "Roboto_400Regular" }}
            >
              <Greetings />
            </Text>

            <Text
              className='text-white text-2xl leading-none'
              style={{ fontFamily: "Roboto_700Bold" }}
            >
              {userData.name}
            </Text>
          </View>

        </View>

        <View className='w-12 h-12 rounded-full items-center justify-center'>
          <Bell size={22} color={"white"} />
        </View>

      </View>
      <View className='gap-3'>
        <View className='rounded-2xl overflow-hidden'>
          <LinearGradient
            colors={['#1E3045', '#172434', '#14202e']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className=""
          >
            <View className='p-5 flex-row justify-between items-center'>
              <View>
                <Text
                  className="text-white text-5xl leading-none"
                  style={{ fontFamily: "Roboto_700Bold" }}
                >
                  {temp?.toFixed()}°C
                </Text>

                <Text
                  className="text-[#B7C3CF] text-base"
                  style={{ fontFamily: "Roboto_400Regular" }}
                >
                  {weather}
                </Text>
              </View>
              <Image source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }} style={{
                width: 70,
                height: 70,
              }} />
            </View>
          </LinearGradient>
        </View>
        <View className='p-5 bg-[#111214] rounded-2xl'>
          <Text className='text-white text-lg' style={{ fontFamily: 'Roboto_500Medium' }}>Daily Goal</Text>
          <View className='pt-4 flex-row justify-between'>
            <AnimatedCircularProgress
              size={150}
              width={16}
              fill={72}
              tintColor="#BAE027"
              backgroundColor="#BAE0270D"
              rotation={0}
              arcSweepAngle={360}
              lineCap='round'
            >
              {
                () => (
                  <View className='items-center'>
                    <Text className='text-white text-3xl' style={{ fontFamily: "Roboto_700Bold" }}>
                      72%
                    </Text>
                    <Text className='text-white/50 text-base' style={{ fontFamily: "Roboto_400Regular" }}>
                      Complete
                    </Text>
                  </View>
                )
              }
            </AnimatedCircularProgress>
            <View className='justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className='w-[40px] h-[40px] rounded-full items-center justify-center bg-[#bbe0271f]'>
                  <SportShoe color={'#BAE027'} size={20} />
                </View>
                <View className=''>
                  <Text className='text-white text-sm' style={{ fontFamily: "Roboto_300Light" }}>Distance</Text>
                  <View className='flex-row items-end'>
                    <Text className='text-white text-3xl' style={{ fontFamily: "Roboto_700Bold" }}>5,2</Text>
                    <Text className='text-white text-base' style={{ fontFamily: "Roboto_300Light" }}> / 7 km</Text>
                  </View>
                </View>
              </View>
              <View className='flex-row items-center gap-3'>
                <View className='w-[40px] h-[40px] rounded-full items-center justify-center bg-[#bbe0271f]'>
                  <Flame color={'#BAE027'} size={20} />
                </View>
                <View className=''>
                  <Text className='text-white text-sm' style={{ fontFamily: "Roboto_300Light" }}>Calories</Text>
                  <View className='flex-row items-end'>
                    <Text className='text-white text-3xl' style={{ fontFamily: "Roboto_700Bold" }}>320</Text>
                    <Text className='text-white text-base' style={{ fontFamily: "Roboto_300Light" }}> / 500 kcal</Text>
                  </View>
                </View>
              </View>
              <View className='flex-row items-center gap-3'>
                <View className='w-[40px] h-[40px] rounded-full items-center justify-center bg-[#bbe0271f]'>
                  <Hourglass color={'#BAE027'} size={20} />
                </View>
                <View className=''>
                  <Text className='text-white text-sm' style={{ fontFamily: "Roboto_300Light" }}>Time</Text>
                  <View className='flex-row items-end'>
                    <Text className='text-white text-3xl' style={{ fontFamily: "Roboto_700Bold" }}>42</Text>
                    <Text className='text-white text-base' style={{ fontFamily: "Roboto_300Light" }}> / 60 min</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className='p-5 bg-[#111214] rounded-2xl'>
          <Text className='text-white text-lg' style={{ fontFamily: 'Roboto_500Medium' }}>Today&lsquo;s Plan</Text>
          <View className='pt-4'>
            <Text className='text-white text-6xl' style={{ fontFamily: 'Roboto_700Bold' }}><Text className='text-[#bbe027]'>Easy</Text> Run</Text>
            <View className='flex-row items-center justify-between'>
              <View className='pt-2'>
                <Text className='text-white text-sm' style={{ fontFamily: 'Roboto_300Light' }}>Distance</Text>
                <Text className='text-white text-4xl' style={{ fontFamily: 'Roboto_700Bold' }}>07.0 KM</Text>
                <Text className='text-white text-sm' style={{ fontFamily: 'Roboto_300Light' }}>Pace</Text>
                <Text className='text-white text-4xl' style={{ fontFamily: 'Roboto_500Medium' }}>8:45 - 9:25<Text className='text-xl'> / km</Text></Text>
                <Text className='text-white text-sm pt-2' style={{ fontFamily: 'Roboto_300Light' }}>Est. Time: 1 Hour 5 minutes</Text>
              </View>
                <Pressable 
                  onPress={() => router.push('/record')}
                  className='rounded-full p-10 bg-[#bbe027]'
                >
                  <Play size={40} color={'#090a0b'} fill={"#090a0b"} className='' />
                </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );



}