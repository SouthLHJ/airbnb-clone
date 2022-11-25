import {Box, Typography} from "@mui/material"
import { Accommodation } from "../../interfaces/becomehost/accommodation";
import { CustomColor } from "../../interfaces/setting/color";
import {BsDot}from "react-icons/bs"
import { useRouter } from "next/router";
import {useContext, useRef, useState} from "react"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { AppContext } from "../../pages/_app";
type Props = {
    item : Accommodation
}

function MainPagePreviewItem({item}:Props) {
    const loading = useContext(AppContext);
    const [imgNum, setImgNum] = useState<number>(0);
    const arrowL = useRef<HTMLElement>();
    const arrowR = useRef<HTMLElement>();
    const router = useRouter();
    //func
    const onDetail = ()=>{
        loading?.ready();
        router.push(`/rooms/${item._id}`)
    }   
    // console.log(imgNum);
    return (
    <Box sx={{width:"300px",height :"350px",borderRadius : 2, boxShadow : "0 6px 16px rgba(0,0,0,0.12)", padding : 2, animation : "fadein 1s", cursor : "pointer"}}
        onClick={()=>onDetail()}
        onPointerEnter={()=>{
            if(imgNum>0){
                arrowL?.current?.style.setProperty("display","flex");
            }
            if(imgNum<4){
                arrowR?.current?.style.setProperty("display","flex")
            }
        }}
        onPointerLeave={()=>{
            arrowL?.current?.style.setProperty("display","none");
            arrowR?.current?.style.setProperty("display","none")
        }}
    >
        <Box sx={[{width : "100%", height : "250px", display : "flex", alignItems :"center", justifyContent :"center", position : "relative"}]}>
            <Box sx={[{position :"absolute",  left : 10, display : "none", width : "30px", height :"30px", borderRadius : 10, backgroundColor : "rgba(255,255,255,0.8)", zIndex : 10000, justifyContent : "center", alignItems : "center"}]}
                ref={arrowL}
                onClick={(evt)=>{
                    evt.stopPropagation()
                    if(imgNum === 0 ){
                        setImgNum(0)
                    }else{
                        setImgNum(img=>img-1)
                    }
                }}
            >
                <KeyboardArrowLeftIcon />
            </Box>
            <img
                alt={"headerimg"}    
                src={item.photos![imgNum]}
                style={{
                    width : "100%",
                    height :"100%",
                    objectFit : "cover",
                    borderRadius : "10px",
                    borderStyle :"solid"  ,
                    borderWidth  : "1px",   
                    borderColor : CustomColor.whiteHover
                }}
            />
            <Box sx={[{position :"absolute",  right : 10, display : "none", width : "30px", height :"30px", borderRadius : 10, backgroundColor : "rgba(255,255,255,0.8)", zIndex : 10000, justifyContent : "center", alignItems : "center"}]}
                ref={arrowR}
                onClick={(evt)=>{
                    evt.stopPropagation()
                    if(imgNum === 4 ){
                        setImgNum(4)
                    }else{
                        setImgNum(img=>img+1)
                    }}
                }
            >
                <KeyboardArrowRightIcon />
            </Box>

            <Box sx={{position : "absolute", bottom : 10, display:"flex"}}>
                <Typography fontSize={"20px"} color={imgNum===0 ? CustomColor.white : whitehover}>●</Typography>
                <Typography fontSize={"20px"} color={imgNum===1 ? CustomColor.white : whitehover}>●</Typography>
                <Typography fontSize={"20px"} color={imgNum===2 ? CustomColor.white : whitehover}>●</Typography>
                <Typography fontSize={"20px"} color={imgNum===3 ? CustomColor.white : whitehover}>●</Typography>
                <Typography fontSize={"20px"} color={imgNum===4 ? CustomColor.white : whitehover}>●</Typography>
            </Box>

        </Box>
        <Box sx={{display : "flex",mt : 1}}>
            <Box flex={1} >
                <Typography>{item?.title}</Typography>
                <Typography sx={{display:"flex", alignItems : "center"}}>￦{item?.price?.toLocaleString()} / 박</Typography>
            </Box>
            <Box>
                <Typography>신규 ★</Typography>
            </Box>
        </Box>
    </Box>
    );
}

export default MainPagePreviewItem;

//css
const whitehover ="rgba(225,225,225,0.8)"