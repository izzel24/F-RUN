import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_500Medium, Roboto_300Light } from '@expo-google-fonts/roboto'
import { LinearGradient } from 'expo-linear-gradient'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Bell, Flame, Hourglass, Play, SportShoe } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage' 
import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import Greetings from 'components/greetings';
import { getCurrentPositionAsync } from 'expo-location';
import { axiosInstance } from 'libs/axios';

type Permissions = {
  location: boolean,
  notifications?: boolean,
  health?: boolean,
}

type UserProfile = {
  age: number | null,
  frequency: string | null,
  goal: string | null,
  height: number,
  level: string,
  name: string,
  pace: string,
  permissions: Permissions,
  weight: number | null
}


export default function Index() {

  const [userData, setUserData] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [lon, setLon] = useState<number | null>(null)
  const [lat, setLat] = useState<number | null>(null)
  const [temp, setTemp] = useState<number | null>(null)
  const [weather, setWeather] = useState<string | null>(null)

  const messageGreetings = Greetings()

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
  
  
  useEffect(() => {
      const getData = async() => {
        try {
          const response = await AsyncStorage.getItem('userProfile');
          if(response !== null){
            setUserData(JSON.parse(response))
          }
        } catch (error) {
          console.log(error)
        } finally{
          setIsLoading(false)
        }
      }
      getData();    
    },[])

    if(isLoading){
      return null;
    }

    if(!userData){
      return <Redirect href={'/onboarding'} />
    }

  if (!loaded) {
    return null
  }

  const getLongLat = async() => {
    if(!userData.permissions.location){
      return;
    }

    let location = await getCurrentPositionAsync()

    console.log(location.coords.latitude)
    console.log(location.coords.longitude)

    setLat(location.coords.latitude)
    setLon(location.coords.longitude)

  }
 
  getLongLat()


  const getWeather = async() => {
    const response = await axiosInstance.get(`/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}&units=metric`)

    console.log(response.data)

    setTemp(response.data.main.temp)
    setWeather(response.data.weather[0].main)
  }

  getWeather()




  return (
    <ScrollView className='bg-[#090a0b] p-2 '>
      <View className='pt-14 pb-8 px-2 flex-row items-center justify-between'>
        <View className='flex-row items-center gap-4'>
          <View className='w-14 h-14 rounded-full bg-[#1b1c1f] items-center justify-center border border-[#2A2B2E]'>
            <Text
              className='text-white text-xl'
              style={{ fontFamily: "Roboto_700Bold" }}
            >
              {userData.name[0].toUpperCase()}
            </Text>
          </View>

          <View className='gap-1'>
            <Text
              className='text-[#7C7D81] text-sm'
              style={{ fontFamily: "Roboto_400Regular" }}
            >
              {messageGreetings}
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
              <Image source={require('../../assets/cloudy.png')} style={{
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
              <View className='rounded-full p-10 bg-[#bbe027]'>
                <Pressable>
                  <Play size={40} color={'#111214'} className='' />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );



}