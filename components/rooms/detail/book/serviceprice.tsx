import  dateFns,{differenceInDays,getYear,getMonth,getDate, addDays, format}  from 'date-fns';
import { Box, Typography,Button, IconButton ,Divider} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useContext ,useState ,Dispatch,SetStateAction } from "react";
import { RecommandDateContext, RoomContext } from '../../../../pages/rooms/[itemId]';

type Props = {
    open : boolean,
    onClose: Dispatch<SetStateAction<boolean>>,
    bottom : number
}
const textSt = {fontSize:"16px"}
function RoomBookBoxServicePrice({open, onClose,bottom} : Props) {
    const ctx = useContext(RoomContext);
    const dateCtx = useContext(RecommandDateContext);

    if(!open){
        return null;
    }

    let bill = [];
    const count = differenceInDays(dateCtx?.date[1] as any,dateCtx?.date[0] as any);
    for(let i=0 ; i<count; i++){
        bill.push(
        <Box key={format(addDays(dateCtx?.date[0] as any,i), "yyyy.MM.dd")} sx={{display : "flex",width : "100%", alignItems :"baseline", justifyContent : "space-between", mb : "14px"}}>
            <Box sx={{display : "flex",alignItems :"baseline"}}>
                <Typography sx={textSt} >{format(addDays(dateCtx?.date[0] as any,i), "yyyy.MM.dd")}</Typography>
            </Box>
            <Box>
                <Typography sx={textSt}>￦{ctx?.item.price?.toLocaleString()}</Typography>
            </Box>
        </Box>
        
        )
    }

    return (
            <Box
                style={{
                    position: "absolute",
                    bottom: `${40*bottom}px`,
                    right: "325px",
                    transformOrigin: "right bottom",
                    zIndex : 100,
                    backgroundColor: "rgb(255, 255, 255)",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "12px",
                    boxShadow: "rgb(0 0 0 / 28%) 0px 8px 28px",
                    width : "400px",
                }}
            >
                <Box sx={{pl : 1, display :"flex", alignItems :"center", padding   : "14px"}}>
                    <IconButton size="small" onClick={()=>{onClose(false)}}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                    <Box sx={{width : "100%",display : "inline-flex",justifyContent :"center"}}>
                        <Typography  sx={{display : "inline-flex", fontSize : "15px", justifyContent :"center"}}>
                            수수료는 에어비앤비 플랫폼을 운영하고 연중무휴 고객 지원과 같은 다양한 서비스를 제공하는데 사용됩니다.
                        </Typography>
                    </Box>
                </Box>
            </Box>

     );
}

export default RoomBookBoxServicePrice;