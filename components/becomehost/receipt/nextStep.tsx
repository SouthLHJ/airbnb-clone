import { Box, Button, Typography ,InputAdornment} from "@mui/material";
import {BsJournalCheck,BsCalendarDate,BsPencilSquare} from "react-icons/bs"
import { CustomColor } from "../../../interfaces/setting/color";

function ReceiptStep() {
    return (
        <Box  sx={{display : "flex", flexDirection : "column", alignItems :"flex-start", mt :2}}>
            <Box sx={{mb : 2}}>
                <Typography fontSize={"25px"} fontWeight={"bold"}>다음 단계</Typography>
            </Box>
            <Box sx={{display : "flex", flexDirection :"row", alignItems :"flex-start"}}>
                <BsJournalCheck fontSize={"25px"}/>
                <Box sx={{ml :1}}>
                    <Typography fontSize={"18px"} fontWeight={"bold"}>세부 정보를 확인하고 숙소를 등록하세요</Typography>
                    <Typography fontSize={"13px"} color={CustomColor.blackHover}>본인 인증이 필요하거나 현지 정부에 등록해야 하는 경우 안내해드리겠습니다.</Typography>
                </Box>
            </Box>

            <Box sx={{display : "flex", flexDirection :"row", alignItems :"flex-start"}}>
                <BsCalendarDate fontSize={"25px"}/>
                <Box sx={{ml :1}}>
                    <Typography fontSize={"18px"} fontWeight={"bold"}>달력 설정하기</Typography>
                    <Typography  fontSize={"13px"} color={CustomColor.blackHover}>숙소 예약 가능일을 선택해주세요. 숙소는 등록 완료 후 24시간이 지나면 일반에 공개됩니다.</Typography>
                </Box>
            </Box>

            <Box sx={{display : "flex", flexDirection :"row", alignItems :"flex-start"}}>
                <BsPencilSquare fontSize={"25px"}/>
                <Box sx={{ml :1}}>
                    <Typography fontSize={"18px"} fontWeight={"bold"}>설정 변경하기</Typography>
                    <Typography  fontSize={"13px"} color={CustomColor.blackHover}>숙소 이용규칙 설정, 환불 정책 선택, 게스트의 예약 방식 선택 등 필요한 작업을 하세요.</Typography>
                </Box>
            </Box>
        </Box>
      );
}

export default ReceiptStep;