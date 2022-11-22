import { usePhotosDispatch, usePhotosState } from "../../../contexts/photos";
import {Dispatch,SetStateAction,useState,useEffect,useRef,DragEventHandler,ChangeEventHandler,DragEvent} from "react"

import {MdOutlinePhotoLibrary} from "react-icons/md"
import {AiOutlinePlus}from "react-icons/ai"
import {Box,Typography} from "@mui/material"
import { CustomColor } from "../../../interfaces/setting/color";

function PhotoBoxPre({extra}:{extra : boolean}) {
    const photo = usePhotosState();
    const dispatch = usePhotosDispatch();

    const ref = useRef<HTMLInputElement>(null);

    const [drag, setDrag] = useState<DragEvent | null>(null);

    useEffect(()=>{
       
    },[])

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
            sx={{width : "100%", height : "100%",display : "flex",flexDirection:"column",justifyContent:"center", alignItems : "center"}}
            onDragOver={(evt)=>{
                evt.preventDefault();
                evt.stopPropagation();
            }}
            onDragEnter={(evt)=>{
                setDrag(evt);
            }}
            onDragLeave={(evt)=>{
                if(evt === drag){ 
                    setDrag(null);
                }
            }}
            onDrop = {(evt)=>onDropFile(evt)}
            onClick={()=>{ref.current?.click()}}
        >
            <input type="file" ref={ref} style={{display : "none"}} multiple accept="image/*"
                onChange={(evt)=>{onSelectFile(evt)}}
            />
            {
                extra ?
                <MdOutlinePhotoLibrary fontSize={"50px"}/>
                :
                <>
                    <AiOutlinePlus fontSize={"50px"}/>
                    <Typography>추가</Typography>
                </>

            }
        </Box>
    );
}

export default PhotoBoxPre;