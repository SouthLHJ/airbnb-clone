import {Box, Typography,Divider} from "@mui/material"
import BookBillDetail from "./billDetail";
import BookBillPay from "./billPay";
import BookBillTitle from "./billTitle";

function BookBill() {
    return (
        <Box flex={1} sx={{width : "65%"}}>
            <BookBillTitle/>
            <BookBillDetail/>

            <Box sx={{mt : "24px", mb : "24px"}}>
                <Divider/>
            </Box>

            <BookBillPay/>
        </Box>
      );
}

export default BookBill;