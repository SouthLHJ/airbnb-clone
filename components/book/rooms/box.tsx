import {Box, Typography,Divider} from "@mui/material"
import BookRoomBoxTitle from "./boxTitle";
import {useEffect,useContext,useState} from "react"
import { BookContext } from "../../../pages/book/stays";
import { Accommodation } from "../../../interfaces/becomehost/accommodation";
import BookRoomBoxPrice from "./boxprice";

function BookRoomBox() {
    const bookCtx = useContext(BookContext);
    const [room,setRoom] =  useState<Accommodation>();

    useEffect(()=>{
        if(bookCtx){
            init();
        }
        async function init (){
            const rcv = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/accommodation/list`,{
                method : "post",
                body : JSON.stringify({_id : bookCtx?.book.roomId}),
                headers : {
                    "content-type" : "application/json"
                }
            })
            const rst = await rcv.json();
            if(rst.result){
                setRoom(rst.datas)
            }
        }
    },[bookCtx])


    return (
    <Box
        sx={{
            borderStyle: "solid",
            borderWidth : "1px",
            borderColor : "rgb(221, 221, 221)",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px",
            maxheight : "600px",
            position :"sticky",
            top : "0px",
        }}
    >
        <BookRoomBoxTitle room={room}/>

        <Box sx={{mt : "24px", mb : "24px"}}>
            <Divider/>
        </Box>

        <Box>
            <Typography>에어커버를 통한 예약 보호</Typography>
        </Box>

        <Box sx={{mt : "24px", mb : "24px"}}>
            <Divider/>
        </Box>

        <BookRoomBoxPrice room={room}/>

        <Box sx={{mt : "24px", mb : "24px"}}>
            <Divider/>
        </Box>

        <Box>
            <Typography fontSize={"13px"}>해외에서 결제가 처리되기 때문에 카드 발행사에서 추가 수수료를 부과할 수 있습니다.</Typography>
        </Box>
    </Box>
    );
}

export default BookRoomBox;