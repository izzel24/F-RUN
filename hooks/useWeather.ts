import { getCurrentPositionAsync } from "expo-location";
import { axiosInstance } from "libs/axios";
import { useEffect, useState } from "react";
import useLocation from "./useLocation";


type Weather = {
    temp: number | null,
    weather: string | null,
    icon: string | null,
}


export default function useWeather(lat: number | null , lon: number | null): Weather {

    const [temp, setTemp] = useState<number | null>(null)
    const [weather, setWeather] = useState<string | null>(null)
    const [icon, setIcon] = useState<string | null>(null)


    useEffect(() => {
        const getWeatherData = async () => {
            try {
                const response = await axiosInstance.get(`/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}&units=metric`)

                console.log(response);
                setTemp(response.data.main.temp);
                setWeather(response.data.weather[0].main);
                setIcon(response.data.weather[0].icon);
            } catch (error) {
                console.log(error)
            }
        }
        getWeatherData()

    }, [lat,lon])


    return {
        temp,
        weather,
        icon
    }
}
