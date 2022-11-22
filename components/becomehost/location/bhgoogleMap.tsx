import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import {Box} from '@mui/material';
import {Dispatch,SetStateAction, useEffect, useState} from "react"
type props = {
    mapLocation: any | Array<Object>,
    setLng : Dispatch<SetStateAction<string>>,
    setLat : Dispatch<SetStateAction<string>>,
};

function BecomeHostGoogleMap({ mapLocation, setLng, setLat }: props) {

    const [latlng, setLatlng] = useState<{lat : number, lng : number}>({lat : mapLocation.lat, lng : mapLocation.lng});

    useEffect(()=>{
        // 값이 변경되면 타이머 작동
        const timerId = setTimeout(()=>{
            // console.log(placeSearch, "!")
            onMovePoint(latlng?.lat, latlng?.lng)
        },200);
        // 값이 계속 변경되서 해제가 된다면 타이머 작업을 끄게 만든다.
        return ()=>{
            // console.log(timerId + "...canceled")
            // 강제종료 타임아웃
            clearTimeout(timerId);
        }
    },[latlng])

    const onMovePoint = (lat: number, lng : number)=>{
        setLat(lat.toString());
        setLng(lng.toString());
    }

    return (
        // <Box style={{ height: '100vh', width: '100%' }}> 
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string}>
            <GoogleMap
                mapContainerStyle={{ height: '100vh', width: '100%' }}
                center={mapLocation}
                zoom={17}
                onClick={(e)=>{
                    // console.log(e.latLng?.lat(),e.latLng?.lng())
                    setLat(e.latLng?.lat().toString() ?? mapLocation.lat);
                    setLng(e.latLng?.lng().toString() ?? mapLocation.lng);
                }}
            >
              
            <MarkerF
                position={mapLocation} 
                onDrag={(evt)=>{
                    setLatlng({lat : evt.latLng?.lat() ?? 35, lng : evt.latLng?.lng() ?? 127})
                }}
                draggable={true}
                // icon={{
                //     // path: google.maps.SymbolPath.CIRCLE,
                //     url: "/icons/icon.jpg",
                //     fillColor: 'white',
                //     fillOpacity: 0.9,
                //     scale: 2,
                //     strokeColor: "gold",
                //     strokeWeight: 2,
                // }}
            />

            </GoogleMap>

        </LoadScript>
        // </Box>  
    )
}

export default BecomeHostGoogleMap;