import { getCurrentPositionAsync } from "expo-location";
import { axiosInstance } from "libs/axios";
import { useEffect, useState } from "react";


type Weather = {
    temp: number | null,
    weather: string | null
}


export default function useWeather(hasPermission: boolean | undefined): Weather {

    const [temp, setTemp] = useState<number | null>(null)
    const [weather, setWeather] = useState<string | null>(null)

    useEffect(() => {

        if (!hasPermission) return;

        const getWeatherData = async () => {
            try {
                let location = await getCurrentPositionAsync()

                const lat = location.coords.latitude
                const lon = location.coords.longitude

                if (!lat || !lon) {
                    return;
                }

                const response = await axiosInstance.get(`/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}&units=metric`)

                setTemp(response.data.main.temp)
                setWeather(response.data.weather[0].main);
            } catch (error) {
                console.log(error)
            }
        }
        getWeatherData()

    }, [hasPermission])


    return {
        temp,
        weather
    }
}
