import {Box, Typography} from "@mui/material"
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import {createContext, useEffect, useRef, useContext, useState,Dispatch,SetStateAction}from "react"
import  dateFns,{differenceInDays,getYear,getMonth,getDate,addDays}  from 'date-fns';
import { AppContext } from "../_app";
import { Book } from "../../interfaces/book/book";
import BookCheckedBox from "../../components/book/checked/box";
import { Accommodation } from "../../interfaces/becomehost/accommodation";



function BookChecked({item,room}:InferGetServerSidePropsType<typeof getServerSideProps>) {
    const loading = useContext(AppContext);
    // console.log("item!!!!!",item)
    // console.log("room!!!!!",room)
    useEffect(()=>{
        loading?.done();
    },[])


    const day1 = item.checkinDate
    const day2 = item.checkoutDate

    const price = (room.price!*differenceInDays(new Date(day2!),new Date(day1!)))
    const cleanPirce = 53902;
    const servicePrice = Math.ceil((price+cleanPirce)*0.14);

    const formatter = new Intl.NumberFormat("ko",{
        style : "currency",
        currency : "krw"
    })

    const cin = new Date(item.checkinDate).toLocaleDateString("ko");
    const cout = new Date(item.checkoutDate).toLocaleDateString("ko");

    return (
        <Box sx={{width : "100%", display :"flex", flexDirection : "column", alignItems :"center"}}>
            <Box sx={{width: "100%" ,mt: "24px", mb:"24px", pl : "25%"}}>
                <Typography fontSize={"30px"} fontWeight={"bold"}>예약 정보 확인</Typography>
            </Box>
            <Box 
                sx={{
                    borderStyle: "solid",
                    borderWidth : "1px",
                    borderColor : "rgb(221, 221, 221)",
                    borderRadius: "12px",
                    padding: "24px",
                    boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px",
                    maxheight : "600px",
                    display : "flex",
                    width : "50%"

                }}
            >
                <Box sx={{width  :"400px", height : "400px"}}>
                    <img
                        alt={"roomimg"}    
                        src={room.photos![0]}
                        style={{
                            width : "100%",
                            height :"100%",
                            objectFit : "cover",
                            borderRadius : "10px",
                        }}
                    />
                </Box>
                <Box sx={{pl : "24px", display : "flex", flexDirection :"column", justifyContent :"space-between"}}>
                    <Box >
                        <Typography  fontSize={"20px"} fontWeight={"bold"} sx={{mb : "8px"}}>예약 숙소</Typography>
                        <Typography  fontSize={"15px"}>{room.title}</Typography>
                    </Box>
                    <Box>
                        <Typography  fontSize={"20px"} fontWeight={"bold"}  sx={{mb : "8px"}}>숙소 위치</Typography>
                        <Typography  fontSize={"15px"}>{room.location?.countrycode} {room.location?.state} {room.location?.city} {room.location?.street}</Typography>
                    </Box>
                    <Box>
                        <Typography  fontSize={"20px"} fontWeight={"bold"}  sx={{mb : "8px"}}>예약 날짜</Typography>
                        <Typography  fontSize={"15px"}>{`${cin} - ${cout}`} </Typography>
                    </Box>
                    <Box>
                        <Typography  fontSize={"20px"} fontWeight={"bold"}  sx={{mb : "8px"}}>예약 인원</Typography>
                        <Typography  fontSize={"15px"}>성인 {item.guestCounts.adult}명, 어린이 {item.guestCounts.child}명, 유아 {item.guestCounts.infant}명, 반려동물 {item.guestCounts.pet}명</Typography>
                    </Box>
                    <Box>
                        <Typography  fontSize={"20px"} fontWeight={"bold"}  sx={{mb : "8px"}}>예약 번호</Typography>
                        <Typography  fontSize={"15px"}>{`${item._id}`}</Typography>
                    </Box>
                    <Box>
                        <Typography  fontSize={"20px"} fontWeight={"bold"}  sx={{mb : "8px"}}>결제 가격</Typography>
                        <Typography  fontSize={"15px"}>{formatter.format(price+cleanPirce+servicePrice)}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box  sx={{width: "100%" ,mt: "24px", mb:"24px", pl : "25%"}}>
                <Typography fontSize={"15px"} color={"gray"}>예약한 숙소는 여행페이지에서 확인할 수 있습니다.</Typography>
            </Box>
        </Box>
    );
}

export default BookChecked;

BookChecked.layout = "L4";

export const getServerSideProps : GetServerSideProps<{item : Book,room  : Accommodation}> = async(context : GetServerSidePropsContext)=>{
    const _id = context.query._id
    const rcv = await fetch(process.env.NEXT_PUBLIC_SERVER_URI+"/api/book?"+`_id=${_id}`,{method : "get"});
    const rst = await rcv.json();
    const rcv2 = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/accommodation/list`,{
        method : "post",
        body : JSON.stringify({_id : rst.datas[0].roomId}),
        headers : {
            "content-type" : "application/json"
        }
    })

    const rst2 = await rcv2.json();
    return {
        props : {
            item : rst.datas[0],
            room  : rst2.datas
        }
    }
}
