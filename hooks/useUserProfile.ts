import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

type Permissions = {
    location: boolean,
    notifications?: boolean,
    health?: boolean,
}

type UserProfile = {
    age: number | null,
    frequency: string | null,
    goal: string | null,
    height: number | null,
    // level: string | null,
    name: string | null,
    pace: string | null,
    permissions: Permissions,
    weight: number | null
}

type UseUserProfile ={
    userData: UserProfile | null,
    isLoading: boolean 
}



export default function useUserProfile(): UseUserProfile {

    const [userData, setUserData] = useState<UserProfile | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)


    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await AsyncStorage.getItem('userProfile');
                if (response !== null) {
                    setUserData(JSON.parse(response))
                }
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        getUserProfile();

    }, [])


    return {
        userData,
        isLoading
    }
}