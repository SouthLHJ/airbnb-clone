import {Box, Typography,Divider} from "@mui/material"
import { Accommodation } from "../../../interfaces/becomehost/accommodation";
import { CustomColor } from "../../../interfaces/setting/color";

type Props={
    room : Accommodation | undefined,
}

function BookRoomBoxTitle({room} : Props) {
    

    if(!room){
        return null;
    }
    return (
    <Box sx={{display : "flex"}}>
        <Box sx={{width  :"40%", height : "106px"}}>
            <img
                alt={"roomimg"}    
                src={room.photos![0]}
                style={{
                    width : "100%",
                    height :"100%",
                    objectFit : "cover",
                    borderRadius : "10px",
                }}
            />
        </Box>
        <Box sx={{pl : "14px"}}>
            <Typography fontSize={"13px"} color={CustomColor.blackHover}>집 전체</Typography>
            <Typography>{room.title}</Typography>
        </Box>
    </Box>
    );
}

export default BookRoomBoxTitle;