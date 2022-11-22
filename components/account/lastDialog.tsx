import { InputAdornment,OutlinedInput,FormControl,InputLabel, IconButton,Divider , Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField, Slide, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CustomColor } from "../../interfaces/setting/color";

type Props = {
    setDialog : React.Dispatch<React.SetStateAction<boolean>>,
    setLastDialog : React.Dispatch<React.SetStateAction<boolean>>,
}

function LastDialog({setDialog,setLastDialog}:Props) {
    return (
        <Dialog open={true}>
            <DialogTitle  sx={{pl : 1, display :"flex", alignItems :"flex-end"}}>
                <IconButton size="small" onClick={()=>{setDialog(false);setLastDialog(false);}}>
                    <CloseIcon fontSize="small"/>
                </IconButton>
                <Box sx={{width : "85%",display : "inline-flex",justifyContent :"center"}}>
                    <Typography  sx={{display : "inline-flex", fontSize : "15px", justifyContent :"center", fontWeight : "bold"}}>
                        어서오세요  
                    </Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box sx={{mt : "8px", width : "450px", display :"flex", flexDirection:"column", alignItems :"center"}}>
                    <Typography sx={{color : CustomColor.black,fontSize : "25px", fontWeight : "bold", mb : "10px"}}>
                        에어비앤비에 오신 것을 환영합니다.
                    </Typography>
                    <Typography sx={{color : CustomColor.black, mb : "15px"}}>
                        전 세계 숙소, 현지 레스토랑 및 독특한 체험을 찾아보세요.
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions sx={{justifyContent: "center", pb : "20px", pl : "24px", pr :"24px"}}>
                <Button onClick={()=>{setDialog(false);setLastDialog(false);}} sx={[
                    {width :"99%", color : "white", fontWeight :"bold", bgcolor : CustomColor.main},
                    {"&:hover":{backgroundColor : CustomColor.mainHover}}
                ]}>동의 후 계속하기
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default LastDialog;
