import {Box, Typography,Divider} from "@mui/material"
import { Accommodation } from "../../../interfaces/becomehost/accommodation";
import { CustomColor } from "../../../interfaces/setting/color";
import {useRef} from "react"

type Props={
    room : Accommodation | undefined,
}

function BookRoomBoxTitle({room} : Props) {
    const ref = useRef<HTMLElement>();

    if(!room){
        return null;
    }

    console.log(ref.current?.offsetWidth!*0.4)
    return (
    <Box sx={{display : "flex"}}
        ref = {ref}
    >
        <Box sx={{width  :`${ref.current?.offsetWidth!*0.4}`, height : `${ref.current?.offsetWidth!*0.4}`}}>
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