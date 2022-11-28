import {Box, Typography} from "@mui/material"
import { BookContext } from "../../../pages/book/stays";
import {useContext} from "react"
function BookBillDetail() {
    const bookCtx = useContext(BookContext)
    return (
        <Box sx={{width : "100%"}}>
        <Box sx={{mb : "24px"}}>
            <Typography fontSize={"15px"} fontWeight={"bold"}>날짜</Typography>
            <Typography fontSize={"15px"}>{bookCtx?.book.checkinDate.split("/")[0]}~{bookCtx?.book.checkoutDate.split("/")[0]}</Typography>
        </Box>
        <Box>
            <Typography fontSize={"15px"} fontWeight={"bold"}>게스트</Typography>
            <Typography fontSize={"15px"}>성인 : {bookCtx?.book.adult}, 어린이 : {bookCtx?.book.child}, 유아 : {bookCtx?.book.infant}, 반려동물 : {bookCtx?.book.pet}</Typography>
        </Box>
        </Box>
      );
}

export default BookBillDetail;