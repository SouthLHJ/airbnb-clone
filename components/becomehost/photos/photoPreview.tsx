import { usePhotosDispatch, usePhotosState, useUrlsState } from "../../../contexts/photos";
import {Dispatch,SetStateAction,useState,useEffect} from "react"

import {Box,Button,Typography} from "@mui/material"
import { CustomColor } from "../../../interfaces/setting/color";
import PhotoBox from "./photobox";
import PhotoBoxPre from "./photoboxPre";

function PhotoPreviews() {
    const urls = useUrlsState();
    const photo = usePhotosState();
    const dispatch = usePhotosDispatch();

    
    let empty=[];
    for(let i=0 ; i<5-(photo.length+urls.change.length);i++){
        empty.push(
            <Box key={i} sx={[{borderStyle : "dashed", width : 'calc((100% - 4%) / 2)', height :"100%", borderWidth : 1, borderColor : CustomColor.blackHover, borderRadius : 2},{"&:hover":{borderStyle : "solid", borderColor : CustomColor.black}}]}>
                <PhotoBoxPre extra={true}/>
            </Box>
        )
    }
    
    console.log(urls);

    return (
        <Box sx={{width : "100%",height : "82vh", display :"flex", flexDirection : "column", alignItems : "center",overflow : "scroll"}}>
            
            <Box sx={{width : "90%",height :"30%",mb: "20px", borderStyle :"solid", borderColor : CustomColor.whiteHover, borderWidth : 1, position : "relative"}}>
                {
                    urls.change.length !== 0 ?
                    <PhotoBox targetS={urls.change[0]} main={true}/>
                    :
                    <PhotoBox targetF={photo[0]} main={true}/>
                }
            </Box>
            <Box sx={{height : "300px",width :"90%",display :"flex", flexWrap : "wrap", gap : "8% 4%", flexDirection : "flex-start"}}>
                {
                    urls.change.length !==0 &&
                    urls.change.map((one,idx)=>{
                        if(idx>0){
                            // console.log(`${one.name}${idx}`)
                            return (
                            <Box key={one} sx={{ width : 'calc((100% - 4%) / 2)',height :"100%", borderStyle :"solid", borderColor : CustomColor.whiteHover, borderWidth : 1, position : "relative"}}>
                                <PhotoBox targetS={one} main={false}/>
                            </Box>
                            )
                        }
                    })
                }
                {
                    photo.length !==0 &&
                    photo.map((one,idx)=>{
                        if(idx>0 || urls.change.length !==0){
                            // console.log(`${one.name}${idx}`)
                            return (
                            <Box key={`${one.name}${idx}`} sx={{ width : 'calc((100% - 4%) / 2)',height :"100%", borderStyle :"solid", borderColor : CustomColor.whiteHover, borderWidth : 1, position : "relative"}}>
                                <PhotoBox targetF={one} main={false}/>
                            </Box>
                            )
                        }
                    })
                }
                {
                    empty
                }
                <Box sx={[{borderStyle : "dashed", width : 'calc((100% - 4%) / 2)',height :"100%", borderWidth : 1, borderColor : CustomColor.blackHover, borderRadius : 2},{"&:hover":{borderStyle : "solid", borderColor : CustomColor.black}}]}>
                    <PhotoBoxPre extra={false}/>
                </Box>
            </Box>
        </Box>
    );
}

export default PhotoPreviews;