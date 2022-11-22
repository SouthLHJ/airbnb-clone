import {Dispatch,SetStateAction,useState,useEffect} from "react"

import {Box,Typography} from "@mui/material"
import { CustomColor } from "../../../interfaces/setting/color";

type Props = {
    special: string[] ,
    setSpecial: Dispatch<SetStateAction<string[]>>
}
function AmenitiesSpecial({special,setSpecial }:Props) {

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
        if(special.includes(type)){
            const spe = special.filter((one)=>{
                return type !== one
            })
            setSpecial(spe)
        }else{
            const spe = [...special, type];
            setSpecial(spe)
        }
    }


    return (
        <Box sx={{display :"flex", flexDirection:"column", alignItems : "center", width :"100%"  }}>
            <Box  sx={{display  : "flex", justifyContent :"flex-start", width : "95%",mt:3, mb : 3}}>
                <Typography fontWeight={"bold"} style={{fontSize : "18px"}}>특별히 내세울 만한 편의시설이 있나요?</Typography>
            </Box>
            <Box sx={{display  : "flex", flexWrap : "wrap", justifyContent :"flex-start", width : "95%", gap : "15px 2%"}}>
                <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: special.includes("swim") ? CustomColor.black : CustomColor.whiteHover, borderWidth : special.includes("swim") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("swim")}} onClick={()=>{onSelect("swim")}}>
                    <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                        <img src={ani ==="swim"? "/amenities/swim.gif" : "/amenities/swim.png"} style={{width : ani ==="swim"? "40px":"30px",height : ani ==="swim"? "40px":"30px"}}/>
                    </Box>
                    <Box sx={{mt : 1}}>
                        <Typography fontWeight={"bold"}>수영장</Typography>
                    </Box>
                </Box>
                <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: special.includes("bath") ? CustomColor.black : CustomColor.whiteHover, borderWidth : special.includes("bath") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("bath")}} onClick={()=>{onSelect("bath")}}>
                    <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                        <img src={ani ==="bath"? "/amenities/bath.gif" : "/amenities/bath.png"} style={{width : ani ==="bath"? "40px":"30px",height : ani ==="bath"? "40px":"30px"}}/>
                    </Box>
                    <Box sx={{mt : 1}}>
                        <Typography fontWeight={"bold"}>욕조</Typography>
                    </Box>
                </Box>
                <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: special.includes("patio") ? CustomColor.black : CustomColor.whiteHover, borderWidth : special.includes("patio") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("patio")}} onClick={()=>{onSelect("patio")}}>
                    <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                        <img src={ani ==="patio"? "/amenities/patio.gif" : "/amenities/patio.png"} style={{width : ani ==="patio"? "40px":"30px",height : ani ==="patio"? "40px":"30px"}}/>
                    </Box>
                    <Box sx={{mt : 1}}>
                        <Typography fontWeight={"bold"}>파티오</Typography>
                    </Box>
                </Box>
          
                
                <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: special.includes("barbecue") ? CustomColor.black : CustomColor.whiteHover, borderWidth : special.includes("barbecue") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("barbecue")}} onClick={()=>{onSelect("barbecue")}}>
                    <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                        <img src={ani ==="barbecue"? "/amenities/barbecue.gif" : "/amenities/barbecue.png"} style={{width : ani ==="barbecue"? "40px":"30px",height : ani ==="barbecue"? "40px":"30px"}}/>
                    </Box>
                    <Box sx={{mt : 1}}>
                        <Typography fontWeight={"bold"}>바베큐 그릴</Typography>
                    </Box>
                </Box>

                <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: special.includes("outdoor-table") ? CustomColor.black : CustomColor.whiteHover, borderWidth : special.includes("outdoor-table") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("outdoor-table")}} onClick={()=>{onSelect("outdoor-table")}}>
                    <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                        <img src={ani ==="outdoor-table"? "/amenities/outdoor-table.gif" : "/amenities/outdoor-table.png"} style={{width : ani ==="outdoor-table"? "40px":"30px",height : ani ==="outdoor-table"? "40px":"30px"}}/>
                    </Box>
                    <Box sx={{mt : 1}}>
                        <Typography fontWeight={"bold"}>야외 식사 공간</Typography>
                    </Box>
                </Box>

                <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: special.includes("brazier") ? CustomColor.black : CustomColor.whiteHover, borderWidth : special.includes("brazier") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("brazier")}} onClick={()=>{onSelect("brazier")}}>
                    <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                        <img src={ani ==="brazier"? "/amenities/brazier.gif" : "/amenities/brazier.png"} style={{width : ani ==="brazier"? "40px":"30px",height : ani ==="brazier"? "40px":"30px"}}/>
                    </Box>
                    <Box sx={{mt : 1}}>
                        <Typography fontWeight={"bold"}>화로</Typography>
                    </Box>
                </Box>

                <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: special.includes("billiards") ? CustomColor.black : CustomColor.whiteHover, borderWidth : special.includes("billiards") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("billiards")}} onClick={()=>{onSelect("billiards")}}>
                    <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                        <img src={ani ==="billiards"? "/amenities/billiards.gif" : "/amenities/billiards.png"} style={{width : ani ==="billiards"? "40px":"30px",height : ani ==="billiards"? "40px":"30px"}}/>
                    </Box>
                    <Box sx={{mt : 1}}>
                        <Typography fontWeight={"bold"}>당구대</Typography>
                    </Box>
                </Box>

                <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: special.includes("fireplace") ? CustomColor.black : CustomColor.whiteHover, borderWidth : special.includes("fireplace") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("fireplace")}} onClick={()=>{onSelect("fireplace")}}>
                    <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                        <img src={ani ==="fireplace"? "/amenities/fireplace.gif" : "/amenities/fireplace.png"} style={{width : ani ==="fireplace"? "40px":"30px",height : ani ==="fireplace"? "40px":"30px"}}/>
                    </Box>
                    <Box sx={{mt : 1}}>
                        <Typography fontWeight={"bold"}>벽난로</Typography>
                    </Box>
                </Box>

                
                <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: special.includes("piano") ? CustomColor.black : CustomColor.whiteHover, borderWidth : special.includes("piano") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("piano")}} onClick={()=>{onSelect("piano")}}>
                    <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                        <img src={ani ==="piano"? "/amenities/piano.gif" : "/amenities/piano.png"} style={{width : ani ==="piano"? "40px":"30px",height : ani ==="piano"? "40px":"30px"}}/>
                    </Box>
                    <Box sx={{mt : 1}}>
                        <Typography fontWeight={"bold"}>피아노</Typography>
                    </Box>
                </Box>

                <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: special.includes("fitness") ? CustomColor.black : CustomColor.whiteHover, borderWidth : special.includes("fitness") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("fitness")}} onClick={()=>{onSelect("fitness")}}>
                    <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                        <img src={ani ==="fitness"? "/amenities/fitness.gif" : "/amenities/fitness.png"} style={{width : ani ==="fitness"? "40px":"30px",height : ani ==="fitness"? "40px":"30px"}}/>
                    </Box>
                    <Box sx={{mt : 1}}>
                        <Typography fontWeight={"bold"}>운동 기구</Typography>
                    </Box>
                </Box>

                <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: special.includes("lake") ? CustomColor.black : CustomColor.whiteHover, borderWidth : special.includes("lake") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("lake")}} onClick={()=>{onSelect("lake")}}>
                    <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                        <img src={ani ==="lake"? "/amenities/lake.gif" : "/amenities/lake.png"} style={{width : ani ==="lake"? "40px":"30px",height : ani ==="lake"? "40px":"30px"}}/>
                    </Box>
                    <Box sx={{mt : 1}}>
                        <Typography fontWeight={"bold"}>호수로 연결됨</Typography>
                    </Box>
                </Box>
                <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: special.includes("beach") ? CustomColor.black : CustomColor.whiteHover, borderWidth : special.includes("beach") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("beach")}} onClick={()=>{onSelect("beach")}}>
                    <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                        <img src={ani ==="beach"? "/amenities/beach.gif" : "/amenities/beach.png"} style={{width : ani ==="beach"? "40px":"30px",height : ani ==="beach"? "40px":"30px"}}/>
                    </Box>
                    <Box sx={{mt : 1}}>
                        <Typography fontWeight={"bold"}>해변과 인접</Typography>
                    </Box>
                </Box>

                <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: special.includes("ski") ? CustomColor.black : CustomColor.whiteHover, borderWidth : special.includes("ski") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("ski")}} onClick={()=>{onSelect("ski")}}>
                    <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                        <img src={ani ==="ski"? "/amenities/ski.gif" : "/amenities/ski.png"} style={{width : ani ==="ski"? "40px":"30px",height : ani ==="ski"? "40px":"30px"}}/>
                    </Box>
                    <Box sx={{mt : 1}}>
                        <Typography fontWeight={"bold"}>스키를 탄채로 출입 가능</Typography>
                    </Box>
                </Box>

                <Box sx={[{maxHeight: "112px",borderStyle : "solid", borderColor: special.includes("outdoor-shower") ? CustomColor.black : CustomColor.whiteHover, borderWidth : special.includes("outdoor-shower") ? 3: 1, borderRadius : 3, padding : 3, width : "calc((100% - 4%) / 3)"},{"&:hover" : {borderWidth :3, borderColor : CustomColor.black}}]} onMouseDown={()=>{onAnimation("outdoor-shower")}} onClick={()=>{onSelect("outdoor-shower")}}>
                    <Box style={{overflow: "hidden", width : "30px", height : "30px", display :"flex", justifyContent :"center", alignItems : "center"}}>
                        <img src={ani ==="outdoor-shower"? "/amenities/outdoor-shower.gif" : "/amenities/outdoor-shower.png"} style={{width : ani ==="outdoor-shower"? "40px":"30px",height : ani ==="outdoor-shower"? "40px":"30px"}}/>
                    </Box>
                    <Box sx={{mt : 1}}>
                        <Typography fontWeight={"bold"}>야외 샤워 시설</Typography>
                    </Box>
                </Box>
                
            </Box>
        </Box>
      );
}

export default AmenitiesSpecial;