import { Avatar, Box, Divider, Typography } from "@mui/material";
import { useContext } from "react";
import {BsDot}from "react-icons/bs"
import RoomAboutTitle from "./title";
import RoomAboutSummarize from "./summarize";
import RoomAboutDescription from "./description";
import RoomAboutAmenities from "./amenities";
import RoomAboutCalender from "./calender";
import { RoomContext } from "../../../../contexts/rooms";

const displayRow = {display: "flex", flexDirection : "row"};
const displayColumn = {display: "flex", flexDirection : "column"};

function RoomAbout() {
  const roomCtx = useContext(RoomContext);


  return (
      <Box flex={1}>


          <RoomAboutTitle/>

          <Box sx={{mt : "24px", mb : "24px"}}>
            <Divider/>
          </Box>

          <RoomAboutSummarize/>

          <Box sx={{mt : "24px", mb : "24px"}}>
            <Divider/>
          </Box>

          <RoomAboutDescription/>

          <Box sx={{mt : "24px", mb : "24px"}}>
            <Divider/>
          </Box>

          <RoomAboutAmenities/>

          <Box sx={{mt : "24px", mb : "24px"}}>
            <Divider/>
          </Box>

          <RoomAboutCalender/>

      </Box>
    );
}

export default RoomAbout;