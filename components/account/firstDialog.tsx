import { IconButton,Divider , Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField, Slide, Button, Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import React, { ChangeEventHandler, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from "@mui/material/transitions";
import { CustomColor } from "../../interfaces/setting/color";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import {RiKakaoTalkFill} from "react-icons/ri"
import { signIn } from "next-auth/react";




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
    setRegisterDialog : React.Dispatch<React.SetStateAction<boolean>>,
    setAccountDialog: React.Dispatch<React.SetStateAction<boolean>>,
    email : string,
    setEmail : React.Dispatch<React.SetStateAction<string>>,
    setSocial :  React.Dispatch<React.SetStateAction<boolean>>,
}

function FirstDialog({setDialog, setRegisterDialog,setAccountDialog,email,setEmail,setSocial} :Props){
    const [check, setCheck] = useState<boolean>(true);
    const countryRef = useRef<HTMLElement>();


    const changeCountry : ChangeEventHandler<HTMLElement> = (evt)=>{
        // console.log(evt.target)
        countryRef.current = evt.target
    }

    const changeEmail : ChangeEventHandler<HTMLInputElement> = (evt)=>{
        // console.log(evt.target.value)
        setEmail(evt.target.value)
        // console.log(emailRef.current)
    }

    const onNextPage = ()=>{
        // console.log(email)
        // console.log(/^[a-zA-Z0-9]{1,}/.test(email))
        // console.log(/^[a-zA-Z0-9]{1,}@/.test(email))
        // console.log(/^[a-zA-Z0-9]{1,}@(naver.com)|(gmail.com)|(daum.net)/.test(email))
        if(/^[a-zA-Z0-9]{1,}@(naver.com)|(gmail.com)|(daum.net)/.test(email)){
            fetch("/api/account/accountchk",{
                method : "post",
                body : JSON.stringify({email : email}),
                headers : {
                    "content-type" : "application/json"
                }
            }).then((rcv)=>rcv.json())
            .then((rcv)=>{
                if(rcv.result){
                    // to ?????????
                    setAccountDialog(true);
                }else{
                    // to ????????????
                    setRegisterDialog(true);
                }
            })
            setCheck(true)
        }else{
            setCheck(false)

        }
    }

    const onSignInGoogle = ()=>{
        //screenX : ?????? ???
        const topX = screenX+(screen.width/2)-(300/2);
        const topY = screenY+(screen.height/2)-(400/2);

        window.open(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/popup/goAuth`,
            "popup",
            `width=300,height=400,top=${topY},left=${topX}`
        )
        // signIn("google")
        
        setSocial(true);

    }

    const onSignInKakao = ()=>{
        //screenX : ?????? ???
        const topX = screenX+(screen.width/2)-(300/2);
        const topY = screenY+(screen.height/2)-(400/2);

        window.open(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/popup/kaAuth`,
            "popup",
            `width=300,height=400,top=${topY},left=${topX}`
        )

        setSocial(true);


    }
    const onSignInNaver = ()=>{
        //screenX : ?????? ???
        const topX = screenX+(screen.width/2)-(300/2);
        const topY = screenY+(screen.height/2)-(400/2);

        window.open(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/popup/naAuth`,
            "popup",
            `width=300,height=400,top=${topY},left=${topX}`
        )

        setSocial(true);

    }

    return ( 
    <Dialog 
        open={true}
        onClose={()=>setDialog(false)} 
        TransitionComponent={Transition}
        keepMounted
        >
                <DialogTitle sx={{pl : 1, display :"flex", alignItems :"center"}}>
                    <IconButton size="small" onClick={()=>setDialog(false)}>
                        <CloseIcon />
                    </IconButton>
                    <Box sx={{width : "85%",display : "inline-flex",justifyContent :"center"}}>
                        <Typography  sx={{display : "inline-flex", fontSize : "15px", justifyContent :"center", fontWeight : "bold"}}>
                            ????????? ?????? ????????????
                        </Typography>
                    </Box>
                </DialogTitle>
                <Divider/>
                <DialogContent >
                    <DialogContentText sx={{textAlign : "center"}}>
                        ?????? ?????? ??????????????? ????????? ???????????????.
                    </DialogContentText>
                    
                    <Box sx={{mt : "8px",width : "450px"}}>

                        <TextField
                            autoFocus
                            error={!check}
                            fullWidth
                            label="?????????"
                            margin="dense"
                            value={email}
                            type={"email"}
                            onChange={changeEmail}
                            helperText={!check ? "????????? ????????? ??????????????????." : ""}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{justifyContent: "center", pb : "20px", pl : "24px", pr :"24px"}}>
                    <Button onClick={()=>{onNextPage()}} sx={[  
                        {width :"100%", color : "white", fontWeight :"bold", bgcolor : CustomColor.main},
                        {"&:hover":{backgroundColor : CustomColor.mainHover}}
                        ]}>??????</Button>
                </DialogActions>
                <Divider><Typography fontSize={"12px"} color={CustomColor.blackHover}>??????</Typography></Divider>
                <Box sx={{display : "flex",alignItems : "center", flexDirection : "column", mt : "20px",pb : "20px", pl : "24px", pr :"24px"}}>
                    <Button onClick={()=>{onSignInGoogle()}}
                    startIcon={<FcGoogle style={{marginLeft: '10px'}} />}
                        sx={[
                            {width :"100%", color : CustomColor.black, fontWeight :"bold", bgcolor : CustomColor.white, borderStyle : "solid",borderWidth :1, borderColor : CustomColor.black},
                            {"&:hover":{backgroundColor : CustomColor.whiteHover}}
                        ]}
                    >
                        <Typography flexGrow={1} fontSize={"13px"} fontWeight={"bold"}>????????? ???????????????</Typography>
                    </Button>
                </Box>
                <Box sx={{display : "flex",alignItems : "center", flexDirection : "column",pb : "20px", pl : "24px", pr :"24px"}}>
                    <Button onClick={()=>{onSignInKakao()}}
                    startIcon={<RiKakaoTalkFill style={{marginLeft: '10px', backgroundColor : "#ffd30f", padding : 1}} />}
                        sx={[
                            {width :"100%", color : CustomColor.black, fontWeight :"bold", bgcolor : CustomColor.white, borderStyle : "solid",borderWidth :1, borderColor : CustomColor.black},
                            {"&:hover":{backgroundColor : CustomColor.whiteHover}}
                        ]}
                    >
                        <Typography flexGrow={1} fontSize={"13px"} fontWeight={"bold"}>???????????? ???????????????</Typography>
                    </Button>
                </Box>
                <Box sx={{display : "flex",alignItems : "center", flexDirection : "column",pb : "20px", pl : "24px", pr :"24px"}}>
                    <Button onClick={()=>{onSignInNaver()}}
                    startIcon={<SiNaver style={{marginLeft: '10px' , color:"#3dd944"}} />}
                        sx={[
                            {width :"100%", color : CustomColor.black, fontWeight :"bold", bgcolor : CustomColor.white, borderStyle : "solid",borderWidth :1, borderColor : CustomColor.black},
                            {"&:hover":{backgroundColor : CustomColor.whiteHover}}
                        ]}
                    >
                        <Typography flexGrow={1} fontSize={"13px"} fontWeight={"bold"}>???????????? ???????????????</Typography>
                    </Button>
                </Box>
    </Dialog> );
}

export default FirstDialog;