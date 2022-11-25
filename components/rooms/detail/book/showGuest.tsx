import { Box, Typography,Button } from "@mui/material";
import { useContext, useState,Dispatch,SetStateAction } from "react";
import { RecommandDateContext, RecommandGuestContext, RoomContext } from "../../../../contexts/rooms";
import { CustomColor } from "../../../../interfaces/setting/color";
import {CiCircleMinus,CiCirclePlus}from "react-icons/ci"


const boxtextT = {fontSize : "11px"}
const boxtextC = {fontSize : "13px"}
const box = {width: "50%", borderStyle  : "solid", borderWidth : "0.1px", borderColor : CustomColor.blackHover, padding : "10px",cursor : "pointer"}

type Props = {
    open : boolean,
    onClose : Dispatch<SetStateAction<boolean>>,
    width  : number | undefined
}

function RoomBookBoxGuestDialog({open,onClose,width}:Props) {

    const ctx = useContext(RoomContext);
    const guestCtx= useContext(RecommandGuestContext);
    
    
    const dateCtx= useContext(RecommandDateContext);
    
    if(!dateCtx || !open || !guestCtx){
        return <></>;
    }
    
    const guest = guestCtx?.guest;
    const adult = guestCtx?.guest.adult;
    const child = guestCtx?.guest.child;
    const infant = guestCtx?.guest.infant;
    const pet = guestCtx?.guest.pet;
    const setGuest = guestCtx?.setGuest;

    //func
    const onChangeValue = (title : "ad"|"ch"|"ifa" | "pet", type : "p"|"m" )=>{
        switch(title){
            case "ad":
                switch(type){
                    case "m" : 
                        if(adult===1){
                            setGuest({...guest,adult : 1});
                        }else{
                            setGuest({...guest,adult : adult-1});
                        }
                    break;
                    case "p" :
                        if((adult+child+(infant))===ctx?.item.floorPlan?.guest){
                            setGuest({...guest});
                        }else{
                            setGuest({...guest,adult : adult+1});
                        }
                    break;
                }
                break;
            case "ch":
                switch(type){
                    case "m" : 
                        if(child===0){
                            setGuest({...guest,child : 1});
                        }else{
                            setGuest({...guest,child : child-1});
                        }
                    break;
                    case "p" :
                        if((adult+child+(infant))===ctx?.item.floorPlan?.guest){
                            setGuest({...guest});
                        }else{
                            setGuest({...guest,child : child+1});
                        }
                    break;
                }
                break;

            case "ifa":
                switch(type){
                    case "m" : 
                        if(infant===0){
                            setGuest({...guest,infant : 1});
                        }else{
                            setGuest({...guest,infant : infant-1});
                        }
                    break;
                    case "p" :
                        if((adult+child+(infant))===ctx?.item.floorPlan?.guest){
                            setGuest({...guest});
                        }else{
                            setGuest({...guest,infant : infant+1});
                        }
                    break;
                }
                break;
            case "pet":
                switch(type){
                    case "m" : 
                        if(pet===0){
                            setGuest({...guest,pet : 1});
                        }else{
                            setGuest({...guest,pet : pet-1});
                        }
                    break;
                    case "p" :
                        if((adult+child+(infant))===ctx?.item.floorPlan?.guest){
                            setGuest({...guest});
                        }else{
                            setGuest({...guest,pet : pet+1});
                        }
                    break;
                }
                break;
            
        }
    }

    return (
    <Box sx={{
        position : "absolute",
        backgroundColor : "white",
        right : "-0px", top : "110px",
        borderStyle: "solid",
        borderWidth : "1px",
        borderColor : "rgb(221, 221, 221)",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px",
        zIndex : 100,
        width : `${width}px`
    }}><Box
            onClick={()=>onClose(false)}
            sx={{
                position: "fixed",
                zIndex: -1,
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh'
        }}></Box>
        <Box sx={{display  : "flex", width : "100%", height : "45px", justifyContent: "space-between", mb :"14px"}}>
            <Box>
                <Typography sx={[boxtextC,{fontWeight : "bold"}]}>성인</Typography>
                <Typography sx={[boxtextC]}>만 13세 이상</Typography>
            </Box>

            <Box sx={{display : "flex", alignItems : "center", width :"50px",justifyContent: "flex-end"}}>
                <Box sx={{ml : 1, mr : 1, cursor : adult===1 ? "no-drop" : "pointer"}} onClick={()=>onChangeValue("ad","m")}>
                    <CiCircleMinus style={{fontSize:"25px", color : adult===1 ? CustomColor.whiteHover : CustomColor.black }}/>
                </Box>
                <Box sx={{ml : 1, mr : 1}}>
                    <Typography style={{fontSize  : "18px"}}>{adult}</Typography>
                </Box>
                <Box  sx={{ml : 1, mr : 1, cursor : ctx?.item.floorPlan?.guest===(adult+child+(infant)) ? "no-drop" : "pointer"}} onClick={()=>onChangeValue("ad","p")}>
                    <CiCirclePlus style={{fontSize:"25px", color : ctx?.item.floorPlan?.guest===(adult+child+(infant)) ? CustomColor.whiteHover : CustomColor.black }}/>
                </Box>
            </Box>

        </Box>

        <Box sx={{display  : "flex", width : "100%", height : "45px", justifyContent: "space-between", mb :"14px"}}>
            <Box>
                <Typography sx={[boxtextC,{fontWeight : "bold"}]}>어린이</Typography>
                <Typography sx={[boxtextC]}>만 2~12세</Typography>
            </Box>

            <Box sx={{display : "flex", alignItems : "center", width :"50px",justifyContent: "flex-end"}}>
                <Box sx={{ml : 1, mr : 1, cursor : child===0 ? "no-drop" : "pointer"}} onClick={()=>onChangeValue("ch","m")}>
                    <CiCircleMinus style={{fontSize:"25px", color : child===0 ? CustomColor.whiteHover : CustomColor.black }}/>
                </Box>
                <Box sx={{ml : 1, mr : 1}}>
                    <Typography style={{fontSize  : "18px"}}>{child}</Typography>
                </Box>
                <Box  sx={{ml : 1, mr : 1, cursor : ctx?.item.floorPlan?.guest===(adult+child+(infant)) ? "no-drop" : "pointer"}} onClick={()=>onChangeValue("ch","p")}>
                    <CiCirclePlus style={{fontSize:"25px", color : ctx?.item.floorPlan?.guest===(adult+child+(infant)) ? CustomColor.whiteHover : CustomColor.black }}/>
                </Box>
            </Box>

        </Box>

        <Box sx={{display  : "flex", width : "100%", height : "45px", justifyContent: "space-between", mb :"14px"}}>
            <Box>
                <Typography sx={[boxtextC,{fontWeight : "bold"}]}>유아</Typography>
                <Typography sx={[boxtextC]}>만 2세 미만</Typography>
            </Box>

            <Box sx={{display : "flex", alignItems : "center", width :"50px",justifyContent: "flex-end"}}>
                <Box sx={{ml : 1, mr : 1, cursor : infant===0 ? "no-drop" : "pointer"}} onClick={()=>onChangeValue("ifa","m")}>
                    <CiCircleMinus style={{fontSize:"25px", color : infant===0 ? CustomColor.whiteHover : CustomColor.black }}/>
                </Box>
                <Box sx={{ml : 1, mr : 1}}>
                    <Typography style={{fontSize  : "18px"}}>{infant}</Typography>
                </Box>
                <Box  sx={{ml : 1, mr : 1, cursor : ctx?.item.floorPlan?.guest===(adult+child+(infant)) ? "no-drop" : "pointer"}} onClick={()=>onChangeValue("ifa","p")}>
                    <CiCirclePlus style={{fontSize:"25px", color : ctx?.item.floorPlan?.guest===(adult+child+(infant)) ? CustomColor.whiteHover : CustomColor.black }}/>
                </Box>
            </Box>

        </Box>

        <Box sx={{display  : "flex", width : "100%", height : "45px", justifyContent: "space-between", mb :"14px"}}>
            <Box>
                <Typography sx={[boxtextC,{fontWeight : "bold"}]}>반려동물</Typography>
                <Typography sx={[boxtextT]}>보조동물을 동반하시나요?</Typography>
            </Box>

            <Box sx={{display : "flex", alignItems : "center", width :"50px",justifyContent: "flex-end"}}>
                <Box sx={{ml : 1, mr : 1, cursor : pet===0 ? "no-drop" : "pointer"}} onClick={()=>onChangeValue("pet","m")}>
                    <CiCircleMinus style={{fontSize:"25px", color : pet===0 ? CustomColor.whiteHover : CustomColor.black }}/>
                </Box>
                <Box sx={{ml : 1, mr : 1}}>
                    <Typography style={{fontSize  : "18px"}}>{pet}</Typography>
                </Box>
                <Box  sx={{ml : 1, mr : 1, cursor : ctx?.item.floorPlan?.guest===(adult+child+(infant)) ? "no-drop" : "pointer"}} onClick={()=>onChangeValue("pet","p")}>
                    <CiCirclePlus style={{fontSize:"25px", color : ctx?.item.floorPlan?.guest===(adult+child+(infant)) ? CustomColor.whiteHover : CustomColor.black }}/>
                </Box>
            </Box>

        </Box>

        <Box  sx={{display  : "flex", width : "100%", justifyContent: "space-between", mb :"14px"}}>
            <Typography sx={[boxtextT]}>이 숙소의 최대 숙박 인원은 {ctx?.item.floorPlan?.guest}명(유아 포함)입니다. 반려동물을 n마리 이상 동반하는 경우, 호스트에게 알려주세요.</Typography>
        </Box>


        <Box>
            <Button onClick={()=>onClose(false)} sx={[{width :"100%",backgroundColor:`black`, color : "white"},{"&:hover": {backgroundColor : "black", color : "white"}}]}>
                닫기
            </Button>
        </Box>
    </Box>

    );
}

export default RoomBookBoxGuestDialog;