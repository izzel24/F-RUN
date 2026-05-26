import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

type Coordinate = {
    latitude: number,
    longitude: number
}

type Split = {
    kilometer: number,
    pace: number,
    duration: number
}

type RunData = {
    distance: number, 
    pace: number, 
    duration: number, 
    route: Coordinate[],
    split: Split[]
}

type RunHistory = { 
    id: string,
    date: string,
    distance: number,
    pace: number,
    duration: number,
    route: Coordinate[],
    split: Split[]
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
                split: runData.split
            };

            const updated = [...parsed, newRun];

            await AsyncStorage.setItem("RUN_HISTORY", JSON.stringify(updated));

        } catch (err) {
            console.log("SAVE RUN ERROR:", err);
        }
    }

    const getRunData = async () => {
        try {
            const runData = await AsyncStorage.getItem("RUN_HISTORY");

            if (runData) {
                const parseRunData: RunHistory[] = JSON.parse(runData)
                setRunHistory(parseRunData.sort((a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                ))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getRunDataWithId = (id: string): RunHistory | undefined => {
        return runHistory.find(item => item.id === id)
    }

    const deleteRun = async (id: string) => {
        try {
            const newRun = runHistory.filter((item) => item.id !== id)
            await AsyncStorage.setItem('RUN_HISTORY', JSON.stringify(newRun))
            setRunHistory(newRun)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getRunData()
    }, [])

    return{
        saveRun,
        getRunData,
        getRunDataWithId,
        deleteRun,
        runHistory,
    }
}