import { usePhotosDispatch, usePhotosState, useUrlsDispatch } from "../../../contexts/photos";
import {Dispatch,SetStateAction,useState,useEffect, useRef,LegacyRef,MutableRefObject} from "react"
import {FaTrashAlt} from "react-icons/fa"
import {Box,Typography} from "@mui/material"
import { CustomColor } from "../../../interfaces/setting/color";
import Image from "next/image";

function PhotoBox(props:{targetF?:File,targetS?:string, main : boolean}) {
    const [base64 , setBase64] = useState<string | null>(null);
    const dispatch = usePhotosDispatch();
    const urlsdispatch = useUrlsDispatch();
    const ref = useRef<HTMLDivElement>();

    useEffect(()=>{
        if(props.targetF){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(props.targetF);
    
            fileReader.onload = (rst)=>{
                // console.log(rst.target!.result)
                setBase64(rst.target!.result as string);
            }
        }
        if(props.targetS){
            setBase64(props.targetS)
        }
    },[])


    const onDelete = ()=>{
        ref?.current?.style.setProperty("animation","fadeout 0.25s")
        setTimeout(()=>{
            if(props.targetF){
                dispatch({type : "delete",payload : props.targetF})
            }
            if(props.targetS){
                console.log(props.targetS)
                urlsdispatch({type : "delete", payload : props.targetS})
            }
        },280)
    }

    return (
        <>
       
            <Box
                sx={[{display:"flex",justifyContent : "center",alignItems :"center", width : "30px", height: "30px",position : "absolute", right : 10, top : 10, bgcolor : CustomColor.white, boxShadow :`1px 1px 1px 1px ${CustomColor.blackHover}`, borderRadius : 20, cursor : "pointer"},{"&:hover":{backgroundColor : CustomColor.whiteHover}}]}
                onClick={()=>onDelete()}
                
            >
                <FaTrashAlt/>
            </Box>
        {
            base64 &&
            <Box
                ref={ref} 
                sx={{width:"100%", height : "100%"}}
            >
                <img
                    alt={base64.slice(23,28)}    
                    src={base64}
                    
                    style={{
                        width : "100%",
                        height :"100%",
                        objectFit : "contain",
                        animation : "fadein 1s"
                    }}
                />
            </Box>
        }

        </>
    );
}

export default PhotoBox;