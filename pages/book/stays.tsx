import {Box, Typography} from "@mui/material"
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import {createContext, useEffect, useRef, useContext, useState,Dispatch,SetStateAction}from "react"
import  dateFns,{differenceInDays,getYear,getMonth,getDate,addDays}  from 'date-fns';
import { Accommodation } from "../../interfaces/becomehost/accommodation";
import { AppContext } from "../_app";
import { Book, Guest } from "../../interfaces/book/book";
import BookBill from "../../components/book/bill/bkBill";
import BookRooms from "../../components/book/rooms/bkRooms";


export const BookContext = createContext< { book :  {
    productId :string,
    businessTravel : object,
    checkinDate : string,
    checkoutDate : string,
    adult : string,
    child : string,
    infant : string,
    pet : string ,
    guestCurrencyOverride : string,
    roomId : string,
    hostname : string,
    booker : string,
    } } | null>(null);


function RoomsIndex({datas}:InferGetServerSidePropsType<typeof getServerSideProps>) {
    const loading = useContext(AppContext);

    useEffect(()=>{
        loading?.done();
    },[])

    return (
        <BookContext.Provider value={{book : datas}} >
        <Box flex={1} sx={{height : "90%", mt  : "24px", pl : "calc((20vw)/3)", pr : "calc((20vw)/3)", display : "flex", flexDirection : "column", alignItems : "center", pb : "50px"}}
        >
            <Box sx={{width : "100%"}}>
                <Typography fontSize={"30px"} fontWeight={"bold"}>예약 요청</Typography>
            </Box>

            <Box flex={1} sx={{width : "100%",display : "flex", flexDirection : "row"}}>
                <BookBill/>
                <BookRooms/>
            </Box>
        </Box>
        </BookContext.Provider>

    );
}

export default RoomsIndex;

RoomsIndex.layout = "L4";


export const getServerSideProps : GetServerSideProps<{datas : {
    productId :string,
    businessTravel : object,
    checkinDate : string,
    checkoutDate : string,
    adult : string,
    child : string,
    infant : string,
    pet : string ,
    guestCurrencyOverride : string,
    roomId : string,
    hostname : string,
    booker : string,
    } 
    }> = async(context : GetServerSidePropsContext)=>{
    // console.log(context.query);
    const    {productId}  = context.query;
    const    {adult} = context.query;
    const    {child} = context.query;
    const    {infant} = context.query;
    const    {pet} = context.query;
    const    {checkinDate} = context.query;
    const    {checkoutDate} = context.query;
    const    {guestCurrencyOverride} = context.query;
    const    {roomId} = context.query;
    const    {businessTravel} = context.query;
    const    {booker} = context.query;
    const    {hostname} = context.query;
    // console.log(context.params);   
    // console.log(datadir)
    return {
        props : {
            datas : {
                productId : productId as string,
                adult : adult as string,
                child: child as string,
                infant: infant as string,
                pet: pet as string,
                checkinDate: checkinDate as string,
                checkoutDate: checkoutDate as string,
                guestCurrencyOverride: guestCurrencyOverride as string,
                roomId: roomId as string,
                businessTravel: businessTravel as object,
                booker: booker as string,
                hostname: hostname as string
            }
        }
    }
}