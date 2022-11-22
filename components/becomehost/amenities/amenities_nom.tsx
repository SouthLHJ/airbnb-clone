import {Dispatch,SetStateAction,useState,useEffect} from "react"

import {Box,Typography} from "@mui/material"
import { CustomColor } from "../../../interfaces/setting/color";

type Props = {
    nomal: string[],
    setNomal: Dispatch<SetStateAction<string[]>>
}



function AmenitiesNomal({nomal, setNomal}:Props) {

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
        if(nomal.includes(type)){
            const nom = nomal.filter((one)=>{
                return type !== one
            })
            setNomal(nom)
        }else{
            const nom = [...nomal, type];
            setNomal(nom)
        }
    }

    return (
        <Box sx={{display :"flex", flexDirection:"column", alignItems : "center", width :"100%" }}>
            <Box  sx={{display  : "flex", justifyContent :"flex-start", width : "95%", mb : 3}}>
                <Typography color={CustomColor.blackHover}>여기에 추가하려는 편의시설이 보이지 않더라도 걱정하지 마세요! 숙소를 등록한 후에 편의시설을 추가할 수 있습니다.</Typography>
            </Box>
            <Box sx={{display  : "flex", flexDirection :"column", alignItems :"center", width : "95%"}}>

                <Box sx={{display  : "flex", flexWrap : "wrap", justifyContent :"flex-start", width : "100%", gap : "15px 2%"}}>
                    <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: nomal.includes("wifi") ? CustomColor.black : CustomColor.whiteHover, borderWidth : nomal.includes("wifi") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("wifi")}} onClick={()=>{onSelect("wifi")}}>
                        <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                            <img src={ani ==="wifi"? "/amenities/wifi.gif" : "/amenities/wifi.png"} style={{width : ani ==="wifi"? "40px":"30px",height : ani ==="wifi"? "40px":"30px"}}/>
                        </Box>
                        <Box sx={{mt : 1}}>
                            <Typography fontWeight={"bold"}>무선인터넷</Typography>
                        </Box>
                    </Box>
                    <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: nomal.includes("TV") ? CustomColor.black : CustomColor.whiteHover, borderWidth : nomal.includes("TV") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("TV")}} onClick={()=>{onSelect("TV")}}>
                        <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                            <img src={ani ==="TV"? "/amenities/TV.gif" : "/amenities/TV.png"} style={{width : ani ==="TV"? "40px":"30px",height : ani ==="TV"? "40px":"30px"}}/>
                        </Box>
                        <Box sx={{mt : 1}}>
                            <Typography fontWeight={"bold"}>TV</Typography>
                        </Box>
                    </Box>

                    <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: nomal.includes("kitchen") ? CustomColor.black : CustomColor.whiteHover, borderWidth : nomal.includes("kitchen") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("kitchen")}} onClick={()=>{onSelect("kitchen")}}>
                        <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                            <img src={ani ==="kitchen"? "/amenities/kitchen.gif" : "/amenities/kitchen.png"} style={{width : ani ==="kitchen"? "40px":"30px",height : ani ==="kitchen"? "40px":"30px"}}/>
                        </Box>
                        <Box sx={{mt : 1}}>
                            <Typography fontWeight={"bold"}>주방</Typography>
                        </Box>
                    </Box>

                    <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: nomal.includes("laundry") ? CustomColor.black : CustomColor.whiteHover, borderWidth : nomal.includes("laundry") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("laundry")}} onClick={()=>{onSelect("laundry")}}>
                        <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                            <img src={ani ==="laundry"? "/amenities/laundry.gif" : "/amenities/laundry.png"} style={{width : ani ==="laundry"? "40px":"30px",height : ani ==="laundry"? "40px":"30px"}}/>
                        </Box>
                        <Box sx={{mt : 1}}>
                            <Typography fontWeight={"bold"}>세탁</Typography>
                        </Box>
                    </Box>

                    <Box sx={[{maxHeight: "112px",borderStyle : "solid",borderColor: nomal.includes("parking") ? CustomColor.black : CustomColor.whiteHover, borderWidth : nomal.includes("parking") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("parking")}} onClick={()=>{onSelect("parking")}}>
                        <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                            <img src={ani ==="parking"? "/amenities/parking.gif" : "/amenities/parking.png"} style={{width : ani ==="parking"? "40px":"30px",height : ani ==="parking"? "40px":"30px"}}/>
                        </Box>
                        <Box sx={{mt : 1}}>
                            <Typography fontWeight={"bold"}>무료 주차</Typography>
                        </Box>
                    </Box>

                    <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: nomal.includes("parking-unfree") ? CustomColor.black : CustomColor.whiteHover, borderWidth : nomal.includes("parking-unfree") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("parking-unfree")}} onClick={()=>{onSelect("parking-unfree")}}>
                        <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                            <img src={ani ==="parking-unfree"? "/amenities/parking-unfree.gif" : "/amenities/parking-unfree.png"} style={{width : ani ==="parking-unfree"? "40px":"30px",height : ani ==="parking-unfree"? "40px":"30px"}}/>
                        </Box>
                        <Box sx={{mt : 1}}>
                            <Typography fontWeight={"bold"}>유료 주차</Typography>
                        </Box>
                    </Box>

                    <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: nomal.includes("air-conditioner") ? CustomColor.black : CustomColor.whiteHover, borderWidth : nomal.includes("air-conditioner") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("air-conditioner")}} onClick={()=>{onSelect("air-conditioner")}}>
                        <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                            <img src={ani ==="air-conditioner"? "/amenities/air-conditioner.gif" : "/amenities/air-conditioner.png"} style={{width : ani ==="air-conditioner"? "40px":"30px",height : ani ==="air-conditioner"? "40px":"30px"}}/>
                        </Box>
                        <Box sx={{mt : 1}}>
                            <Typography fontWeight={"bold"}>에어컨</Typography>
                        </Box>
                    </Box>

                    <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: nomal.includes("desk") ? CustomColor.black : CustomColor.whiteHover, borderWidth : nomal.includes("desk") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("desk")}} onClick={()=>{onSelect("desk")}}>
                        <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                            <img src={ani ==="desk"? "/amenities/desk.gif" : "/amenities/desk.png"} style={{width : ani ==="desk"? "35px":"30px",height : ani ==="desk"? "40px":"30px"}}/>
                        </Box>
                        <Box sx={{mt : 1}}>
                            <Typography fontWeight={"bold"}>업무 전용 공간</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
      );
}

export default AmenitiesNomal;