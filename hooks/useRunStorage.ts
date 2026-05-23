import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

type Coordinate = { latitude: number, longitude: number }

type RunData = {
    distance: number, 
    pace: number, 
    duration: number, 
    route: Coordinate[]
}

type RunHistory = { 
    id: string,
    date: string,
    distance: number,
    pace: number,
    duration: number,
    route: Coordinate[]
}


export default function useRunStorage() {

    const [runHistory, setRunHistory] = useState<RunHistory[]>([])

    const saveRun = async (runData: RunData) => {
        try {
            const existing = await AsyncStorage.getItem("RUN_HISTORY");
            const parsed = existing ? JSON.parse(existing) : [];

            const newRun = {
                id: Date.now().toString(),
                date: new Date().toISOString(),
                distance: runData.distance,
                pace: runData.pace,
                duration: runData.duration,
                route: runData.route,
            };

            const updated = [...parsed, newRun];

            await AsyncStorage.setItem("RUN_HISTORY", JSON.stringify(updated));

        } catch (err) {
            console.log("SAVE RUN ERROR:", err);
        }
    }

    useEffect(() => {
        const getRunData = async() => {
            try {
                const runData = await AsyncStorage.getItem("RUN_HISTORY");
    
                if(runData) {
                    setRunHistory(JSON.parse(runData)) 
                }
            } catch (error) {
                console.log(error)
            }
        }

        getRunData()
    }, [])

    return{
        saveRun,
        runHistory,
    }
}