import {Box, Typography,Button} from "@mui/material"
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import {createContext, useEffect, useRef, useContext, useState,Dispatch,SetStateAction}from "react"
import  dateFns,{differenceInDays,getYear,getMonth,getDate,addDays}  from 'date-fns';
import { AppContext } from "../_app";
import { useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth";
import { TripResponse } from "../api/book/trip";
import { authOptions } from "../api/auth/[...nextauth]";
import { Book } from "../../interfaces/book/book";
import TripNextBox from "../../components/trip/next/box";
import TripPrevBox from "../../components/trip/prev/box";

export const TripContext = createContext<{next: Book[],prev: Book[]}|null>(null)

function Trip({prev,next}:InferGetServerSidePropsType<typeof getServerSideProps>) {
// function Trip() {
    const loading = useContext(AppContext);
    // console.log("prev!!!!!",prev)
    // console.log("next!!!!!",next)


    useEffect(()=>{
        loading?.done();


    },[])

    const formatter = new Intl.NumberFormat("ko",{
        style : "currency",
        currency : "krw"
    })

    return (
        <TripContext.Provider value={{prev,next}}>

        <Box sx={{width : "100%", display :"flex", flexDirection : "column", alignItems :"center"}}>
            <Box sx={{width: "100%" ,mt: "24px", mb:"24px", pl : "24px"}}>
                <Typography fontSize={"30px"} fontWeight={"bold"}>여행</Typography>
            </Box>

            <TripNextBox/>

            <Box sx={{width: "100%" ,mt: "24px", mb:"24px", pl : "24px"}}>
                <Typography fontSize={"25px"} fontWeight={"bold"}>이전 여행지</Typography>
            </Box>

            <TripPrevBox/>
        </Box>
        </TripContext.Provider>
    );
}

export default Trip;

Trip.layout = "L4";

export const getServerSideProps : GetServerSideProps<{prev : Book[], next  : Book[]}> = async(context : GetServerSidePropsContext)=>{
    const session = await unstable_getServerSession(context.req,context.res,authOptions);
    const rcv = 
        await fetch(process.env.NEXT_PUBLIC_SERVER_URI+"/api/book/trip?guestname="+session?.user?.email,{method : "get"});
    const rst : TripResponse = await rcv.json();

    return {
        props : {
            prev : rst.datas.prev,
            next  : rst.datas.next
        }
    }
}
