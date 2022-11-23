import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { RoomContext } from "../../../pages/rooms/[itemId]";
import RoomAbout from "./about/about";
import RoomBook from "./books";


function RoomDetail() {
    const ctx = useContext(RoomContext);

    return (
    <Box flex={1} sx={{display : "flex", flexDirection: "row"}}>
        <Box sx={{width : "80%"}}>
            <RoomAbout />
        </Box>
        <Box sx={{display :"flex", alignItems : "flex-end", justifyContent : "space-between"}}>
           <RoomBook/>
        </Box>
    </Box>
    );
}

export default RoomDetail;
