import { IconButton,Divider , Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField, Slide, Button, Box, DialogProps } from "@mui/material";
import Typography from '@mui/material/Typography';
import React, { ChangeEventHandler, useRef, useState,Dispatch,SetStateAction } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import {RiKakaoTalkFill} from "react-icons/ri"
import { CustomColor } from "../../../interfaces/setting/color";
import ReceiptPreview from "./preview";
import { useAccommodationState } from "../../../contexts/accommodation";

import { alpha, styled } from '@mui/material/styles';


type Props ={
    modal : boolean,
    setModal  : Dispatch<SetStateAction<boolean>>
}

function ReceiptDialog({modal,setModal}:Props) {
    const item = useAccommodationState();
    
    return (
        <>
    <CustomDialog
        open={true}
        onClose={()=>setModal(false)} 
        keepMounted
    >
            <DialogTitle sx={{pl : 1, display :"flex", alignItems :"center", width : "100%"}}>
                <IconButton size="small" onClick={()=>setModal(false)}>
                    <CloseIcon />
                </IconButton>
                <Box flex={1} sx={{display : "inline-flex",justifyContent :"center"}}>
                    <Typography  sx={{display : "inline-flex", fontSize : "15px", justifyContent :"center", fontWeight : "bold"}}>
                        미리보기 전체
                    </Typography>
                </Box>
            </DialogTitle>
            <Divider/>
            <DialogContent sx={{width : "100%",display : "flex",justifyContent :"center"}}>
                <Box sx={{display : "flex"}} flex={1}>
                    <Box sx={{display:"flex",flexDirection :"column",width: "400px", mr : 2}}>
                        <ReceiptPreview/>
                    </Box>
                    <Box sx={{display:"flex",flexDirection :"column",overflowY : "scroll", width: "400px"}}>
                        <Box sx={{mb:2}}>
                            <Typography fontSize={"20px"} fontWeight={"bold"}>{item?.title}</Typography>
                        </Box>
                        <Box sx={{mb:2}}>
                            <Typography fontSize={"20px"} fontWeight={"bold"}>{item?.hostName.split("@")[0]}님이 호스팅하는 {item?.type}의 객실</Typography>
                            <Typography>최대 인원 {item?.floorPlan?.guest}명, · 침실 {item?.floorPlan?.bed}개, · 침대 {item?.floorPlan?.bed}개, · 욕실 {item?.floorPlan?.bathroom}개</Typography>
                        </Box>

                        <Divider/>

                        <Box sx={{mb:2,mt:2}}>
                            <Typography>{item?.description?.comment}</Typography>               
                        </Box>
                        

                        <Divider/>
                        <Box sx={{mb:2,mt:2}}>
                            <Box sx={{mb:1}}>
                                <Typography fontSize={"17px"} fontWeight={"bold"}>편의시설</Typography>
                            </Box>
                            {
                                item?.amenities?.convenient.map(one=>{
                                    return(
                                        <Box key={one} sx={{display : "flex", justifyContent :"space-between"}}>
                                            <Typography>{one}</Typography>
                                            <img
                                             src={`/amenities/${one}.png`}
                                             style={{width : "20px",height :"20px"}}
                                            />
                                        </Box>    
                                    )
                                })
                            }
                            {
                                item?.amenities?.specialConvenient.map(one=>{
                                    return(
                                        <Box key={one} sx={{display : "flex", justifyContent :"space-between"}}>
                                            <Typography>{one}</Typography>
                                            <img
                                             src={`/amenities/${one}.png`}
                                             style={{width : "20px",height :"20px"}}
                                            />
                                        </Box>    
                                    )
                                })
                            }
                            {
                                item?.amenities?.safeItem.map(one=>{
                                    return(
                                        <Box key={one} sx={{display : "flex", justifyContent :"space-between"}}>
                                            <Typography>{one}</Typography>
                                            <img
                                            src={`/amenities/${one}.png`}
                                            style={{width : "20px",height :"20px"}}
                                            />
                                        </Box> 
                                    )
                                })
                            }

                        </Box>
                        <Divider/>
                        <Box sx={{mb:2,mt:2}}>
                            <Typography  fontSize={"17px"} fontWeight={"bold"}>위치</Typography>
                            <Typography>{item?.location?.countrycode} {item?.location?.state} {item?.location?.city} {item?.location?.street}</Typography>

                        </Box>
                    </Box>
                </Box>
            </DialogContent>
    </CustomDialog>
    </>
      );
}

export default ReceiptDialog;

const CustomDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(3),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper' :{
        maxWidth : "1000px"
    },
    '.css-uhb5lp':{
        maxWidth : "1000px"
    },
}));