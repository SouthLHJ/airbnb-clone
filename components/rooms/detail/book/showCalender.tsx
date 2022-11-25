import { Box, Typography,Button } from "@mui/material";
import { useContext, useState,Dispatch,SetStateAction,useRef,useEffect } from "react";
import { RecommandDateContext, RoomContext } from "../../../../contexts/rooms";
import { CustomColor } from "../../../../interfaces/setting/color";
import { format } from "date-fns";
import RoomAboutCalender from "../about/calender";

const boxtextT = {fontSize : "11px"}
const boxtextC = {fontSize : "13px"}
const box = {width: "50%", borderStyle  : "solid", borderWidth : "0.1px", borderColor : CustomColor.blackHover, padding : "10px",cursor : "pointer"}

type Props = {
    open : boolean,
    onClose : Dispatch<SetStateAction<boolean>>
}

function RoomBookBoxCalenderDialog({open,onClose}:Props) {

    const ctx = useContext(RoomContext);
    const dateCtx= useContext(RecommandDateContext);

    const ref = useRef<HTMLElement>();
    

    if(!dateCtx || !open){
        return <></>;
    }


    return (
            <Box 
                sx={{
                    position : "absolute",
                    backgroundColor : "white",
                    right : "-12px", top : "-12px",
                    borderStyle: "solid",
                    borderWidth : "1px",
                    borderColor : "rgb(221, 221, 221)",
                    borderRadius: "12px",
                    padding: "24px",
                    boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px",
                    zIndex : 100,
                    width : "660px"
                }}
                
                ref={ref}
            >   <Box
                onClick={()=>onClose(false)}
                sx={{
                    position: "fixed",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh'
                    }}></Box>
                <Box sx={{width : "49%", display : "flex",justifyContent :"flex-end",backgroundColor : "white", position : "absolute", right : "12px", top : "12px"}}>
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
                <Box sx={{width  :"100%"}}>
                    <RoomAboutCalender />
                </Box>    
                <Box>
                    <Button onClick={()=>onClose(false)} sx={[{width :"100%",backgroundColor:`black`, color : "white"},{"&:hover": {backgroundColor : "black", color : "white"}}]}>
                        닫기
                    </Button>
                </Box>
            </Box>


      );
}

export default RoomBookBoxCalenderDialog;