import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { RoomContext } from "../../../../pages/rooms/[itemId]";
import {FaWonSign} from "react-icons/fa"
import { CustomColor } from "../../../../interfaces/setting/color";

const textSt = {ml : 1, mr : 1}

function RoomBookBox() {
    const ctx = useContext(RoomContext);

    function comma(num :number) {
        let str = String(num);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }
    return (
    <Box
        sx={{
            borderStyle: "solid",
            borderWidth : "1px",
            borderColor : "rgb(221, 221, 221)",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px",
            maxheight : "600px",
        }}
    >
        <Box sx={{display : "flex",width : "100%", alignItems :"flex-end"}}>
            <Box flex={1} sx={{display : "flex",alignItems :"center"}}>
                <FaWonSign />
                <Typography fontSize={"20px"} fontWeight={"bold"} sx={{ml : "2px"}}>{comma(ctx?.item.price!)}</Typography>
                <Typography sx={{ml : 1}}>/박</Typography>
            </Box>
            <Box sx={{display : "flex",alignItems :"center"}}>
                <Typography sx={textSt}>별점</Typography>
                <Typography sx={textSt}>후기 : ~개</Typography>
            </Box>
        </Box>

        <Box  sx={{display : "flex",flexDirection :"column",width : "100%", borderStyle : "solid",  borderWidth : "0.5px",borderColor : CustomColor.black,borderRadius: "12px", padding : "10px"}}>
            <Box sx={{width : "100%"}}>

            </Box>
            <Box>
                
            </Box>   
        </Box>
    </Box>
    );
}

export default RoomBookBox;