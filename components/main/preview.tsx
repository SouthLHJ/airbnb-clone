import {Box, Typography} from "@mui/material"
import { Accommodation } from "../../interfaces/becomehost/accommodation";
import { CustomColor } from "../../interfaces/setting/color";
import {FaWonSign} from "react-icons/fa"

type Props = {
    item : Accommodation
}

function MainPagePreviewItem({item}:Props) {
    return (
    <Box sx={{width:"300px",height :"350px",borderRadius : 2, boxShadow : "0 6px 16px rgba(0,0,0,0.12)", padding : 2, animation : "fadein 1s"}}>
        <Box sx={{width : "100%", display : "flex", alignItems :"center", justifyContent :"center"}}>
            <img
                alt={"headerimg"}    
                src={item.photos![0]}
                style={{
                    width : "100%",
                    height :"100%",
                    objectFit : "contain",
                    borderRadius : "10px",
                    borderStyle :"solid"  ,
                    borderWidth  : "1px",   
                    borderColor : CustomColor.whiteHover
                }}
            />
        </Box>
        <Box sx={{display : "flex",mt : 1}}>
            <Box flex={1} >
                <Typography>{item?.title}</Typography>
                <Typography sx={{display:"flex", alignItems : "center"}}><FaWonSign/>{item?.price} / 박</Typography>
            </Box>
            <Box>
                <Typography>신규 ★</Typography>
            </Box>
        </Box>
    </Box>
    );
}

export default MainPagePreviewItem;