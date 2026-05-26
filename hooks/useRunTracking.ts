import { useEffect, useRef, useState } from "react"
import * as Location from "expo-location"
import { getDistance } from "geolib"

type Coordinate = {
    latitude: number,
    longitude: number
}

type Split = {
    kilometer: number,
    pace: number,
    duration: number
}

export default function useRunTracking(isRunning: boolean, seconds: number) {

    const [locations, setLocations] = useState<Coordinate[]>([])
    const [split, setSplit] = useState<Split[]>([])
    const [totalDistance, setTotalDistance] = useState<number>(0)

    const locationsRef = useRef<Coordinate[]>([])
    const wasPausedRef = useRef(false)
    const splitDistanceRef = useRef(0)
    const splitTimeRef = useRef(0)

    useEffect(() => {
        locationsRef.current = locations
    }, [locations])

    useEffect(() => {
        if (!isRunning) {
            wasPausedRef.current = true
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
                const fakeCoords = {
                    latitude: lastLocation.latitude - 0.00003,
                    longitude: lastLocation.longitude - 0.00000
                }
                const distance =
                    getDistance({
                            latitude: lastLocation.latitude,
                            longitude: lastLocation.longitude,
                        },
                        {
                            latitude: fakeCoords.latitude,
                            longitude: fakeCoords.longitude
                        }
                    )

                if (distance < 1) {
                    return;
                }


                if (wasPausedRef.current) {
                    wasPausedRef.current = false

                    setLocations(prev => [
                        ...prev,
                        fakeCoords
                    ])

                    return;

                }
                splitDistanceRef.current += distance

                while (splitDistanceRef.current >= 1000) {

                    const splitDuration =
                        seconds - splitTimeRef.current

                    const splitPace =
                        splitDuration / 60

                    setSplit((prev) => [
                        ...prev,
                        {
                            kilometer: prev.length + 1,
                            pace: splitPace,
                            duration: splitDuration
                        }
                    ])

                    splitDistanceRef.current -= 1000

                    splitTimeRef.current += splitDuration
                }

                setTotalDistance(prev => prev + distance)

                setLocations(prev => [
                    ...prev,
                    fakeCoords
                ])
            })
        }

        startTracking()

        return () => {
            subscription?.remove()
        }

    }, [seconds, isRunning])

    const resetRun = () => {
        setLocations([])
        setTotalDistance(0)
        setSplit([])

        splitDistanceRef.current = 0
        splitTimeRef.current = 0
    }
    const distanceInKm = totalDistance / 1000
    const minutes = seconds / 60
    const pace = distanceInKm > 0 ? minutes /  distanceInKm : 0 


    return {
        locations,
        totalDistance,
        pace,
        resetRun,
        split
    }

}