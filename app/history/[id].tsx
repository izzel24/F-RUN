import RunMap from 'components/RunMap'
import { useLocalSearchParams } from 'expo-router'
import useRunStorage from 'hooks/useRunStorage'
import { Text, View, ScrollView, Pressable } from 'react-native'
import { LineChart } from "react-native-gifted-charts";
import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react-native';
import formatDuration from 'utils/formatDuration';
import MapView from 'react-native-maps';
import { Roboto_300Light, Roboto_400Regular, Roboto_700Bold, Roboto_800ExtraBold, useFonts } from '@expo-google-fonts/roboto';

export default function HistoryDetail() {

    const [loaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        Roboto_300Light,
        Roboto_800ExtraBold
    })

    const { id } = useLocalSearchParams()
    const { getRunDataWithId } = useRunStorage()

    const [isPlaying, setIsPlaying] = useState(false)
    const [replayIndex, setReplayIndex] = useState(0)

    const run = getRunDataWithId(id.toString())
    const mapRef = useRef<MapView | null>(null)

    console.log(run)


    useEffect(() => {

        if (!isPlaying || !run) return;
        const replaySpeed = Math.max(10, 2500 / run.route.length)

        const interval = setInterval(() => {

            setReplayIndex((prev) => {

                const nextIndex = prev + 1

                if (nextIndex >= run.route.length) {
                    clearInterval(interval)
                    setIsPlaying(false)
                    return prev
                }

                const nextCoords = run.route[nextIndex]

                mapRef.current?.animateCamera({
                    center: {
                        latitude: nextCoords.latitude,
                        longitude: nextCoords.longitude
                    },
                    zoom: 0,
                    pitch: 30,
                    heading: 0
                }, {
                    duration: replaySpeed
                })
                return nextIndex
            })

        }, replaySpeed)

        return () => clearInterval(interval)

    }, [isPlaying])

    if (!run) {
        return null;
    }
    const replayLocation = run.route[replayIndex]
    const maxPace = Math.max(...run.split.map((item) => item.pace))

    return (
        <ScrollView
            className='flex-1 bg-[#090a0b] '
        >

            <View className='relative'>
                <RunMap
                    mapRef={mapRef}
                    latitude={replayLocation.latitude || run.route[Math.floor(run.route.length / 2)].latitude}
                    longitude={replayLocation.longitude || run.route[Math.floor(run.route.length / 2)].longitude}
                    latitudeDelta={0.01}
                    longitudeDelta={0.01}
                    locations={isPlaying ? run.route.slice(0, replayIndex + 1) : run.route}
                    style={{ width: "100%", height: 320 }}
                    isMarkerHidden={false}
                />
                <Pressable
                    onPress={() => {

                        if (replayIndex >= run.route.length - 1) {
                            setReplayIndex(0)
                        }

                        setIsPlaying(prev => !prev)
                    }}
                    className='absolute bottom-5 right-5 bg-[#BAE027] p-5 rounded-full'
                >
                    {
                        isPlaying
                            ? <Pause color={"black"} fill={"black"} size={24} />
                            : <Play color={"black"} fill={"black"} size={24} />
                    }
                </Pressable>

            </View>

            <View className='py-5 gap-2'>
                <View className='px-3'>
                    <View className='bg-[#1b1c1f] flex-1 p-5 gap-4 rounded-2xl'>
                        <View className='flex-row justify-around w-full pb-5 border-b border-b-gray-400'>
                            <View className='px-2 items-center'>
                                <Text className='text-gray-400 text-sm mb-2' style={{ fontFamily: "Roboto_300Light" }}>Distance</Text>
                                <Text className='text-white text-6xl leading-none' style={{ fontFamily: "Roboto_800ExtraBold" }}>{run.distance.toFixed(2)}</Text>
                                <Text className='text-[#BAE027] text-xl leading-none' style={{ fontFamily: "Roboto_400Regular" }}>km</Text>
                            </View>
                            <View className='px-2 items-center'>
                                <Text className='text-gray-400 mb-2' style={{ fontFamily: "Roboto_300Light" }}>Avg Pace</Text>
                                <Text className='text-white text-6xl leading-none' style={{ fontFamily: "Roboto_800ExtraBold" }}>{run.pace.toFixed(2)}</Text>
                                <Text className='text-[#BAE027] text-xl leading-none' style={{ fontFamily: "Roboto_400Regular" }}>/km</Text>
                            </View>
                        </View>
                        <View className='items-center'>
                            <Text className='text-gray-400 text-sm mb-2' style={{ fontFamily: "Roboto_300Light" }}>
                                Duration
                            </Text>

                            <Text className='text-white text-6xl leading-none' style={{ fontFamily: "Roboto_800ExtraBold" }}>
                                {formatDuration(run.duration)}
                            </Text>
                        </View>
                    </View>
                </View>
                <View className='px-3 '>
                    <View className='bg-[#1b1c1f] rounded-2xl p-5 gap-2'>
                        <Text className='text-white text-2xl' style={{ fontFamily: "Roboto_700Bold" }}>
                            Pace Split
                        </Text>

                        <LineChart
                            areaChart
                            data={
                                run.split.map((item) => ({
                                    value: item.pace,
                                    label: `${item.kilometer}K`
                                }))
                            }
                            width={200}
                            spacing={50}
                            thickness={4}
                            color="rgb(186, 224, 39)"
                            hideDataPoints={false}
                            dataPointsColor="rgb(186, 224, 39)"
                            pointerConfig={{
                                pointerColor: "rgb(186, 224, 39)",
                                pointerStripColor: "rgb(186, 224, 39)",
                            }}
                            startFillColor='rgb(186, 224, 39)'
                            endFillColor='rgb(186, 224, 39)'
                            startOpacity={0.35}
                            endOpacity={0.05}
                            yAxisColor={"#444"}
                            xAxisColor={"#444"}
                            yAxisTextStyle={{
                                color: "#999"
                            }}
                            xAxisLabelTextStyle={{
                                color: "#999"
                            }}
                            formatYLabel={(label) => Number(label).toFixed(2)}
                            stepValue={1}
                            noOfSections={Math.ceil(maxPace) + 1}
                        />
                    </View>
                </View>

                <View className='px-3'>
                    <View className='py-2 bg-[#1b1c1f] rounded-2xl '>
                        <Text className='text-white text-2xl p-5' style={{ fontFamily: "Roboto_700Bold" }}>
                            Splits
                        </Text>
                        {
                            run.split.map((item) => (
                                <View
                                    key={item.kilometer}
                                    className='bg-[#1b1c1f] px-5 rounded-2xl flex-row justify-between items-center'
                                >
                                    <View>
                                        <Text className='text-gray-400'>
                                            Kilometer
                                        </Text>

                                        <Text className='text-white text-2xl'>
                                            {item.kilometer}K
                                        </Text>
                                    </View>

                                    <View>
                                        <Text className='text-gray-400'>
                                            Pace
                                        </Text>

                                        <Text className='text-white text-2xl text-right'>
                                            {item.pace.toFixed(2)}
                                        </Text>
                                    </View>

                                    <View>
                                        <Text className='text-gray-400'>
                                            Time
                                        </Text>

                                        <Text className='text-white text-2xl text-right'>
                                            {formatDuration(item.duration)}
                                        </Text>
                                    </View>

                                </View>
                            ))
                        }
                    </View>

                </View>
            </View>

        </ScrollView>
    )
}