import {Box, Typography} from "@mui/material"
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Accommodation } from "../../../interfaces/becomehost/accommodation";
import {createContext, useEffect, useRef}from "react"
import RoomsHeader from "../../../components/rooms/header/rmHeader";
import RoomPhoto from "../../../components/rooms/photo/rmPhoto";
import RoomDetail from "../../../components/rooms/detail/rmDetail";

import { DirAmenity } from "../../../lib/models/dirAmenities";
import { useDirAmenityDispatch } from "../../../contexts/amenities";


export const RoomContext = createContext<{
    item : Accommodation
} | null>(null);

function RoomsIndex({item,dir}:InferGetServerSidePropsType<typeof getServerSideProps>) {
    const itemRef = useRef<Accommodation>(item);

    const dirDispatch = useDirAmenityDispatch();
    
    useEffect(()=>{
        dirDispatch({type:"save",payload : dir})
    },[])


    return (
    <RoomContext.Provider value={{item : itemRef.current}}>

        <Box flex={1} sx={{height : "90%",overflowY : "scroll", mt  : "24px", pl : "calc((20vw)/3)", pr : "calc((20vw)/3)", display : "flex", flexDirection : "column", alignItems : "center", pb : "50px"}}>
            <Box sx={{width : "100%",mt : "24px"}}>
                <RoomsHeader />
            </Box>

            <Box sx={{width : "100%",mt : "24px"}}>
                <RoomPhoto />
            </Box>

            <Box sx={{width : "100%",mt : "24px"}}>
                <RoomDetail />
            </Box>
        </Box>
    </RoomContext.Provider>

    );
}

export default RoomsIndex;

RoomsIndex.layout = "L3";


export const getServerSideProps : GetServerSideProps<{item : Accommodation, dir : DirAmenity[]}> = async(context : GetServerSidePropsContext)=>{
    // console.log(context.query.itemId);   
    const rcv = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/accommodation/list`,{
        method : "post",
        body : JSON.stringify({_id : context.query.itemId}),
        headers : {
            "content-type" : "application/json"
        }
    })
    const rst = await rcv.json();
    const rcvdir = await await fetch(process.env.NEXT_PUBLIC_SERVER_URI+"/api/dir/amenity",{method: "get"})
    const datadir = await rcvdir.json();
    
    return {
        props : {
            item : rst.datas,
            dir : datadir.datas
        }
    }
}