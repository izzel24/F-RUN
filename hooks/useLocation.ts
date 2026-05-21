import { getCurrentPositionAsync } from "expo-location";
import { useEffect, useState } from "react";

export default function useLocation(hasPermission: boolean | undefined) {
    const [lat, setLat] = useState<number>(0)
    const [lon, setLon] = useState<number>(0)

    useEffect(() => {
        if(!hasPermission){
            return;
        }
        const getUserLocation = async() => {
            try {
                const location = await getCurrentPositionAsync()
                setLat(location.coords.latitude)
                setLon(location.coords.longitude)
            } catch (error) {
                console.log(error)
            }
        }

        getUserLocation()

    }, [hasPermission])

    return{
        lat,
        lon
    }
}
