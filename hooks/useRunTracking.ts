import { useEffect, useRef, useState } from "react"
import * as Location from "expo-location"
import { getDistance } from "geolib"

type Coordinate = { latitude: number, longitude: number }

export default function useRunTracking(isRunning: boolean, seconds: number) {

    const [locations, setLocations] = useState<Coordinate[]>([])
    const [totalDistance, setTotalDistance] = useState<number>(0)

    const locationsRef = useRef<Coordinate[]>([])

    useEffect(() => {
        locationsRef.current = locations
    }, [locations])

    useEffect(() => {
        if (!isRunning) {
            return;
        }

        let subscription: Location.LocationSubscription | null = null;

        const startTracking = async () => {
            subscription = await Location.watchPositionAsync({
                accuracy: Location.Accuracy.High,
                timeInterval: 3000,
                distanceInterval: 3,
            }, (location) => {
                const coords = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                }
                const lastLocation = locationsRef.current[locationsRef.current.length - 1]
                if (!lastLocation) {
                    setLocations([
                        coords
                    ])
                    return;
                }
                const distance =
                    getDistance({
                            latitude: lastLocation.latitude,
                            longitude: lastLocation.longitude,
                        },
                        {
                            latitude: coords.latitude,
                            longitude: coords.longitude
                        }
                    )

                if (distance < 0) {
                    return;
                }

                setTotalDistance(prev => prev + distance)

                setLocations(prev => [
                    ...prev,
                    coords
                ])
            })
        }

        startTracking()

        return () => {
            subscription?.remove()
        }

    }, [isRunning])

    const resetRun = () => {
        setLocations([])
        setTotalDistance(0)
    }

    const distanceInKm = totalDistance / 1000
    const minutes = seconds / 60
    const pace = distanceInKm > 0 ? minutes /  distanceInKm : 0 


    return {
        locations,
        totalDistance,
        pace,
        resetRun
    }

}