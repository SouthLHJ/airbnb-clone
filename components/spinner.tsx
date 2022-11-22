import {Box , CircularProgress} from "@mui/material"
import { CustomColor } from "../interfaces/setting/color";

function Spinner() {
    return (
    <Box sx={{display : "flex",alignItems : "center", justifyContent:"center", zIndex : 10000, bgColor : CustomColor.blackHover, width :"100vh", height :"100vh"}}>
        <Box sx={{bgColor : "white", borderRadius : 5, padding : "10px"}}>
            <CircularProgress color="inherit" />
        </Box>
    </Box>
    );
}

export default Spinner;