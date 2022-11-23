import { Avatar, Box, Typography } from "@mui/material";
import { useContext, useRef } from "react";
import { RoomContext } from "../../../../pages/rooms/[itemId]";
import {BsKey,BsCalendarDate}from "react-icons/bs"
import {IoMedalOutline}from "react-icons/io5"
import { CustomColor } from "../../../../interfaces/setting/color";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const displayRow = {display: "flex", flexDirection : "row"};
const displayColumn = {display: "flex", flexDirection : "column"};

function RoomAboutDescription() {
    const ctx = useContext(RoomContext);
    const ref = useRef<HTMLElement>();
    return (
        <Box  sx={{display : "flex", flexDirection : "column", alignItems :"flex-start", mt :2}}>
            <Box style={{whiteSpace: "pre-wrap",}}>
                <Box style={{
                        lineHeight: "24px",
                        overflow: "hidden",
                        display: "-webkit-box",
                        textOverflow: "ellipsis",
                        WebkitLineClamp : 6,
                        // -webkit-line-clamp: 6,
                        WebkitBoxOrient: "vertical"
                    }}
                    ref={ref}
                >
                    <Typography style = {{boxSizing: "border-box"}}
                    >
                        {ctx?.item.description?.comment}
                    </Typography>
                </Box>
                <Box onClick={()=>{
                    if(ref.current?.style.getPropertyValue("display") === "-webkit-box"){
                        ref.current?.style.setProperty("display","block")
                    }else{
                        ref.current?.style.setProperty("display","-webkit-box")
                    }
                }}
                    sx={[displayRow,{cursor : "pointer", alignItems : "center"}]}
                >
                    <Typography style={{textDecoration : "underline", fontWeight : "bold"}}>{"더보기"}</Typography>
                    <KeyboardArrowRightIcon/>
                </Box>

            </Box>
        </Box>
);
}

export default RoomAboutDescription;