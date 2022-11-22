import {InputAdornment,OutlinedInput,FormControl,InputLabel, IconButton,Divider , Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField, Slide, Button, Box } from "@mui/material";
import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Typography from '@mui/material/Typography';
import { TransitionProps } from "@mui/material/transitions";
import { CustomColor } from "../../interfaces/setting/color";
import { signIn, useSession } from "next-auth/react";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

type Props = {
    setDialog : React.Dispatch<React.SetStateAction<boolean>> ,
    setAccountDialog: React.Dispatch<React.SetStateAction<boolean>>,
    email : string,
    setEmail : React.Dispatch<React.SetStateAction<string>>
}

function AccountDialog({setDialog, setAccountDialog,email,setEmail} :Props){

    const [password, setPassword] = useState<string>("");
    const [passwordChk, setPasswordChk] = useState<boolean>(true);    
    const [showpw, setShowpw] = useState<boolean>(false);

    const countryRef = useRef<HTMLElement>();


    const changeCountry : ChangeEventHandler<HTMLElement> = (evt)=>{
        // console.log(evt.target)
        countryRef.current = evt.target
    }

    const changePassword : ChangeEventHandler<HTMLInputElement> = (evt)=>{
        // console.log(evt.target.value)
        setPassword(evt.target.value)
        // console.log(emailRef.current)
    }
    
    const onNextPage = async()=>{
        // console.log(email,password)
        const rcv = await signIn("credentials", {
            redirect : false,
            email : email,password : password
        }) ;
        // console.log(rcv)
        if(rcv!.ok){
            // console.log(data, status)
            setAccountDialog(false);
            setDialog(false);
            setPasswordChk(true)

        }else{
            // setPassword("");
            setPasswordChk(false)
        }
       
    }

    return ( <Dialog 
        open={true}
        onClose={()=>setAccountDialog(false)} 
        TransitionComponent={Transition}
        keepMounted
        >
                <DialogTitle sx={{pl : 1, display :"flex", alignItems :"flex-end"}}>
                    <IconButton size="small" onClick={()=>setAccountDialog(false)}>
                        <ArrowBackIosIcon fontSize="small"/>
                    </IconButton>
                    <Box sx={{width : "85%",display : "inline-flex",justifyContent :"center"}}>
                        <Typography  sx={{display : "inline-flex", fontSize : "15px", justifyContent :"center", fontWeight : "bold"}}>
                            로그인
                        </Typography>
                    </Box>
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    <Box sx={{mt : "8px", width : "450px", display :"flex", flexDirection:"column"}}>
                        <FormControl variant="outlined" sx={{ display : "inline-block"}} fullWidth>
                            <InputLabel>비밀번호</InputLabel>
                            <OutlinedInput
                                error={!passwordChk}
                                fullWidth
                                margin="dense"
                                value={password}
                                type={showpw ? "text":"password"}
                                onChange={(evt)=>{setPassword(evt.target.value)}}
                                // helperText={(!pwChk)? "비밀번호를 입력해주세요" : ""}

                                endAdornment={
                                    <InputAdornment position="end">
                                        <Button onClick={()=>{setShowpw((pw)=>!pw)}}>표시</Button>
                                    </InputAdornment>
                                    
                                }
                                label = "비밀번호"
                            />
                        </FormControl>
                        {
                            passwordChk ? null : 
                            <Typography sx={{color : "red", fontSize : "10px"}}>비밀번호가 틀렸습니다.</Typography>
                        }
                    </Box>
                </DialogContent>
                <DialogActions sx={{justifyContent: "center", pb : "20px", pl : "24px", pr :"24px"}}>
                    <Button onClick={()=>{onNextPage()}} sx={[
                        {width :"100%", color : "white", fontWeight :"bold", bgcolor : CustomColor.main},
                        {"&:hover":{backgroundColor : CustomColor.mainHover}}
                    ]}>로그인</Button>
                </DialogActions>
                
        </Dialog> );
}

export default AccountDialog;