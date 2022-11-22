import { Button, Typography, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { CustomColor } from "../../interfaces/setting/color";

type Props = {
    onSave: () => Promise<void>
}

function BecomeHostSaveBottom({onSave}:Props) {



    return (
    <Box sx={{width : "100%", display : "flex", justifyContent: "flex-end"}}>
        <Button onClick={()=>onSave()} sx={{bgcolor : CustomColor.whiteHover, borderRadius  : 1}}>
            <Typography fontWeight={"bold"} sx={{color:CustomColor.black, fontSize:"14px"}}>저장 및 나가기</Typography>
        </Button>
    </Box>
    );
}

export default BecomeHostSaveBottom;