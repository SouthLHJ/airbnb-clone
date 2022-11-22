import {Dispatch,SetStateAction,useState,useEffect} from "react"

import {Box,Typography} from "@mui/material"
import {MdOutlinePhotoLibrary} from "react-icons/md"
import { CustomColor } from "../../../interfaces/setting/color";
import PhotoEmpty from "./photoEmpty";
import PhotoPreviews from "./photoPreview";
import { usePhotosDispatch, usePhotosState, useUrlsState } from "../../../contexts/photos";


function BecomeHostPhotos() {
    const urls = useUrlsState();
    const photo = usePhotosState();
    const dispatch = usePhotosDispatch();
    return (
        <Box sx={{width:"100%",height :"100%", display:"flex", flexDirection :"column",alignItems : "center", animation : "fadein 1.5s"}}>
            <Box sx={{width : "90%", mb : 2}}>
                <Typography fontWeight={"bold"} style={{fontSize : "18px"}}>{photo ? "5장 이상의 사진을 선택하세요." : "숙소 등록을 시작하려면 사진 5장을 제출하셔야 합니다. 나중에 추가하거나 변경하실 수 있습니다."}</Typography>
            </Box>
            {
                photo.length === 0 && urls.change.length === 0 ?
                <PhotoEmpty/>
                :
                <PhotoPreviews/>
            }
        </Box>
      );
}

export default BecomeHostPhotos;