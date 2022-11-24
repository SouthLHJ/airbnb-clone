import  dateFns,{differenceInDays,getYear,getMonth,getDate,}  from 'date-fns';
import { Box, Typography,Button } from "@mui/material";
import { useContext,useState,useRef } from "react";
import { RecommandDateContext, RoomContext } from "../../../../pages/rooms/[itemId]";
import RoomBookBoxCommonPrice from './comprice';
import RoomBookBoxCleanPrice from './cleanprice';
import RoomBookBoxServicePrice from './serviceprice';

const textSt = {fontSize:"15px"}

function RoomBookBoxPrice() {
    const ctx = useContext(RoomContext);
    const dateCtx = useContext(RecommandDateContext);
    const ref = useRef<HTMLElement>(null);

    const [showcom, setShowcom] = useState<boolean>(false);
    const [showclean, setShowclean] = useState<boolean>(false);
    const [showservice, setShowservice] = useState<boolean>(false);

    const price = (ctx?.item.price!*differenceInDays(dateCtx?.date[1] as any,dateCtx?.date[0] as any))

    return (
    <Box sx={{ position : "relative"}}>
        <Box sx={{display : "flex",width : "100%", height : "20px", alignItems :"baseline", justifyContent : "space-between", mb : "24px"}}>
            <Box sx={{display : "flex",alignItems :"baseline", cursor : "pointer",}}
                onClick={()=>{setShowcom(true)}}
                
            >
                <Typography sx={[textSt,{textDecoration: "underline"}]}>￦ {ctx?.item.price!.toLocaleString()} x {differenceInDays(dateCtx?.date[1] as any,dateCtx?.date[0] as any)}박</Typography>
            </Box>
            <Box>
                <Typography sx={textSt}>￦{price.toLocaleString()}</Typography>
            </Box>
        </Box>

        <Box sx={{display : "flex",width : "100%",height : "20px", alignItems :"baseline", justifyContent : "space-between", mb : "24px"}}
                onClick={()=>setShowclean(true)}
        >
            <Box sx={{display : "flex",alignItems :"baseline", cursor : "pointer",}}>
                <Typography sx={[textSt,{textDecoration: "underline"}]}>청소비</Typography>
            </Box>
            <Box>
                <Typography sx={textSt}>￦ {"53,902"}</Typography>
            </Box>
        </Box>

        <Box sx={{display : "flex",width : "100%",height : "20px", alignItems :"baseline", justifyContent : "space-between", mb : "24px"}}
                onClick={()=>setShowservice(true)}
        >
            <Box sx={{display : "flex",alignItems :"baseline", cursor : "pointer",}}>
                <Typography sx={[textSt,{textDecoration: "underline"}]}>서비스 수수료</Typography>
            </Box>
            <Box>
                <Typography sx={textSt}>￦ {(price*0.163).toLocaleString()}</Typography>
            </Box>
        </Box>

       
        <RoomBookBoxCommonPrice
            open={showcom}
            onClose={setShowcom}
            bottom = {2}
        />
        <RoomBookBoxCleanPrice
            open={showclean}
            onClose={setShowclean}
            bottom = {1}
        />
        <RoomBookBoxServicePrice
            open={showservice}
            onClose={setShowservice}
            bottom = {0}
        />
    </Box>

    );
}

export default RoomBookBoxPrice;