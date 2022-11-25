import {Box, Typography} from "@mui/material"
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import {createContext, useEffect, useRef, useContext, useState,Dispatch,SetStateAction}from "react"
import  dateFns,{differenceInDays,getYear,getMonth,getDate,addDays}  from 'date-fns';
import { Accommodation } from "../../interfaces/becomehost/accommodation";
import { AppContext } from "../_app";


function RoomsIndex({item}:InferGetServerSidePropsType<typeof getServerSideProps>) {
    const itemRef = useRef<Accommodation>(item);
    const loading = useContext(AppContext);

    useEffect(()=>{

    },[])

    return (
        <Box flex={1} sx={{height : "90%", mt  : "24px", pl : "calc((20vw)/3)", pr : "calc((20vw)/3)", display : "flex", flexDirection : "column", alignItems : "center", pb : "50px"}}
        >
            <Box sx={{width : "100%",mt : "24px"}}>
            </Box>

            <Box sx={{width : "100%",mt : "24px"}}>
            </Box>

            <Box sx={{width : "100%",mt : "24px"}}>
            </Box>
        </Box>

    );
}

export default RoomsIndex;

RoomsIndex.layout = "L3";


export const getServerSideProps : GetServerSideProps<{item : Accommodation}> = async(context : GetServerSidePropsContext)=>{
    // console.log(context.query.itemId);   
    const rcv = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/accommodation/list`,{
        method : "post",
        body : JSON.stringify({_id : context.query.itemId}),
        headers : {
            "content-type" : "application/json"
        }
    })
    const rst = await rcv.json();
    
    // console.log(datadir)
    return {
        props : {
            item : rst.datas,
        }
    }
}