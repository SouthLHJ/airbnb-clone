import { Box, Typography } from "@mui/material";
import {CiCircleMinus, CiCirclePlus} from "react-icons/ci"
import {Dispatch,SetStateAction}from "react"
import { CustomColor } from "../../interfaces/setting/color";

type Props = {
    guestn: number,
    setGuestn: Dispatch<SetStateAction<number>>,
    bedn: number,
    setBedn: Dispatch<SetStateAction<number>>,
    bathn: number,
    setBathn: Dispatch<SetStateAction<number>>,
}

const fontSize = "30px";



function BecomeHostFloorPlan({guestn, setGuestn,bedn, setBedn,bathn, setBathn}:Props) {

    const onChangeValue = (title : "gu"|"bed"|"bath", type : "p"|"m" )=>{
        switch(title){
            case "gu":
                switch(type){
                    case "m" : 
                        if(guestn===0){
                            setGuestn(0);
                        }else{
                            setGuestn(current => current-1);
                        }
                    break;
                    case "p" :
                        if(guestn===16){
                            setGuestn(16);
                        }else{
                            setGuestn(current => current+1);
                        }
                    break;
                }
                break;
            case "bed":
                switch(type){
                    case "m" : 
                        if(bedn===0){
                            setBedn(0);
                        }else{
                            setBedn(current => current-1);
                        }
                    break;
                    case "p" :
                        if(bedn===50){
                            setBedn(50);
                        }else{
                            setBedn(current => current+1);
                        }
                    break;
                }
                break;

            case "bath":
                switch(type){
                    case "m" : 
                        if(bathn===0){
                            setBathn(0);
                        }else{
                            setBathn(current => current-1);
                        }
                    break;
                    case "p" :
                        if(bathn===50){
                            setBathn(50);
                        }else{
                            setBathn(current => current+1);
                        }
                    break;
                }
                break;
        }
    }

    return (
    <>
        <Box sx={{width : "100%", display : "flex", justifyContent :"center", mb : 4, mt : 4, userSelect: "none"}}>
            <Box sx={{width : "40%", display : "flex", justifyContent :"flex-start"}}>
                <Typography fontWeight={"bold"} fontSize={fontSize}>게스트</Typography>
            </Box>
            <Box sx={{display : "flex", alignItems : "center"}}>
                <Box sx={{ml : 1, mr : 1, cursor : guestn===0 ? "no-drop" : "pointer"}} onClick={()=>onChangeValue("gu","m")}>
                    <CiCircleMinus style={{fontSize  :fontSize, color : guestn===0 ? CustomColor.whiteHover : CustomColor.black }}/>
                </Box>
                <Box sx={{ml : 1, mr : 1}}>
                    <Typography style={{fontSize  : "18px"}}>{guestn}</Typography>
                </Box>
                <Box  sx={{ml : 1, mr : 1, cursor : guestn===16 ? "no-drop" : "pointer"}} onClick={()=>onChangeValue("gu","p")}>
                    <CiCirclePlus style={{fontSize  :fontSize, color : guestn===16 ? CustomColor.whiteHover : CustomColor.black }}/>
                </Box>
            </Box>
        </Box>

        <Box sx={{width : "100%", display : "flex", justifyContent :"center", mb : 4, mt : 4, userSelect: "none"}}>
            <Box sx={{width : "40%", display : "flex", justifyContent :"flex-start"}}>
                <Typography fontWeight={"bold"} fontSize={fontSize}>침대</Typography>
            </Box>
            <Box sx={{display : "flex", alignItems : "center"}}>
                <Box sx={{ml : 1, mr : 1, cursor : bedn===0 ? "no-drop" : "pointer"}} onClick={()=>onChangeValue("bed","m")}>
                    <CiCircleMinus style={{fontSize  :fontSize, color : bedn===0 ? CustomColor.whiteHover : CustomColor.black }}/>
                </Box>
                <Box sx={{ml : 1, mr : 1}}>
                    <Typography style={{fontSize  : "18px"}}>{bedn}</Typography>
                </Box>
                <Box  sx={{ml : 1, mr : 1, cursor : bedn===16 ? "no-drop" : "pointer"}} onClick={()=>onChangeValue("bed","p")}>
                    <CiCirclePlus style={{fontSize  :fontSize, color : bedn===50 ? CustomColor.whiteHover : CustomColor.black }}/>
                </Box>
            </Box>
        </Box>

        <Box sx={{width : "100%", display : "flex", justifyContent :"center", mb : 4, mt : 4, userSelect: "none"}}>
            <Box sx={{width : "40%", display : "flex", justifyContent :"flex-start"}}>
                <Typography fontWeight={"bold"} fontSize={fontSize}>욕실</Typography>
            </Box>
            <Box sx={{display : "flex", alignItems : "center"}}>
                <Box sx={{ml : 1, mr : 1, cursor : bathn===0 ? "no-drop" : "pointer"}} onClick={()=>onChangeValue("bath","m")}>
                    <CiCircleMinus style={{fontSize  :fontSize, color : bathn===0 ? CustomColor.whiteHover : CustomColor.black }}/>
                </Box>
                <Box sx={{ml : 1, mr : 1}}>
                    <Typography style={{fontSize  : "18px"}}>{bathn}</Typography>
                </Box>
                <Box  sx={{ml : 1, mr : 1, cursor : bathn===16 ? "no-drop" : "pointer"}} onClick={()=>onChangeValue("bath","p")}>
                    <CiCirclePlus style={{fontSize  :fontSize, color : bathn===50 ? CustomColor.whiteHover : CustomColor.black }}/>
                </Box>
            </Box>
        </Box>  
        
    </>
    );
}

export default BecomeHostFloorPlan;