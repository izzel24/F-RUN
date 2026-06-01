import AsyncStorage from "@react-native-async-storage/async-storage";

export type RunnerProfile = {
    score: number;
    bmi: number;
    level: "Beginner" | "Intermediate" | "Advanced";
    recommendedPlan:
    | "5K Beginner"
    | "10K Intermediate"
    | "Half Marathon";
};

const STORAGE_KEY = "runnerProfile";

export default function useRunnerProfileStorage() {

    const saveRunnerProfile = async (
        profile: RunnerProfile
    ) => {
        try {
            await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(profile)
            );
        } catch (error) {
            console.log("Save runner profile error:", error);
        }
    };

    const getRunnerProfile = async (): Promise<RunnerProfile | null> => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEY);

            if (!data) return null;

            return JSON.parse(data);
        } catch (error) {
            console.log("Get runner profile error:", error);
            return null;
        }
    };

    const deleteRunnerProfile = async () => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.log("Delete runner profile error:", error);
        }
    };

    return {
        saveRunnerProfile,
        getRunnerProfile,
        deleteRunnerProfile,
    };
}