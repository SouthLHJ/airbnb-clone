import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { RoomContext } from "../../../pages/rooms/[itemId]";

const textSt = {ml : 1, mr : 1}

function RoomsHeader() {
    const ctx = useContext(RoomContext);

    return (
    <Box flex={1} sx={{display : "flex", flexDirection: "column"}}>
        <Box>
            <Typography fontSize={"30px"} fontWeight={"bold"}>{ctx?.item.title}</Typography>
        </Box>
        <Box sx={{display :"flex", alignItems : "flex-end", justifyContent : "space-between"}}>
            <Box sx={{display :"flex", alignItems : "flex-end",}}>
                <Typography sx={textSt}>별점</Typography>
                <Typography sx={textSt}>후기 : ~개</Typography>
                <Typography sx={textSt}>호스트</Typography>
                <Typography sx={textSt}>{ctx?.item.location?.street},{ctx?.item.location?.state},{ctx?.item.location?.countrycode}</Typography>
            </Box>

            <Box sx={{display :"flex", alignItems : "flex-end",}}>
                <Typography sx={textSt}>공유하기</Typography>
                <Typography sx={textSt}>저장    </Typography>
            </Box>
        </Box>
    </Box>
    );
}

export default RoomsHeader;