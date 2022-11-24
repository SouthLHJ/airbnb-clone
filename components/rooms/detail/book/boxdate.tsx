import { Box, Typography,Button } from "@mui/material";
import { useContext, useState } from "react";
import { RecommandDateContext, RoomContext } from "../../../../pages/rooms/[itemId]";
import { CustomColor } from "../../../../interfaces/setting/color";
import { format } from "date-fns";
import RoomAboutCalender from "../about/calender";


const boxtextT = {fontSize : "11px"}
const boxtextC = {fontSize : "13px"}
const box = {width: "50%", borderStyle  : "solid", borderWidth : "0.1px", borderColor : CustomColor.blackHover, padding : "10px",}

function RoomBookBoxDate() {
    const ctx = useContext(RoomContext);
    const dateCtx= useContext(RecommandDateContext);
    const [showCalen,setShowCalen] = useState<boolean>(false);


    if(!dateCtx){
        return <></>;
    }
    return (
    <Box  sx={{display : "flex",flexDirection :"column",width : "100%", mb : "24px", position : "relative"}} >
        <Box sx={{width : "100%", display : "flex"}}>
            <Box sx={[box,{ borderTopLeftRadius : "10px",}]} onClick={(evt)=>{
                evt.stopPropagation();
                setShowCalen(true)}}
            >
                <Typography sx={boxtextT}>체크인</Typography>
                {dateCtx.date[0] ?
                    <Typography sx={boxtextC}>{format(dateCtx.date[0] as any,"yyyy.MM.dd.")}</Typography>
                    :
                    <Typography sx={[boxtextC, {color : CustomColor.blackHover}]}>{"날짜추가"}</Typography>
                }
            </Box>
            <Box sx={[box,{ borderTopRightRadius : "10px", borderLeftWidth : 0}]}>
                <Typography sx={boxtextT}>체크아웃</Typography>
                {dateCtx.date[1] ?
                    <Typography sx={boxtextC}>{format(dateCtx.date[1] as any,"yyyy.MM.dd.")}</Typography>
                    :
                    <Typography sx={[boxtextC, {color : CustomColor.blackHover}]}>{"날짜추가"}</Typography>
                }
            </Box>
        </Box>
        <Box sx={[box,{width : "100%",borderBottomLeftRadius : "10px", borderBottomRightRadius : "10px", borderTopWidth : 0}]}> 
            <Typography sx={boxtextT}>인원</Typography>
            <Typography sx={boxtextC}>게스트 {0}명</Typography>
        </Box>

        {
            showCalen &&
            <Box sx={{
                position : "absolute",
                backgroundColor : "white",
                right : "-12px", top : "-12px",
                borderStyle: "solid",
                borderWidth : "1px",
                borderColor : "rgb(221, 221, 221)",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px",
                zIndex : 100
            }}>
                <Box sx={{width : "50%", display : "flex",justifyContent :"flex-end",backgroundColor : "white", position : "absolute", right : "12px", top : "12px"}}>
                    <Box sx={[box,{ borderTopLeftRadius : "10px", borderBottomLeftRadius : "10px"}]}>
                        <Typography sx={boxtextT}>체크인</Typography>
                        {dateCtx.date[0] ?
                            <Typography sx={boxtextC}>{format(dateCtx.date[0] as any,"yyyy.MM.dd.")}</Typography>
                            :
                            <Typography sx={[boxtextC, {color : CustomColor.blackHover}]}>{"날짜추가"}</Typography>
                        }
                    </Box>
                    <Box sx={[box,{ borderTopRightRadius : "10px",borderBottomRightRadius : "10px", borderLeftWidth : 0}]}>
                        <Typography sx={boxtextT}>체크아웃</Typography>
                        {dateCtx.date[1] ?
                            <Typography sx={boxtextC}>{format(dateCtx.date[1] as any,"yyyy.MM.dd.")}</Typography>
                            :
                            <Typography sx={[boxtextC, {color : CustomColor.blackHover}]}>{"날짜추가"}</Typography>
                        }
                    </Box>
                </Box>
                <RoomAboutCalender />
                <Box>
                    <Button onClick={()=>setShowCalen(false)} sx={{width :"100%",backgroundImage:`linear-gradient(90deg,${CustomColor.mainHover}, ${CustomColor.main})`}}>
                        닫기
                    </Button>
                </Box>
            </Box>
        }




    </Box>

    );
}

export default RoomBookBoxDate;