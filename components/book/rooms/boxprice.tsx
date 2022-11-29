import  dateFns,{differenceInDays,getYear,getMonth,getDate,}  from 'date-fns';

import {Box, Typography,Divider} from "@mui/material"
import { Accommodation } from "../../../interfaces/becomehost/accommodation";
import { CustomColor } from "../../../interfaces/setting/color";
import {useRef,useState,useContext} from "react"
import { BookContext } from "../../../pages/book/stays";
import RoomBookBoxCommonPrice from '../../rooms/detail/book/comprice';
import RoomBookBoxCleanPrice from '../../rooms/detail/book/cleanprice';
import RoomBookBoxServicePrice from '../../rooms/detail/book/serviceprice';

const textSt = {fontSize:"15px"}

type Props={
    room : Accommodation | undefined,
}

function BookRoomBoxPrice({room} : Props) {
    const bookCtx = useContext(BookContext)
    if(!room){
        return null;
    }
    const comref = useRef<HTMLElement>(null);
    const cleanref = useRef<HTMLElement>(null);
    const serviceref = useRef<HTMLElement>(null);

    const [showcom, setShowcom] = useState<boolean>(false);
    const [showclean, setShowclean] = useState<boolean>(false);
    const [showservice, setShowservice] = useState<boolean>(false);

    const day1 = new Date(Number(bookCtx?.book!.checkinDate))
    const day2 = new Date(Number(bookCtx?.book?.checkoutDate))

    const price = (room.price!*differenceInDays(day2,day1!))
    const cleanPirce = 53902;
    const servicePrice = Math.ceil(price*0.163);

    const formatter = new Intl.NumberFormat("ko",{
        style : "currency",
        currency : "krw"
    })

    return (
    <Box sx={{ position : "relative"}}>
        <Box sx={{mb : "14px"}}>
            <Typography fontSize={"20px"} fontWeight={"bold"}>요금 세부정보</Typography>

        </Box>

        <Box sx={{display : "flex",width : "100%", height : "20px", alignItems :"baseline", justifyContent : "space-between", mb : "24px"}}>
            <Box sx={{display : "flex",alignItems :"baseline", cursor : "pointer",}}
                onClick={()=>{setShowcom(true)}}
                ref={comref}
            >
                <Typography sx={[textSt,{textDecoration: "underline"}]}>{formatter.format(room.price!)} x {differenceInDays(new Date(day2!),new Date(day1!))}박</Typography>
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

export default BookRoomBoxPrice;