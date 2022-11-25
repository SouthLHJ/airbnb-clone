import { Box, Typography,Button } from "@mui/material";
import { useContext, useState,useRef } from "react";
import { CustomColor } from "../../../../interfaces/setting/color";
import { format } from "date-fns";
import RoomBookBoxCalenderDialog from "./showCalender";
import RoomBookBoxGuestDialog from "./showGuest";
import { RecommandDateContext, RoomContext } from "../../../../contexts/rooms";


const boxtextT = {fontSize : "11px"}
const boxtextC = {fontSize : "13px"}
const box = {width: "50%", borderStyle  : "solid", borderWidth : "0.1px", borderColor : CustomColor.blackHover, padding : "10px",cursor : "pointer", height : "55px"}

function RoomBookBoxDate() {
    const ctx = useContext(RoomContext);
    const dateCtx= useContext(RecommandDateContext);
    const [showCalen,setShowCalen] = useState<boolean>(false);
    const [showGuest,setShowGuest] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>()

    

    if(!dateCtx){
        return <></>;
    }
    return (
    <Box  sx={{display : "flex",flexDirection :"column",width : "100%", mb : "24px", position : "relative"}} >
        <Box sx={{width : "100%", display : "flex"}}>
            <Box sx={[box,{ borderTopLeftRadius : "10px",}]} onClick={(evt)=>{setShowCalen(true); setShowGuest(false)}}>
                <Typography sx={boxtextT}>체크인</Typography>
                {dateCtx.date[0] ?
                    <Typography sx={boxtextC}>{format(dateCtx.date[0] as any,"yyyy.MM.dd.")}</Typography>
                    :
                    <Typography sx={[boxtextC, {color : CustomColor.blackHover}]}>{"날짜추가"}</Typography>
                }
            </Box>
            <Box sx={[box,{ borderTopRightRadius : "10px", borderLeftWidth : 0}]} onClick={(evt)=>{setShowCalen(true); setShowGuest(false)}}>
                <Typography sx={boxtextT}>체크아웃</Typography>
                {dateCtx.date[1] ?
                    <Typography sx={boxtextC}>{format(dateCtx.date[1] as any,"yyyy.MM.dd.")}</Typography>
                    :
                    <Typography sx={[boxtextC, {color : CustomColor.blackHover}]}>{"날짜추가"}</Typography>
                }
            </Box>
        </Box>
        <Box sx={[box,{width : "100%",borderBottomLeftRadius : "10px", borderBottomRightRadius : "10px", borderTopWidth : 0}]}
            ref={ref}
            onClick={()=>{setShowGuest(true); setShowCalen(false)}}
        > 
            <Typography sx={boxtextT}>인원</Typography>
            <Typography sx={boxtextC}>게스트 {0}명</Typography>
        </Box>
        
        <RoomBookBoxCalenderDialog open={showCalen} onClose={setShowCalen}/>

        <RoomBookBoxGuestDialog open={showGuest} onClose={setShowGuest} width={ref?.current?.offsetWidth}/>

    </Box>

    );
}

export default RoomBookBoxDate;