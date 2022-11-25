import { Box, Typography,Button } from "@mui/material";
import { useContext } from "react";
import { CustomColor } from "../../../../interfaces/setting/color";
import { format } from "date-fns";
import RoomBookBoxTitle from "./boxtitle";
import RoomBookBoxDate from "./boxdate";
import RoomBookBoxPrice from "./price";
import { RecommandDateContext, RecommandGuestContext, RoomContext } from "../../../../contexts/rooms";
import { useRouter } from "next/router";
import { Book } from "../../../../interfaces/book/book";

const textSt = {ml : 1, mr : 1}

const boxtextT = {fontSize : "10px"}
const boxtextC = {fontSize : "13px"}
const box = {width: "50%", borderStyle  : "solid", borderWidth : "0.1px", borderColor : CustomColor.blackHover, padding : "10px",}

function RoomBookBox() {
    const router = useRouter();
    const ctx = useContext(RoomContext);
    const dateCtx = useContext(RecommandDateContext);
    const guestCtx = useContext(RecommandGuestContext);

    //func
    const onBook = async()=>{
        const inDt = `${format(dateCtx?.date[0] as any, "yyyy-MM-dd")} /17:00:00`;
        const outDt = `${format(dateCtx?.date[1] as any, "yyyy-MM-dd")} /11:00:00`;
        let sndData= {
            checkinDate : inDt,
            checkoutDate : outDt,
            guestCounts : guestCtx?.guest!,
            guestCurrencyOverride : "KRW",
            roomId : `${ctx?.item._id}`,
            businessTravel : {workTrip : false},
        }
        //DB에 저장하고
        const rcv = await fetch(`/api/book`,{
            method : "post",
            body : JSON.stringify(sndData),
            headers : {
                "content-type" : "application/json"
            }
        })
        const rst = await rcv.json();
        //받은 _id를 추가해서
        sndData = rst.datas
        // 페이지 이동 시킴
        console.log()




        /*
            &guestCurrency=KRW

            &productId=716489971524221921

            &isWorkTrip=false

            &code=HMFSQP8NQR
        */
    }

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
            top : "10px",
        }}
    >
        <RoomBookBoxTitle/>

        <RoomBookBoxDate/>

        <Box sx={{display : "flex", justifyContent :"center" , width : "100%", mb : "24px"}}>
            <Typography  sx={boxtextC}>예약 확정 전에는 요금이 청구되지 않습니다.</Typography>
        </Box>

        <Box sx={{width :"100%", mb : "24px"}}>
            <Button onClick={()=>{}} sx={{width :"100%",backgroundImage:`linear-gradient(90deg,${CustomColor.mainHover}, ${CustomColor.main})`}}>
                <Typography sx={{color:CustomColor.white}}>예약하기</Typography>
            </Button>
        </Box>

        <RoomBookBoxPrice/>
    </Box>
    );
}

export default RoomBookBox;