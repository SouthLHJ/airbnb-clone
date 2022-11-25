import { useAccommodationState } from "../../../contexts/accommodation";
import { Box, Button, Typography ,InputAdornment} from "@mui/material";
import { CustomColor } from "../../../interfaces/setting/color";
function ReceiptPreview() {
    const accommodation = useAccommodationState();

    const url = accommodation ? accommodation.photos![0] : "";

    return (
    <Box sx={{width:"400px",height :"250px",borderRadius : 2, boxShadow : "0 6px 16px rgba(0,0,0,0.12)", padding : 2, animation : "fadein 1s"}}>
        <Box sx={{width : "100%", display : "flex", alignItems :"center", justifyContent :"center"}}>
            <img
                alt={"headerimg"}    
                src={url}
                style={{
                    width : "100%",
                    height :"100%",
                    objectFit : "cover",
                    borderRadius : "10px",
                    borderStyle :"solid"  ,
                    borderWidth  : "1px",   
                    borderColor : CustomColor.whiteHover
                }}
            />
        </Box>
        <Box sx={{display : "flex",mt : 1}}>
            <Box flex={1}>
                <Typography>{accommodation?.title}</Typography>
                <Typography>￦{accommodation?.price} / 박</Typography>
            </Box>
            <Box>
                <Typography>신규 ★</Typography>
            </Box>
        </Box>
    </Box>
      );
}

export default ReceiptPreview;