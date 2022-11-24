import {Box, Typography} from "@mui/material"
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Accommodation } from "../../../interfaces/becomehost/accommodation";
import {createContext, useEffect, useRef, useContext, useState,Dispatch,SetStateAction}from "react"
import RoomsHeader from "../../../components/rooms/header/rmHeader";
import RoomPhoto from "../../../components/rooms/photo/rmPhoto";
import RoomDetail from "../../../components/rooms/detail/rmDetail";

import { DirAmenity } from "../../../lib/models/dirAmenities";
import { useDirAmenityDispatch, useDirAmenityState } from "../../../contexts/amenities";
import { AppContext } from "../../_app";
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import  dateFns,{differenceInDays,getYear,getMonth,getDate,addDays}  from 'date-fns';


export const RoomContext = createContext<{
    item : Accommodation
} | null>(null);

export const RecommandDateContext = createContext< {date: DateRange<dateFns | Date>,setDate: Dispatch<SetStateAction<DateRange<dateFns | Date>>>} | null>(null);

function RoomsIndex({item,dir}:InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [date, setDate] = useState<DateRange<dateFns | Date>>([addDays(new Date(),1), addDays(new Date(),4)]);
    const itemRef = useRef<Accommodation>(item);
    const loading = useContext(AppContext);
    const dirDispatch = useDirAmenityDispatch();
    const dirstate = useDirAmenityState();


    useEffect(()=>{
        // console.log(dirstate)
        if(!dirstate){
            loading?.ready();
        }else{
            loading?.done();
        }
        dirDispatch({type:"save",payload : dir})

    },[dirstate])

    return (
    <RoomContext.Provider value={{item : itemRef.current}}>
    <RecommandDateContext.Provider value={{date, setDate}}>   
        <Box flex={1} sx={{height : "90%", mt  : "24px", pl : "calc((20vw)/3)", pr : "calc((20vw)/3)", display : "flex", flexDirection : "column", alignItems : "center", pb : "50px"}}>
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
    </RecommandDateContext.Provider>
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
    const rcvdir = await fetch(process.env.NEXT_PUBLIC_SERVER_URI+"/api/dir/amenity",{method: "get"})
    const datadir = await rcvdir.json();
    // console.log(datadir)
    return {
        props : {
            item : rst.datas,
            dir : datadir.datas
        }
    }
}