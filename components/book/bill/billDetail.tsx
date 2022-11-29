import {Box, Typography} from "@mui/material"
import { BookContext } from "../../../pages/book/stays";
import {format} from "date-fns";

import {useContext} from "react"
function BookBillDetail() {
    const bookCtx = useContext(BookContext)
    console.log(new Date(Number(bookCtx?.book.checkoutDate)))

    return (
        <Box sx={{width : "100%"}}>
        <Box sx={{mb : "24px"}}>
            <Typography fontSize={"15px"} fontWeight={"bold"}>날짜</Typography>
            <Typography fontSize={"15px"}>{format(Number(bookCtx?.book.checkinDate), "yyyy.MM.dd.")}~{format(Number(bookCtx?.book.checkoutDate),"yyyy.MM.dd.")}</Typography>
        </Box>
        <Box>
            <Typography fontSize={"15px"} fontWeight={"bold"}>게스트</Typography>
            <Typography fontSize={"15px"}>성인 : {bookCtx?.book.adult}, 어린이 : {bookCtx?.book.child}, 유아 : {bookCtx?.book.infant}, 반려동물 : {bookCtx?.book.pet}</Typography>
        </Box>
        </Box>
      );
}

export default BookBillDetail;