import { Play } from "lucide-react-native";
import { ReactNode, Ref, RefObject, useEffect, useState } from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";


type Coordinate = {
    latitude: number,
    longitude: number,
}

type Props = {
    children?: ReactNode | null,
    mapRef?: RefObject<MapView | null>,
    latitude: number ,
    longitude: number ,
    latitudeDelta?: number | null,
    longitudeDelta?: number | null,
    locations?: Coordinate[],
    style?: StyleProp<ViewStyle> | null,
    isPreview?: boolean,
    isMarkerHidden?: boolean 
}

export default function RunMap(props: Props) {

    let preview = false
    if(props.isPreview){
        preview = props.isPreview
    }

    return (
        <MapView
            liteMode= {preview }
            scrollEnabled={!preview}
            zoomEnabled={!preview}
            ref={props.mapRef}
            initialRegion={{
                latitude: props.latitude || -6.2,
                longitude: props.longitude || 106.816,
                latitudeDelta: props.latitudeDelta || 0.001,
                longitudeDelta: props.longitudeDelta || 0.001
            }}
            userInterfaceStyle="dark"
            style={props.style}
        >
            {props.isMarkerHidden === false &&
                <Marker
                    coordinate={{
                        latitude: props.latitude,
                        longitude: props.longitude
                    }}
                >
                    <View style={{
                        backgroundColor: '#BAE027',
                        padding: 10,
                        borderRadius: 20,
                        borderWidth: 3,
                        borderColor: '#6F8518'
                    }}>
                    </View>
                </Marker>
            }

            {props.locations ? <Polyline
                coordinates={props.locations}
                strokeWidth={8}
                strokeColor="#BAE027"
            />: null}
            
           
        </MapView>
    )
}
