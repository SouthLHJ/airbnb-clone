import {Dispatch,SetStateAction,useState,useEffect} from "react"

import {Box,Typography} from "@mui/material"
import { CustomColor } from "../../../interfaces/setting/color";

type Props = {
    safety: string[],
    setSafety: Dispatch<SetStateAction<string[]>>
}
function AmenitiesSafety({safety,setSafety}:Props) {

    const [ani, setAni] = useState<string>();

    useEffect(()=>{
        const timeId = setTimeout(()=>{
            setAni(undefined);
        },1000)
        return ()=>{
            // console.log(timerId + "...canceled")
            // 강제종료 타임아웃
            clearTimeout(timeId);
        }
    },[ani])
    // console.log(ani)
    //func
    const onAnimation = (type : string)=>{
        setAni(type);
    }

    const onSelect = (type : string)=>{
        if(safety.includes(type)){
            const spe = safety.filter((one)=>{
                return type !== one
            })
            setSafety(spe)
        }else{
            const spe = [...safety, type];
            setSafety(spe)
        }
    }

    return (
        <Box sx={{display :"flex", flexDirection:"column", alignItems : "center", width :"100%"  }}>
            <Box  sx={{display  : "flex", justifyContent :"flex-start", width : "95%",mt:3, mb : 3}}>
                <Typography fontWeight={"bold"} style={{fontSize : "18px"}}>다음과 같은 안전 관련 물품이 있나요?</Typography>
            </Box>
            <Box sx={{display  : "flex", flexWrap : "wrap", justifyContent :"flex-start", width : "95%", gap : "15px 2%"}}>
                <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: safety.includes("fire-alarm") ? CustomColor.black : CustomColor.whiteHover, borderWidth : safety.includes("fire-alarm") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("fire-alarm")}} onClick={()=>{onSelect("fire-alarm")}}>
                    <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                        <img src={ani ==="fire-alarm"? "/amenities/fire-alarm.gif" : "/amenities/fire-alarm.png"} style={{width : ani ==="fire-alarm"? "40px":"30px",height : ani ==="fire-alarm"? "40px":"30px"}}/>
                    </Box>
                    <Box sx={{mt : 1}}>
                        <Typography fontWeight={"bold"}>화재 경보기</Typography>
                    </Box>
                </Box>

                <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: safety.includes("first-aid-kit") ? CustomColor.black : CustomColor.whiteHover, borderWidth : safety.includes("first-aid-kit") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("first-aid-kit")}} onClick={()=>{onSelect("first-aid-kit")}}>
                    <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                        <img src={ani ==="first-aid-kit"? "/amenities/first-aid-kit.gif" : "/amenities/first-aid-kit.png"} style={{width : ani ==="first-aid-kit"? "40px":"30px",height : ani ==="first-aid-kit"? "40px":"30px"}}/>
                    </Box>
                    <Box sx={{mt : 1}}>
                        <Typography fontWeight={"bold"}>구급 상자</Typography>
                    </Box>
                </Box>

                <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: safety.includes("fire-extinguisher") ? CustomColor.black : CustomColor.whiteHover, borderWidth : safety.includes("fire-extinguisher") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("fire-extinguisher")}} onClick={()=>{onSelect("fire-extinguisher")}}>
                    <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                        <img src={ani ==="fire-extinguisher"? "/amenities/fire-extinguisher.gif" : "/amenities/fire-extinguisher.png"} style={{width : ani ==="fire-extinguisher"? "40px":"30px",height : ani ==="fire-extinguisher"? "40px":"30px"}}/>
                    </Box>
                    <Box sx={{mt : 1}}>
                        <Typography fontWeight={"bold"}>소화기</Typography>
                    </Box>
                </Box>

                <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: safety.includes("lock") ? CustomColor.black : CustomColor.whiteHover, borderWidth : safety.includes("lock") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("lock")}} onClick={()=>{onSelect("lock")}}>
                    <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                        <img src={ani ==="lock"? "/amenities/lock.gif" : "/amenities/lock.png"} style={{width : ani ==="lock"? "40px":"30px",height : ani ==="lock"? "40px":"30px"}}/>
                    </Box>
                    <Box sx={{mt : 1}}>
                        <Typography fontWeight={"bold"}>침실문 잠금장치</Typography>
                    </Box>
                </Box>

                <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: safety.includes("carbon-monoxide-alarm") ? CustomColor.black : CustomColor.whiteHover, borderWidth : safety.includes("carbon-monoxide-alarm") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("carbon-monoxide-alarm")}} onClick={()=>{onSelect("carbon-monoxide-alarm")}}>
                    <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                        <img src={ani ==="carbon-monoxide-alarm"? "/amenities/carbon-monoxide-alarm.gif" : "/amenities/carbon-monoxide-alarm.png"} style={{width : ani ==="carbon-monoxide-alarm"? "40px":"30px",height : ani ==="carbon-monoxide-alarm"? "40px":"30px"}}/>
                    </Box>
                    <Box sx={{mt : 1}}>
                        <Typography fontWeight={"bold"}>일산화탄소 경보기</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
      );
}

export default AmenitiesSafety;