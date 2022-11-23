import {Box, Typography} from "@mui/material"
import { Accommodation } from "../../interfaces/becomehost/accommodation";
import { CustomColor } from "../../interfaces/setting/color";
import {FaWonSign} from "react-icons/fa"
import { useRouter } from "next/router";
import {useRef, useState} from "react"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
type Props = {
    item : Accommodation
}

function MainPagePreviewItem({item}:Props) {
    const [imgNum, setImgNum] = useState<number>(0);
    const arrowL = useRef<HTMLElement>();
    const arrowR = useRef<HTMLElement>();
    const router = useRouter();
    //func
    const onDetail = ()=>{
        router.push(`/rooms/${item._id}`)
    }   

    return (
    <Box sx={{width:"300px",height :"350px",borderRadius : 2, boxShadow : "0 6px 16px rgba(0,0,0,0.12)", padding : 2, animation : "fadein 1s", cursor : "pointer"}}
        onClick={()=>onDetail()}
        onPointerEnter={()=>{
            if(imgNum>0){
                arrowL?.current?.style.setProperty("display","flex");
            }
            if(imgNum<5){
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
                onMouseDown={()=>{
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
                onMouseDown={()=>{
                    if(imgNum === 5 ){
                        setImgNum(5)
                    }else{
                        setImgNum(img=>img+5)
                    }}
                }
            >
                <KeyboardArrowRightIcon />
            </Box>

        </Box>
        <Box sx={{display : "flex",mt : 1}}>
            <Box flex={1} >
                <Typography>{item?.title}</Typography>
                <Typography sx={{display:"flex", alignItems : "center"}}><FaWonSign/>{item?.price} / 박</Typography>
            </Box>
            <Box>
                <Typography>신규 ★</Typography>
            </Box>
        </Box>
    </Box>
    );
}

export default MainPagePreviewItem;