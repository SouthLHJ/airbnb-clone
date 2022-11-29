import { Box, Typography,Button , Alert } from "@mui/material";
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


type dddd = {
    in : Date,
    out : Date,
}

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
        const inDt = new Date(dateCtx?.date[0] as any).setHours(17);
        const outDt = new Date(dateCtx?.date[1] as any).setHours(11);
        let sndData= {
            checkinDate : inDt,
            checkoutDate : outDt,
            guestCounts : guestCtx?.guest!,
            guestCurrencyOverride : "KRW",
            roomId : `${ctx?.item._id}`,
            businessTravel : false,
            guestname : session.data!.user?.email,
            hostname : ctx?.item.hostName,
            reserveTime : Date.now()
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
        console.log(rst)
        
        if(rst.result){
            //받은 _id를 추가해서
            // 페이지 이동 시킴
            // `?productId=${rst.datas._id}`+`
            const query = `?adult=${sndData.guestCounts.adult}`+`&child=${sndData.guestCounts.child}`+`&infant=${sndData.guestCounts.infant}`+`&pet=${sndData.guestCounts.pet}`
            +`&checkinDate=${sndData.checkinDate}`+`&checkoutDate=${sndData.checkoutDate}`+`&guestCurrencyOverride=${sndData.guestCurrencyOverride}`
            +`&roomId=${sndData.roomId}`+`&businessTravel=${sndData.businessTravel}`+`&guestname=${sndData.guestname}`+`&hostname=${sndData.hostname}`
            +`&_id=${rst.datas._id}`
            router.push("/book/stays/"+query)
        }
            
        

    }

    const ontest = async()=>{
        const rcv = await fetch(`/api/book/reserve?roomId=${ctx?.item._id}`,{method : "get"})

        const rst = await rcv.json();
        console.log(rst)
    }

    
    let isdate= (
    <>
     <Box sx={{width :"100%", mb : "24px"}}>
        <Button onClick={()=>{onBook()}} sx={{width :"100%",backgroundImage:`linear-gradient(90deg,${CustomColor.mainHover}, ${CustomColor.main})`}} disabled>
            <Typography sx={{color:CustomColor.white}}>날짜를 선택해주세요</Typography>
        </Button>
    </Box>
    </>);

    if(dateCtx?.date[1]){
        isdate = (<>
        <Box sx={{width :"100%", mb : "24px"}}>
            <Button onClick={()=>{onBook()}} sx={{width :"100%",backgroundImage:`linear-gradient(90deg,${CustomColor.mainHover}, ${CustomColor.main})`}}>
                <Typography sx={{color:CustomColor.white}}>예약하기</Typography>
            </Button>
        </Box>

        <RoomBookBoxPrice/>
        </>)
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

        {isdate}
{/* 

        <Button onClick={()=>ontest()}>
            test
        </Button> */}
    </Box>
    );
}

export default RoomBookBox;