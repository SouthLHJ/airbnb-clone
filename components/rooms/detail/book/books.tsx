import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import RoomBookBox from "./box";


function RoomBook() {
    return (
    <Box sx={{width:"100%",height :"100%", pl : "14px", pr : "14px"}}>
        <RoomBookBox/>
    </Box>
    );
}

export default RoomBook;