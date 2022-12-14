import { InputAdornment,OutlinedInput,FormControl,InputLabel, IconButton,Divider , Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField, Slide, Button } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ErrorIcon from '@mui/icons-material/Error';
import { TransitionProps } from "@mui/material/transitions";
import { CustomColor } from "../../interfaces/setting/color";
import { signOut, useSession } from "next-auth/react";

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
    setTermsPersonDialog: React.Dispatch<React.SetStateAction<boolean>>,
    email : string,
    setEmail : React.Dispatch<React.SetStateAction<string>>,
    social : boolean, 
    setSocial: React.Dispatch<React.SetStateAction<boolean>>,
}

function RegisterDialog({setDialog, setRegisterDialog,setTermsPersonDialog,email,setEmail, social,setSocial} :Props){
    const {data, status} = useSession();
    const [load, setload] = useState<boolean>(false);
    const [alert, setAlert]= useState<boolean>(false);

    const [secondname, setSecondname] = useState<string>("");
    const [secondnameChk, setSecondnameChk] = useState<boolean>(true);
    const [firstname, setFirstname] = useState<string>("");
    const [firstnameChk, setFirstnameChk] = useState<boolean>(true);
    const [birth, setBirth] = useState<string>("");
    const [birthChk, setBirthChk] = useState<boolean>(true);
    const [password, setPassword] = useState<string>("");
    const [check1,setCheck1] = useState<boolean>(true);
    const [check2,setCheck2] = useState<boolean>(false);
//???????????? ??????
    const [showpw, setShowpw] = useState<boolean>(false);
    const [pwlevel, setPwLevel] = useState<number>(-1);
    const [pwInclude, setPwInclude] = useState<boolean>(false);
    const [pwLng, setPwLng] = useState<boolean>(false);
    const [pwNum, setPwNum] = useState<boolean>(false);
    const [pwChk,setPwChk] =  useState<boolean>(true);
//?????????
    const [emailChk, setEmailChk] = useState<boolean>(true);
    useEffect(()=>{
        if(social){
            setload(true);
            if(data){
                const e = data.user?.email as string;
                setEmail(e)
                socialLoad();
            }
        }
        async function socialLoad(){
            // console.log(email)
            const test = await fetch("/api/account/accountchk",{
                method : "post",
                body : JSON.stringify({email:data!.user?.email}),
                headers : {
                    "content-type" : "application/json"
                }
                
            })
            const rst = await test.json();
            // console.log(data!.user?.email,rst);
            if(rst.result){
                if(rst.datas.firstname.length === 0 || rst.datas.secondname.length === 0 || (Date.now() - new Date(rst.datas.birth).valueOf()) / (1000 * 60 * 60 * 24 * 365) < 18){
                    email = rst.datas.email;
                    setFirstname(rst.datas.firstname);
                    setSecondname(rst.datas.secondname);
                    // console.log(rst.datas.birth) ;
                }else{
                    setRegisterDialog(false);
                    setDialog(false);
                }
            }
            
            setload(false);
        };
    },[social, data])

    useEffect(()=>{
        setPwNum(false);setPwLng(false);setPwInclude(false);
        //?????? ??????
        if(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&])[0-9a-zA-Z~!@#$%^&]{8,}$/.test(password)   ){
            setPwLevel(1)
        }else if(/[0-9~!@#$%^]{1,}/.test(password) && /[a-zA-Z]{1,}/.test(password) && /[0-9a-zA-Z~!@#$%^&]{8,}/.test(password) ){
            setPwLevel(0)
        }else{
            setPwLevel(-1)
        }
        //???????????? ????????? ?????? ?????? ??????
        if(!password.includes(secondname) && !password.includes(email.split("@")[0]) && !password.includes(firstname) ){
            setPwInclude(true)
        }
        //?????? 8???
        if(password.length >= 8){
            setPwLng(true)
        }
        //????????? ?????? ??????
        if(/[0-9~!@#$%^&]/.test(password)){
            setPwNum(true)
        }


    },[password])

    //func
    const onCheck = ()=>{
        // ??? ??????
        if(secondname.length  == 0){
            setSecondnameChk(false)
        }else{
            setSecondnameChk(true)
        }
        // ?????? ??????
        if(firstname.length  == 0){
            setFirstnameChk(false)
        }else{
            setFirstnameChk(true)
        }
        // ???????????? ??????
        if(birth.length  == 0){
            setBirthChk(false);
        }
        // ????????? ??????
        if(!email || !/^[a-zA-Z0-9]{1,}@(naver.com)|(gmail.com)|(daum.net)/.test(email)){
            setEmailChk(false);
        }else{
            setEmailChk(true);
        }
        // ???????????? ??????
        if(password.length ==0 || !pwInclude || pwlevel == -1 || !pwLng || !pwNum){
            // console.log("?",!pwChk)
            setPwChk(false);
        }else{
            setPwChk(true);
        }

        onRegister();
    }

    const onRegister = ()=>{
        if (secondname.length != 0 && firstname.length !== 0 && birth.length !== 0 && password.length !== 0) {
            if ((Date.now() - new Date(birth).valueOf()) / (1000 * 60 * 60 * 24 * 365) >= 18 && /^[a-zA-Z0-9]{1,}@(naver.com)|(gmail.com)|(daum.net)/.test(email) && pwInclude && pwlevel !== -1 && pwLng && pwNum) {
                // console.log("DB ????????????");
                const data = {
                    email: email,
                    password: password,
                    firstname: firstname,
                    secondname: secondname,
                    birth: new Date(birth),
                    market: check2,
                    social : social,
                }
                fetch("/api/account/signup", {
                    method: "post",
                    body: JSON.stringify(data),
                    headers: {
                        "content-type": "application/json"
                    }
                }).then((rcv) => rcv.json())
                    .then((rst) => {
                        if (rst.result) {
                            // console.log(rst);
                            setRegisterDialog(false);
                            setTermsPersonDialog(true);
                        } else {
                            console.log("???????????? ??????", rst.error)
                        }
                        setSocial(false);
                    })

            }
        } else {
            console.log("???????????? ??????")
        }
    }

    const onDelete = ()=>{
        fetch(`/api/account/dlt?email=${email}`,{method :"get"}).then((rcv)=>rcv.json())
        .then((rst)=>{
            if(rst.result){
                // console.log("?????? ??????")
                setDialog(false);setRegisterDialog(false);signOut();setAlert(false);
            }
        })
    }

    return ( 
        <>
        {   load 
        ?
        <LinearProgress color="error" />
        :
        <>
            <Dialog
                open={true}
                // onClose={()=>setRegisterDialog(false)} 
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogTitle sx={{ pl: 1, display: "flex", alignItems: "flex-end" }}>
                    <IconButton 
                        size="small"
                        onClick={() =>{
                            if(social){
                                setAlert(true);
                            }else{
                                setRegisterDialog(false);
                            }
                        }}
                    >
                        <ArrowBackIosIcon fontSize="small" />
                    </IconButton>
                    <Box sx={{ width: "85%", display: "inline-flex", justifyContent: "center" }}>
                        <Typography sx={{ display: "inline-flex", fontSize: "15px", justifyContent: "center", fontWeight: "bold" }}>
                            ???????????? ????????????
                        </Typography>
                    </Box>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    {social && <Typography sx={{ color: "red", fontSize: "14px" }}>??? ?????? ??????????????????. ????????? ????????? ???????????? ?????? ????????? ???????????????.</Typography>}
                    <TextField
                        error={!firstnameChk}
                        fullWidth
                        label="??????(???:??????)"
                        margin="normal"
                        value={firstname}
                        type={"text"}
                        onChange={(evt) => { setFirstname(evt.target.value) }}
                        sx={{ borderRadius: 0 }}
                    />
                    <TextField
                        error={!secondnameChk}
                        fullWidth
                        label="???(???:???)"
                        margin="normal"
                        value={secondname}
                        type={"text"}
                        onChange={(evt) => { setSecondname(evt.target.value) }}
                        helperText="?????? ?????? ???????????? ????????? ????????? ??????????????? ???????????????."
                    />
                    <TextField
                        error={!birthChk}
                        fullWidth
                        margin="normal"
                        value={birth}
                        type={"date"}
                        onChange={(evt) => {
                            setBirth(evt.target.value);
                            if ((Date.now() - new Date(evt.target.value).valueOf()) / (1000 * 60 * 60 * 24 * 365) >= 18) {
                                setBirthChk(true)
                            } else {
                                setBirthChk(false)
                            }
                            // console.log(evt.target.value);
                            // console.log(new Date(evt.target.value).valueOf(),Date.now(),(Date.now()-new Date(evt.target.value).valueOf())/(1000*60*60*24*365))
                            // console.log((Date.now()-new Date(evt.target.value).valueOf())/(1000*60*60*24*365) >= 18)
                        }}
                        helperText="??? 18??? ????????? ????????? ???????????? ????????? ??? ????????????. ????????? ?????????????????? ?????? ???????????? ???????????? ????????????."
                    />
                    <TextField
                        error={!emailChk}
                        fullWidth
                        disabled
                        margin="normal"
                        value={email}
                        label="?????????"
                        type={"email"}
                        onChange={(evt) => { setEmail(evt.target.value) }}
                        helperText="?????? ????????? ???????????? ???????????? ??????????????????."
                    />
                    <Box sx={{ width: 1, display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <FormControl variant="outlined" sx={{ display: "inline-block" }} fullWidth>
                            <InputLabel>????????????</InputLabel>
                            <OutlinedInput
                                error={!pwChk}
                                fullWidth
                                margin="dense"
                                value={password}
                                type={showpw ? "text" : "password"}
                                onChange={(evt) => { setPassword(evt.target.value) }}
                                // helperText={(!pwChk)? "??????????????? ??????????????????" : ""}

                                endAdornment={
                                    <InputAdornment position="end">
                                        <Button onClick={() => { setShowpw((pw) => !pw) }}>??????</Button>
                                    </InputAdornment>

                                }
                                label="????????????"
                            />
                        </FormControl>
                    </Box>
                    {
                        !pwChk &&
                        <Typography sx={{ fontSize: "12px", color: "red", pl: "14px", pt: "5px", mb: "10px" }}>
                            ??????????????? ??????????????????
                        </Typography>
                    }
                    {
                        password.length > 0 &&
                        <Box sx={{ mb: "5px" }}>
                            <Box sx={{ color: (pwlevel === 0 || pwlevel === 1) ? "green" : "red", display: "flex", flexDirection: "row", alignItems: "center", fontSize: '5px' }}>
                                {(pwlevel === 0 || pwlevel === 1) ? <CheckCircleIcon sx={{ fontSize: "10px" }} /> : <CancelIcon sx={{ fontSize: "10px" }} />} ???????????? ?????? ??????: {pwlevel === -1 ? "??????" : pwlevel === 0 ? "??????" : "??????"}
                            </Box>

                            <Box sx={{ color: pwInclude ? "green" : "red", display: "flex", flexDirection: "row", alignItems: "center", fontSize: '5px' }}>
                                {pwInclude ? <CheckCircleIcon sx={{ fontSize: "10px" }} /> : <CancelIcon sx={{ fontSize: "10px" }} />} ??????????????? ?????? ???????????? ????????? ????????? ????????? ??? ????????????.
                            </Box>

                            <Box sx={{ color: pwLng ? "green" : "red", display: "flex", flexDirection: "row", alignItems: "center", fontSize: '5px' }}>
                                {pwLng ? <CheckCircleIcon sx={{ fontSize: "10px" }} /> : <CancelIcon sx={{ fontSize: "10px" }} />} ?????? 8???
                            </Box>

                            <Box sx={{ color: pwNum ? "green" : "red", display: "flex", flexDirection: "row", alignItems: "center", fontSize: '5px' }}>
                                {pwNum ? <CheckCircleIcon sx={{ fontSize: "10px" }} /> : <CancelIcon sx={{ fontSize: "10px" }} />} ????????? ????????? ???????????????
                            </Box>
                        </Box>

                    }
                    <Divider />
                    <Box sx={{ display: "flex", flexDirection: "row", mt: "5px" }}>
                        <Box>
                            <Typography variant="overline" sx={{ display: "inline-block" }}>
                                ???????????? ?????? ??? ????????? ???????????????. (??????)
                            </Typography>
                            <Typography variant="overline" sx={{ display: "inline-block", color: "gray" }}>
                                1. ?????????????????? ???????????? ?????? ?????? ??????????????? ???????????? ???????????? ??? ????????? ?????? ????????? ???????????? ??????????????? ???????????? ????????? ??? ???????????? ?????? ????????? ???????????????. ????????? ?????? ??????, ?????????????????? ???????????? ???????????? ???????????? ???????????? ?????? ??? ????????????. ????????? ???????????? ????????? ???????????????.
                            </Typography>
                            <Typography variant="overline" sx={{ display: "inline-block", color: "gray" }}>
                                ?????????
                            </Typography>

                            {
                                !check1 &&
                                <Typography variant="overline" sx={{ display: "inline-block", color: "red", alignItems: "center" }}>
                                    <ErrorIcon sx={{ fontSize: "15px" }} />??????????????? ??????????????????.
                                </Typography>
                            }
                        </Box>
                        <Box>
                            <Checkbox
                                checked={check1}
                                onChange={() => { setCheck1((c) => !c) }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />

                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", mt: "5px" }}>
                        <Box>
                            <Typography variant="overline" sx={{ display: "inline-block" }}>
                                ????????? ????????? ????????? ????????????(??????).
                            </Typography>
                            <Typography variant="overline" sx={{ display: "inline-block", color: "gray" }}>
                                ??????????????? ?????? ?????? ??????, ?????? ?????? ??????, ????????? ?????????, ?????? ????????? ??????????????????. ?????? ?????? ?????? ????????? ???????????? ???????????? ????????? ????????? ??? ????????????.
                            </Typography>
                        </Box>
                        <Box>
                            <Checkbox
                                checked={check2}
                                onChange={() => { setCheck2((c) => !c) }}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Box>
                    </Box>

                    <Divider />

                    <Box>
                        <Typography variant="overline" sx={{ display: "inline-block" }}>
                            ?????? ??? ??????????????? ???????????? ??????????????? ????????? ??????, ?????? ????????? ??????, ????????????????????? ????????????, ?????? ?????? ??????, ???????????? ??????????????? ???????????????.
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { onCheck() }} sx={[
                        { width: "100%", color: "white", fontWeight: "bold", bgcolor: CustomColor.main },
                        { "&:hover": { backgroundColor: CustomColor.mainHover } }
                    ]}>???????????? ??? ?????? ?????? ??????</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={alert}>
                <DialogContent>
                    <Typography>????????? ????????? ?????????????????????????</Typography>
                </DialogContent>
                <DialogActions>
                    <Box sx={{display:"flex", flexDirection :"column", width : "100%"}}>
                        <Button onClick={()=>{onDelete()}} sx={[
                            {width :"99%", color : "white", fontWeight :"bold", bgcolor : CustomColor.black},
                            {"&:hover":{backgroundColor : CustomColor.black}}
                        ]}>?????? ????????????</Button>

                        <Button onClick={()=>{setAlert(false)}} sx={[
                            {width :"99%", color : CustomColor.black, fontWeight :"bold", bgcolor : CustomColor.white, mt : "10px", borderStyle : "solid", borderWidth : 1, borderColor : CustomColor.black},
                            {"&:hover":{backgroundColor : CustomColor.white}}
                        ]}>?????? ????????????</Button>

                    </Box>
                </DialogActions>
            </Dialog>
        </>
        }
        </>
    );
}

export default RegisterDialog;