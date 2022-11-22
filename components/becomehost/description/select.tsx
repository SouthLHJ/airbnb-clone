import { Box, Button, Typography } from "@mui/material";

import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import {GiFireplace} from "react-icons/gi"
import {AiOutlinePicture,AiOutlineGift} from "react-icons/ai"
import {IoDiamondOutline} from "react-icons/io5"
import {GiIonicColumn}from "react-icons/gi"
import { CustomColor } from "../../../interfaces/setting/color";

const sltBox = {display : "flex", alignItems :"center", borderColor : CustomColor.whiteHover, borderWidth : 1, borderStyle : "solid", borderRadius : 5, padding : 1, cursor : "pointer"};
const sltBoxHover= {"&:hover": {borderColor : CustomColor.black}};

type Props = {
    select: string[],
    onChoice: (comment: string) => void
}

function DescriptionSelect({select, onChoice}:Props) {
    return (
    <Box sx={{width : "100%", display : "flex", flexWrap : "wrap",gap :"10px", alignItems : "center", justifyContent :"flex-start"}}>
        <Box sx={[sltBox,sltBoxHover,select.includes("special")&&{borderWidth :2, borderColor : CustomColor.black}]}
            onClick={()=>{onChoice("special")}}
        >
            <IoDiamondOutline/>
            <Box sx={{ml : 1}}>
                <Typography fontSize={"13px"}>흔치않은 특별함</Typography>
            </Box>
        </Box>
        <Box sx={[sltBox,sltBoxHover,select.includes("rural")&&{borderWidth :2, borderColor : CustomColor.black}]}
            onClick={()=>{onChoice("rural")}}
        >
            <GiFireplace />
            <Box sx={{ml : 1}}>
                <Typography fontSize={"13px"}>전원적</Typography>
            </Box>
        </Box>
        <Box sx={[sltBox,sltBoxHover,select.includes("natural")&&{borderWidth :2, borderColor : CustomColor.black}]}
            onClick={()=>{onChoice("natural")}}
        >
            <LocalFloristIcon />
            <Box sx={{ml : 1}}>
                <Typography fontSize={"13px"}>자연</Typography>
            </Box>
        </Box>

        <Box sx={[sltBox,sltBoxHover,select.includes("memorial")&&{borderWidth :2, borderColor : CustomColor.black}]}
            onClick={()=>{onChoice("memorial")}}
        >
            <AiOutlinePicture />
            <Box sx={{ml : 1}}>
                <Typography fontSize={"13px"}>기억에 남는</Typography>
            </Box>
        </Box>
        <Box sx={[sltBox,sltBoxHover,select.includes("romentic")&&{borderWidth :2, borderColor : CustomColor.black}]}
            onClick={()=>{onChoice("romentic")}}
        >
            <AiOutlineGift />
            <Box sx={{ml : 1}}>
                <Typography fontSize={"13px"}>로맨틱</Typography>
            </Box>
        </Box>

        <Box sx={[sltBox,sltBoxHover,select.includes("history")&&{borderWidth :2, borderColor : CustomColor.black}]}
            onClick={()=>{onChoice("history")}}
        >
            <GiIonicColumn />
            <Box sx={{ml : 1}}>
                <Typography fontSize={"13px"}>오랜 역사</Typography>
            </Box>
        </Box>
    </Box>
      );
}

export default DescriptionSelect;
