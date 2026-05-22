import AsyncStorage from "@react-native-async-storage/async-storage";

type Coordinate = { latitude: number, longitude: number }

type RunData = {
    distance: number, 
    pace: number, 
    duration: number, 
    route: Coordinate[]
}


export default function useRunStorage() {

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

    const getRunData = async () => {
        
    }

    return{
        saveRun,
    }
}