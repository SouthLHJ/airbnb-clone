import { Avatar, Box, Typography } from "@mui/material";
import { useContext } from "react";
import { RoomContext } from "../../../../pages/rooms/[itemId]";
import {BsKey,BsCalendarDate}from "react-icons/bs"
import {IoMedalOutline}from "react-icons/io5"
import { CustomColor } from "../../../../interfaces/setting/color";


const displayRow = {display: "flex", flexDirection : "row"};
const displayColumn = {display: "flex", flexDirection : "column"};

function RoomAboutCalender() {
  const ctx = useContext(RoomContext);


  return (
    <Box flex={1} sx={{}}>
        <Box  sx={{mb : "24px"}}>
            <Typography   fontSize={"20px"} style={{fontWeight :"bold"}}>{ctx?.item.location?.city}, {ctx?.item.location?.state}에서 {"number"}박</Typography>
        </Box>
        <Box>
            <Typography>달력!</Typography>
        </Box>
    </Box>
    );
}

export default RoomAboutCalender;