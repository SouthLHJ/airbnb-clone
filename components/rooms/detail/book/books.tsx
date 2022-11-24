import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { RoomContext } from "../../../../pages/rooms/[itemId]";
import RoomBookBox from "./box";


function RoomBook() {
    const ctx = useContext(RoomContext);
    return (
    <Box sx={{width:"100%",borderStyle : "solid", borderColor  :"red", height :"100%", pl : "14px", pr : "14px"}}>
        <RoomBookBox/>
    </Box>
    );
}

export default RoomBook;