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
import { useSession } from "next-auth/react";
import { AppContext } from "../../../../pages/_app";

const textSt = {ml : 1, mr : 1}

const boxtextT = {fontSize : "10px"}
const boxtextC = {fontSize : "13px"}
const box = {width: "50%", borderStyle  : "solid", borderWidth : "0.1px", borderColor : CustomColor.blackHover, padding : "10px",}

function RoomBookBox() {
    const router = useRouter();
    const session = useSession();
    // console.log(session);
    const loading = useContext(AppContext);
    const ctx = useContext(RoomContext);
    const dateCtx = useContext(RecommandDateContext);
    const guestCtx = useContext(RecommandGuestContext);

    //func
    const onBook = async()=>{
        if(session.status === "unauthenticated"){
            return;
        }
        loading?.ready();
        const inDt = `${format(dateCtx?.date[0] as any, "yyyy-MM-dd")} /17:00:00`;
        const outDt = `${format(dateCtx?.date[1] as any, "yyyy-MM-dd")} /11:00:00`;
        let sndData= {
            checkinDate : inDt,
            checkoutDate : outDt,
            guestCounts : guestCtx?.guest!,
            guestCurrencyOverride : "KRW",
            roomId : `${ctx?.item._id}`,
            businessTravel : {workTrip : false},
            booker : session.data!.user?.email,
            hostname : ctx?.item.hostName
        }
        console.log(sndData)
        //DB에 저장하고
        const rcv = await fetch(`/api/book`,{
            method : "post",
            body : JSON.stringify(sndData),
            headers : {
                "content-type" : "application/json"
            }
        })
        const rst = await rcv.json();
        if(rst.result){
            //받은 _id를 추가해서
            // 페이지 이동 시킴
            const query = `?productId=${rst.datas._id}`+`&adult=${sndData.guestCounts.adult}`+`&child=${sndData.guestCounts.child}`+`&infant=${sndData.guestCounts.infant}`+`&pet=${sndData.guestCounts.pet}`
                        +`&checkinDate=${sndData.checkinDate}`+`&checkoutDate=${sndData.checkoutDate}`+`&guestCurrencyOverride=${sndData.guestCurrencyOverride}`
                        +`&roomId=${sndData.roomId}`+`&businessTravel=${sndData.businessTravel}`+`&booker=${sndData.booker}`+`&hostname=${sndData.hostname}`
            router.push("/book/stays/"+query)

        }
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
            <Button onClick={()=>{onBook()}} sx={{width :"100%",backgroundImage:`linear-gradient(90deg,${CustomColor.mainHover}, ${CustomColor.main})`}}>
                <Typography sx={{color:CustomColor.white}}>예약하기</Typography>
            </Button>
        </Box>

        <RoomBookBoxPrice/>
    </Box>
    );
}

export default RoomBookBox;