import { Box,Typography, Container, IconButton, Menu ,MenuItem ,Avatar ,Divider ,ListItemIcon, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField, Slide, Button } from "@mui/material";
import { CustomColor } from "../../interfaces/setting/color";
import {IoSearchCircle} from "react-icons/io5"
import {useState} from "react"

function HeaderMiddle() {
    const [detail ,setDetail] = useState<boolean>(false);

    return (
    <>
        <Box
            onClick={()=>{setDetail(d=>!d)}}
            sx={[
                {display :"flex", flexDirection :"row", borderStyle : "solid", borderColor : CustomColor.blackHover, borderWidth: 1, borderRadius : 10, pt: 1, pb : 1, pl : 2, pr:2, justifyContent : "space-around"},
                {"&:hover":{boxShadow : 1}}
            ]}
            
        >
            {
                detail ?
                <>
                    <Box sx={{width : "28%",display :"flex", flexDirection :"row",alignItems : "center", justifyContent: "center"}}>
                        <Typography fontSize={13} fontWeight={"bold"}>여행지</Typography>
                    </Box>
                    <Box sx={{width : "30%",display :"flex", flexDirection :"row",alignItems : "center", justifyContent: "center"}}>
                        <Typography fontSize={13} fontWeight={"bold"}>체크인</Typography>
                    </Box>
                    <Box sx={{width : "28%",display :"flex", flexDirection :"row",alignItems : "center", justifyContent: "center"}}>
                        <Typography fontSize={13}>여행자</Typography>
                    </Box>
                    <Box sx={{width : "20%",display :"flex", flexDirection :"row",alignItems : "center", justifyContent: "center"}}>
                        <IoSearchCircle fontSize={25} color={CustomColor.main}/>
                    </Box>
                </> 
                :
                <>
                    <Box sx={{width : "28%",display :"flex", flexDirection :"row",alignItems : "center", justifyContent: "center"}}>
                        <Typography fontSize={13} fontWeight={"bold"}>어디든지</Typography>
                    </Box>
                    <Box sx={{width : "30%",display :"flex", flexDirection :"row",alignItems : "center", justifyContent: "center"}}>
                        <Typography fontSize={13} fontWeight={"bold"}>언제든 일주일</Typography>
                    </Box>
                    <Box sx={{width : "28%",display :"flex", flexDirection :"row",alignItems : "center", justifyContent: "center"}}>
                        <Typography fontSize={13}>게스트 추가</Typography>
                    </Box>
                    <Box sx={{width : "20%",display :"flex", flexDirection :"row",alignItems : "center", justifyContent: "center"}}>
                        <IoSearchCircle fontSize={25} color={CustomColor.main}/>
                    </Box>
                </>

            }
        </Box>
    </>    
    );
}

export default HeaderMiddle;