import  dateFns,{differenceInDays,getYear,getMonth,getDate,}  from 'date-fns';
import { Box, Typography,Button,Divider } from "@mui/material";
import { useContext,useState,useRef } from "react";
import { RecommandDateContext, RoomContext } from "../../../../contexts/rooms";
import RoomBookBoxCommonPrice from './comprice';
import RoomBookBoxCleanPrice from './cleanprice';
import RoomBookBoxServicePrice from './serviceprice';

const textSt = {fontSize:"15px"}

function RoomBookBoxPrice() {
    const ctx = useContext(RoomContext);
    const dateCtx = useContext(RecommandDateContext);
    const comref = useRef<HTMLElement>(null);
    const cleanref = useRef<HTMLElement>(null);
    const serviceref = useRef<HTMLElement>(null);

    const [showcom, setShowcom] = useState<boolean>(false);
    const [showclean, setShowclean] = useState<boolean>(false);
    const [showservice, setShowservice] = useState<boolean>(false);

    const price = (ctx?.item.price!*differenceInDays(dateCtx?.date[1] as any,dateCtx?.date[0] as any))
    const cleanPirce = 53902;
    const servicePrice = Math.ceil(price*0.163);

    return (
    <Box sx={{ position : "relative"}}>
        <Box sx={{display : "flex",width : "100%", height : "20px", alignItems :"baseline", justifyContent : "space-between", mb : "24px"}}>
            <Box sx={{display : "flex",alignItems :"baseline", cursor : "pointer",}}
                onClick={()=>{setShowcom(true)}}
                ref={comref}
            >
                <Typography sx={[textSt,{textDecoration: "underline"}]}>￦ {ctx?.item.price!.toLocaleString()} x {differenceInDays(dateCtx?.date[1] as any,dateCtx?.date[0] as any)}박</Typography>
            </Box>
            <Box>
                <Typography sx={textSt}>￦{price.toLocaleString()}</Typography>
            </Box>
        </Box>

        <Box sx={{display : "flex",width : "100%",height : "20px", alignItems :"baseline", justifyContent : "space-between", mb : "24px"}}>
            <Box sx={{display : "flex",alignItems :"baseline", cursor : "pointer",}}
                onClick={()=>setShowclean(true)}
                ref={cleanref}
            >
                <Typography sx={[textSt,{textDecoration: "underline"}]}>청소비</Typography>
            </Box>
            <Box>
                <Typography sx={textSt}>￦ {cleanPirce.toLocaleString()}</Typography>
            </Box>
        </Box>

        <Box sx={{display : "flex",width : "100%",height : "20px", alignItems :"baseline", justifyContent : "space-between", mb : "24px"}}>
            <Box sx={{display : "flex",alignItems :"baseline", cursor : "pointer",}}
                onClick={()=>setShowservice(true)}
                ref={serviceref}
            >
                <Typography sx={[textSt,{textDecoration: "underline"}]}>서비스 수수료</Typography>
            </Box>
            <Box>
                <Typography sx={textSt}>￦ {servicePrice.toLocaleString()}</Typography>
            </Box>
        </Box>

        <Divider/>

        <Box sx={{display : "flex",width : "100%",height : "20px", alignItems :"baseline", justifyContent : "space-between",mt:"24px"}}>
            <Box sx={{display : "flex",alignItems :"baseline"}}>
                <Typography sx={[textSt,{fontWeight : "bold"}]}>총 합계</Typography>
            </Box>
            <Box>
                <Typography sx={textSt}>￦ {(price+cleanPirce+servicePrice).toLocaleString()}</Typography>
            </Box>
        </Box>
       
        <RoomBookBoxCommonPrice
            open={showcom}
            onClose={setShowcom}
            bottom = {4}
            right={comref?.current?.offsetWidth && 320-comref?.current?.offsetWidth}
        />
        <RoomBookBoxCleanPrice
            open={showclean}
            onClose={setShowclean}
            bottom = {3}
            right={cleanref?.current?.offsetWidth  && 320-cleanref?.current?.offsetWidth}
        />
        <RoomBookBoxServicePrice
            open={showservice}
            onClose={setShowservice}
            bottom = {2}
            right={serviceref?.current?.offsetWidth  && 320-serviceref?.current?.offsetWidth}
        />
    </Box>

    );
}

export default RoomBookBoxPrice;