import {Box, Typography} from "@mui/material"
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import {createContext, useEffect, useRef, useContext, useState,Dispatch,SetStateAction,MutableRefObject, RefObject}from "react"
import  dateFns,{differenceInDays,getYear,getMonth,getDate,addDays}  from 'date-fns';
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Accommodation } from "../interfaces/becomehost/accommodation";
import { Guest } from "../interfaces/book/book";



export const RoomContext = createContext<{
    item : Accommodation
} | null>(null);

export const RecommandDateContext = createContext< {date: DateRange<dateFns | Date>,setDate: Dispatch<SetStateAction<DateRange<dateFns | Date>>>} | null>(null);
export const RecommandGuestContext = createContext< {guest : Guest, setGuest : Dispatch<SetStateAction<Guest>> } | null>(null);

export const RoomContextProvider = ({ children , itemRef}: { children: React.ReactNode, itemRef : MutableRefObject<Accommodation>,})=>{
    const [date, setDate] = useState<DateRange<dateFns | Date>>([addDays(new Date(),1), addDays(new Date(),4)]);
    const [guest, setGuest] = useState<Guest>({adult : 1,child : 0,infant : 0,pet : 0 });
    
    return (
        <RoomContext.Provider value={{item : itemRef.current}} >
        <RecommandDateContext.Provider value={{date, setDate}}>
        <RecommandGuestContext.Provider value={{guest,setGuest}}>
            {children}
        </RecommandGuestContext.Provider>
        </RecommandDateContext.Provider>
        </RoomContext.Provider>
    )
}