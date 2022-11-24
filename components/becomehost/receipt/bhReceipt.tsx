import { Box, Button, Typography ,InputAdornment} from "@mui/material";
import {Dispatch,SetStateAction,useEffect,useState} from "react"
import { CustomColor } from "../../../interfaces/setting/color";
import {HiPlus, HiMinus} from "react-icons/hi"
import ReceiptPreview from "./preview";
import ReceiptStep from "./nextStep";
import ReceiptDialog from "./previewDialog";



const sltBox = {display :"flex", flexDirection :"row", alignItems:"center",justifyContent :"center",width : "40px",height : "40px",borderStyle : "solid", borderRadius : 10, borderColor : CustomColor.blackHover, borderWidth :1,cursor : "pointer"}
const sltBoxHover= {"&:hover" :{backgroundColor : CustomColor.whiteHover}}

function BecomeHostReceipt() {
    const [modal, setModal] = useState<boolean>(false)

    return (
    <>
        <Typography>게스트에게 표시되는 정보는 다음과 같습니다. 모든 정보가 정확한지 확인하세요.</Typography>
        <Box onClick={()=>setModal(true)} sx={{cursor : "pointer", position : "relative"}}>
            <Box sx={{position : "absolute", top : 10, right : 10, bgcolor : "white", boxShadow : "0 6px 16px rgba(0,0,0,0.12)",pl :2,pr :2  }}>
                <Typography fontWeight={"bold"}>미리보기 표시</Typography>
            </Box>
            <ReceiptPreview/>
        </Box>
        <ReceiptStep/>
        
        {modal && <ReceiptDialog modal={modal} setModal={setModal}/>}
    </>
    );
}

export default BecomeHostReceipt;
