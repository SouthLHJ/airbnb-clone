import {Dispatch,SetStateAction,useState,useEffect,useRef,DragEventHandler,ChangeEventHandler,DragEvent} from "react"

import {Box,Typography} from "@mui/material"
import {MdOutlinePhotoLibrary} from "react-icons/md"
import { CustomColor } from "../../../interfaces/setting/color";
import { usePhotosDispatch, usePhotosState } from "../../../contexts/photos";


function PhotoEmpty() {
    const photo = usePhotosState();
    const dispatch = usePhotosDispatch();

    const ref = useRef<HTMLInputElement>(null);

    const [drag, setDrag] = useState<DragEvent | null>(null);

    const onUploadFile = ()=>{
        ref.current?.click();
    }

    const onDropFile : DragEventHandler  = (evt)=>{
        evt.preventDefault();
        evt.stopPropagation();
        // console.log(evt.dataTransfer.files); //파일 이름
        const filelist = Array.from(evt.dataTransfer.files);
        // console.log(filelist);
        dispatch({type:"save", payload : [...photo,...filelist]})
    }

    const onSelectFile : ChangeEventHandler<HTMLInputElement> = (evt)=>{
        // console.log(evt.target.files);
        if(evt.target.files){
            const filelist = Array.from(evt.target.files);
            dispatch({type:"save", payload : [...photo,...filelist]})
        }
    }

    return (
        <Box 
            sx={{width : "100%", height : "80%", display:"flex", flexDirection :"column",alignItems : "center",justifyContent :"center",borderStyle : "dotted", borderWidth : 1, borderColor : CustomColor.blackHover, borderRadius : 3, position :"relative", zIndex :100}}
            onDragOver={(evt)=>{
                evt.preventDefault();
                evt.stopPropagation();
            }}
            onDragEnter={(evt)=>{
                setDrag(evt);
            }}
            onDragLeave={(evt)=>{
                if (evt.currentTarget.contains(evt.relatedTarget as Node)) return;
                setDrag(null);
            }}
            onDrop = {(evt)=>onDropFile(evt)}
        >
            <MdOutlinePhotoLibrary style={{fontSize: "50px"}}/>
            <Typography fontSize={"30px"} fontWeight={"bold"}>{drag ? "업로드를 하려면 사진을 끌어서 놓으세요" :"여기로 사진을 끌어다 놓으세요."}</Typography>
            <Typography>5장 이상의 사진을 선택하세요.</Typography>
            <Box sx={{position :"absolute", bottom : 50, cursor : "pointer"}} onClick={()=>{onUploadFile()}}>
                <Typography sx={{textDecoration : "underline", fontWeight : "bold", userSelect : "none"}}>기기에서 업로드</Typography>
                <input type="file" ref={ref} style={{display : "none"}} multiple accept="image/*"
                    onChange={(evt)=>{onSelectFile(evt)}}
                />
            </Box>
        </Box>
     );
}

export default PhotoEmpty;