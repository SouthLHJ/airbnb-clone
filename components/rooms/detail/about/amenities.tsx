import { Avatar, Box, Typography } from "@mui/material";
import { useContext, useRef } from "react";
import { RoomContext } from "../../../../pages/rooms/[itemId]";
import {BsKey,BsCalendarDate}from "react-icons/bs"
import {IoMedalOutline}from "react-icons/io5"
import { CustomColor } from "../../../../interfaces/setting/color";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useDirAmenityState } from "../../../../contexts/amenities";


const displayRow = {display: "flex", flexDirection : "row"};
const displayColumn = {display: "flex", flexDirection : "column"};

function RoomAboutAmenities() {

    const ctx = useContext(RoomContext);
    const dir = useDirAmenityState();

    if(!dir){
        return null;
    }

    // console.log(dir);
    return (
        <Box flex={1}>
            <Box sx={{mb : "24px"}}>
                <Typography  fontSize={"20px"} style={{fontWeight :"bold"}}>숙소 편의 시설</Typography>
            </Box>
            <Box sx={[displayRow,{alignItems :"flex-start", flexWrap :"wrap"}]}>
            {
                ctx?.item?.amenities?.convenient.map(one=>{
                    const text = dir.find(elm=>elm.amenitiy===one)
                    return(
                        <Box key={one} sx={{display : "flex", alignItems :"center", width :"50%", mb : "14px"}}>
                            <img
                                src={`/amenities/${one}.png`}
                                style={{width : "20px",height :"20px" , marginRight  :"20px"}}
                            />
                            <Typography>{text!.ko}</Typography>
                        </Box>    
                    )
                })
            }
            {
                ctx?.item?.amenities?.specialConvenient.map(one=>{
                    const text = dir.find(elm=>elm.amenitiy===one)
                    return(
                        <Box key={one} sx={{display : "flex", alignItems :"center", width :"50%", mb : "14px"}}>
                            <img
                                src={`/amenities/${one}.png`}
                                style={{width : "20px",height :"20px" , marginRight  :"20px"}}
                            />
                            <Typography>{text!.ko}</Typography>
                        </Box>    
                    )
                })
            }
            {
                ctx?.item?.amenities?.safeItem.map(one=>{
                    const text = dir.find(elm=>elm.amenitiy===one)
                    return(
                        <Box key={one} sx={{display : "flex", alignItems :"center", width :"50%", mb : "14px"}}>
                            <img
                                src={`/amenities/${one}.png`}
                                style={{width : "20px",height :"20px" , marginRight  :"20px"}}
                            />
                            <Typography>{text!.ko}</Typography>
                        </Box>    
                    )
                })
            }

            </Box>
        </Box>
);
}

export default RoomAboutAmenities;