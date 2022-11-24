import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { RoomContext } from "../../../pages/rooms/[itemId]";
import RoomAbout from "./about/about";
import RoomBook from "./book/books";


function RoomDetail() {
    const ctx = useContext(RoomContext);

    return (
    <Box flex={1} sx={{display : "flex", flexDirection: "row"}}>
        <Box flex={1} sx={{mr : "20px"}}>
            <RoomAbout />
        </Box>
        <Box sx={{display :"flex", alignItems : "flex-end", justifyContent : "space-between", width : "400px"}}>
           <RoomBook/>
        </Box>
    </Box>
    );
}

export default RoomDetail;
