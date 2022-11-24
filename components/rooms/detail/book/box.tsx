import { Box, Typography,Button } from "@mui/material";
import { useContext } from "react";
import { RecommandDateContext, RoomContext } from "../../../../pages/rooms/[itemId]";
import {FaWonSign} from "react-icons/fa"
import { CustomColor } from "../../../../interfaces/setting/color";
import { format } from "date-fns";
import RoomBookBoxTitle from "./boxtitle";
import RoomBookBoxDate from "./boxdate";

const textSt = {ml : 1, mr : 1}

const boxtextT = {fontSize : "10px"}
const boxtextC = {fontSize : "13px"}
const box = {width: "50%", borderStyle  : "solid", borderWidth : "0.1px", borderColor : CustomColor.blackHover, padding : "10px",}

function RoomBookBox() {
    const ctx = useContext(RoomContext);

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

        <Box sx={{width :"100%"}}>
            <Button onClick={()=>{}} sx={{width :"100%",backgroundImage:`linear-gradient(90deg,${CustomColor.mainHover}, ${CustomColor.main})`}}>
                <Typography sx={{color:CustomColor.white}}>예약하기</Typography>
            </Button>
        </Box>
    </Box>
    );
}

export default RoomBookBox;