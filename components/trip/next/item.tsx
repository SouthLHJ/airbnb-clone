import {Box,Typography} from "@mui/material"
import {format}from "date-fns"
import { Book } from "../../../interfaces/book/book";
import { CustomColor } from "../../../interfaces/setting/color";

import MainPagePreviewItem from "../../main/preview";



function TripItem({item} : {item : Book}) {
    // console.log()
    const roomData = item.roomData![0];

    return (
        <Box sx={{display : "flex"}}>
            <Box sx={{width : "100px", height : "100px"}}> 
                <img
                    alt={"headerimg"}    
                    src={roomData.photos![0]}
                    style={{
                        width : "100%",
                        height :"100%",
                        objectFit : "cover",
                        borderRadius : "10px",
                        borderStyle :"solid"  ,
                        borderWidth  : "1px",   
                        borderColor : CustomColor.whiteHover
                    }}
                />
            </Box>
            <Box sx={{pl : "14px"}}>
                <Typography fontSize={"13px"} fontWeight={"bold"}>{roomData.location?.street}, {roomData.location?.city}, {roomData.location?.state} </Typography>
                <Typography fontSize={"13px"} >호스트 : {item.hostname.split("@")[0]}</Typography>
                <Typography fontSize={"13px"} >{format(new Date(item.checkinDate),"yyyy년 MM월 dd일")} - {format(new Date(item.checkoutDate),"yyyy년 MM월 dd일")}</Typography>
            </Box>
        </Box>
      );
}

export default TripItem;