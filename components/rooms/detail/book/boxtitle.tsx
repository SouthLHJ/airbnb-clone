import { Box, Typography,Button } from "@mui/material";
import { useContext } from "react";
import { RecommandDateContext, RoomContext } from "../../../../contexts/rooms";

const textSt = {ml : 1, mr : 1}

function RoomBookBoxTitle() {
    const ctx = useContext(RoomContext);
    return (

    <Box sx={{display : "flex",width : "100%", alignItems :"baseline", mb : "24px"}}>
        <Box flex={1} sx={{display : "flex",alignItems :"baseline "}}>
            <Typography fontSize={"20px"} fontWeight={"bold"}>￦</Typography>
            <Typography fontSize={"20px"} fontWeight={"bold"} sx={{ml : "2px"}}>{ctx?.item.price!.toLocaleString()}</Typography>
            <Typography fontSize={"15px"} sx={{ml : 1}}>/박</Typography>
        </Box>
        <Box sx={{display : "flex",alignItems :"center"}}>
            <Typography sx={textSt}>별점</Typography>
            <Typography sx={textSt}>후기 : ~개</Typography>
        </Box>
    </Box>

    );
}

export default RoomBookBoxTitle;