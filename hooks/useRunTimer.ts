import { useEffect, useState } from "react";

export default function useRunTimer(isRunning: boolean) {

    const [seconds, setSeconds] = useState<number>(0)

    useEffect(() => {

        let interval: ReturnType<typeof setInterval>;

        if (isRunning) {

            interval = setInterval(() => {

                setSeconds(prev => prev + 1)

            }, 1000)

        }

        return () => clearInterval(interval)

    }, [isRunning])

    const minutes = Math.floor(seconds / 60)
    const remainSeconds = seconds % 60


    const resetTimer =  () => {
        setSeconds(0)
    } 

    return {
        seconds,
        minutes,
        remainSeconds,
        resetTimer
    }
}
