import  dateFns,{differenceInDays,getYear,getMonth,getDate, addDays, format}  from 'date-fns';
import { Box, Typography,Button, IconButton ,Divider} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useContext ,useState ,Dispatch,SetStateAction } from "react";
import { RecommandDateContext, RoomContext } from "../../../../contexts/rooms";

type Props = {
    open : boolean,
    onClose: Dispatch<SetStateAction<boolean>>,
    bottom : number,
    right  : number | undefined,
}
const textSt = {fontSize:"16px"}
function RoomBookBoxCommonPrice({open, onClose,bottom,right} : Props) {
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
                    bottom: `${45*bottom}px`,
                    right: `${right}px`,
                    transformOrigin: "right bottom",
                    zIndex : 100,
                    backgroundColor: "rgb(255, 255, 255)",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "12px",
                    boxShadow: "rgb(0 0 0 / 28%) 0px 8px 28px",
                    width : "400px",
                }}
            ><Box
            onClick={()=>onClose(false)}
            sx={{
                position: "fixed",
                zIndex: -1,
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh'
                }}></Box>
                <Box sx={{pl : 1, display :"flex", alignItems :"flex-end", padding   : "14px"}}>
                    <IconButton size="small" onClick={()=>{onClose(false)}}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                    <Box sx={{width : "85%",display : "inline-flex",justifyContent :"center"}}>
                        <Typography  sx={{display : "inline-flex", fontSize : "15px", justifyContent :"center", fontWeight : "bold"}}>
                            기본 요금 상세 내역
                        </Typography>
                    </Box>
                </Box>
                <Divider/>

                
                <Box sx={{pl : 1, display :"flex", flexDirection : "column", padding   : "18px"}}>
                    {bill }
                    <Divider/>
                    <Box sx={{display : "flex",width : "100%", alignItems :"baseline", justifyContent : "space-between", mt : "14px"}}>
                        <Box sx={{display : "flex",alignItems :"baseline"}}>
                            <Typography sx={textSt} fontWeight={"bold"}>총 기본 요금</Typography>
                        </Box>
                        <Box>
                            <Typography sx={textSt}>￦{(ctx?.item.price! * count).toLocaleString()}</Typography>
                        </Box>
                    </Box>
                </Box>

            </Box>

     );
}

export default RoomBookBoxCommonPrice;