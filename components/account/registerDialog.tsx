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
//비밀번호 보안
    const [showpw, setShowpw] = useState<boolean>(false);
    const [pwlevel, setPwLevel] = useState<number>(-1);
    const [pwInclude, setPwInclude] = useState<boolean>(false);
    const [pwLng, setPwLng] = useState<boolean>(false);
    const [pwNum, setPwNum] = useState<boolean>(false);
    const [pwChk,setPwChk] =  useState<boolean>(true);
//이메일
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
        //보안 수준
        if(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&])[0-9a-zA-Z~!@#$%^&]{8,}$/.test(password)   ){
            setPwLevel(1)
        }else if(/[0-9~!@#$%^]{1,}/.test(password) && /[a-zA-Z]{1,}/.test(password) && /[0-9a-zA-Z~!@#$%^&]{8,}/.test(password) ){
            setPwLevel(0)
        }else{
            setPwLevel(-1)
        }
        //이름이나 이메일 포함 하면 안됨
        if(!password.includes(secondname) && !password.includes(email.split("@")[0]) && !password.includes(firstname) ){
            setPwInclude(true)
        }
        //최소 8자
        if(password.length >= 8){
            setPwLng(true)
        }
        //숫자나 기호 포함
        if(/[0-9~!@#$%^&]/.test(password)){
            setPwNum(true)
        }


    },[password])

    //func
    const onCheck = ()=>{
        // 성 체크
        if(secondname.length  == 0){
            setSecondnameChk(false)
        }else{
            setSecondnameChk(true)
        }
        // 이름 체크
        if(firstname.length  == 0){
            setFirstnameChk(false)
        }else{
            setFirstnameChk(true)
        }
        // 생년월일 체크
        if(birth.length  == 0){
            setBirthChk(false);
        }
        // 이메일 체크
        if(!email || !/^[a-zA-Z0-9]{1,}@(naver.com)|(gmail.com)|(daum.net)/.test(email)){
            setEmailChk(false);
        }else{
            setEmailChk(true);
        }
        // 비밀번호 체크
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
                // console.log("DB 연동하기");
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
                            console.log("회원가입 안됨", rst.error)
                        }
                        setSocial(false);
                    })

            }
        } else {
            console.log("회원가입 안됨")
        }
    }

    const onDelete = ()=>{
        fetch(`/api/account/dlt?email=${email}`,{method :"get"}).then((rcv)=>rcv.json())
        .then((rst)=>{
            if(rst.result){
                // console.log("삭제 완료")
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
                            회원가입 완료하기
                        </Typography>
                    </Box>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    {social && <Typography sx={{ color: "red", fontSize: "14px" }}>첫 소셜 로그인입니다. 부족한 정보를 얻기위해 추가 정보를 넣어주세요.</Typography>}
                    <TextField
                        error={!firstnameChk}
                        fullWidth
                        label="이름(예:길동)"
                        margin="normal"
                        value={firstname}
                        type={"text"}
                        onChange={(evt) => { setFirstname(evt.target.value) }}
                        sx={{ borderRadius: 0 }}
                    />
                    <TextField
                        error={!secondnameChk}
                        fullWidth
                        label="성(예:홍)"
                        margin="normal"
                        value={secondname}
                        type={"text"}
                        onChange={(evt) => { setSecondname(evt.target.value) }}
                        helperText="정부 발급 신분증에 표시된 이름과 일치하는지 확인하세요."
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
                        helperText="만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 에어비앤비의 다른 회원에게 공개되지 않습니다."
                    />
                    <TextField
                        error={!emailChk}
                        fullWidth
                        disabled
                        margin="normal"
                        value={email}
                        label="이메일"
                        type={"email"}
                        onChange={(evt) => { setEmail(evt.target.value) }}
                        helperText="예약 확인과 영수증을 이메일로 보내드립니다."
                    />
                    <Box sx={{ width: 1, display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <FormControl variant="outlined" sx={{ display: "inline-block" }} fullWidth>
                            <InputLabel>비밀번호</InputLabel>
                            <OutlinedInput
                                error={!pwChk}
                                fullWidth
                                margin="dense"
                                value={password}
                                type={showpw ? "text" : "password"}
                                onChange={(evt) => { setPassword(evt.target.value) }}
                                // helperText={(!pwChk)? "비밀번호를 입력해주세요" : ""}

                                endAdornment={
                                    <InputAdornment position="end">
                                        <Button onClick={() => { setShowpw((pw) => !pw) }}>표시</Button>
                                    </InputAdornment>

                                }
                                label="비밀번호"
                            />
                        </FormControl>
                    </Box>
                    {
                        !pwChk &&
                        <Typography sx={{ fontSize: "12px", color: "red", pl: "14px", pt: "5px", mb: "10px" }}>
                            비밀번호를 입력해주세요
                        </Typography>
                    }
                    {
                        password.length > 0 &&
                        <Box sx={{ mb: "5px" }}>
                            <Box sx={{ color: (pwlevel === 0 || pwlevel === 1) ? "green" : "red", display: "flex", flexDirection: "row", alignItems: "center", fontSize: '5px' }}>
                                {(pwlevel === 0 || pwlevel === 1) ? <CheckCircleIcon sx={{ fontSize: "10px" }} /> : <CancelIcon sx={{ fontSize: "10px" }} />} 비밀번호 보안 수준: {pwlevel === -1 ? "약함" : pwlevel === 0 ? "보통" : "강함"}
                            </Box>

                            <Box sx={{ color: pwInclude ? "green" : "red", display: "flex", flexDirection: "row", alignItems: "center", fontSize: '5px' }}>
                                {pwInclude ? <CheckCircleIcon sx={{ fontSize: "10px" }} /> : <CancelIcon sx={{ fontSize: "10px" }} />} 비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다.
                            </Box>

                            <Box sx={{ color: pwLng ? "green" : "red", display: "flex", flexDirection: "row", alignItems: "center", fontSize: '5px' }}>
                                {pwLng ? <CheckCircleIcon sx={{ fontSize: "10px" }} /> : <CancelIcon sx={{ fontSize: "10px" }} />} 최소 8자
                            </Box>

                            <Box sx={{ color: pwNum ? "green" : "red", display: "flex", flexDirection: "row", alignItems: "center", fontSize: '5px' }}>
                                {pwNum ? <CheckCircleIcon sx={{ fontSize: "10px" }} /> : <CancelIcon sx={{ fontSize: "10px" }} />} 숫자나 기호를 포함하세요
                            </Box>
                        </Box>

                    }
                    <Divider />
                    <Box sx={{ display: "flex", flexDirection: "row", mt: "5px" }}>
                        <Box>
                            <Typography variant="overline" sx={{ display: "inline-block" }}>
                                개인정보 수집 및 이용에 동의합니다. (필수)
                            </Typography>
                            <Typography variant="overline" sx={{ display: "inline-block", color: "gray" }}>
                                1. 에어비앤비가 수집하는 개인 정보 에어비앤비 플랫폼을 이용하는 데 필요한 정보 당사는 회원님이 에어비앤비 플랫폼을 이용할 때 회원님의 개인 정보를 수집합니다. 그렇지 않은 경우, 에어비앤비는 요청하신 서비스를 회원님께 제공하지 못할 수 있습니다. 이러한 정보에는 다음이 포함됩니다.
                            </Typography>
                            <Typography variant="overline" sx={{ display: "inline-block", color: "gray" }}>
                                더보기
                            </Typography>

                            {
                                !check1 &&
                                <Typography variant="overline" sx={{ display: "inline-block", color: "red", alignItems: "center" }}>
                                    <ErrorIcon sx={{ fontSize: "15px" }} />계속하려면 동의해주세요.
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
                                마케팅 이메일 수신을 원합니다(선택).
                            </Typography>
                            <Typography variant="overline" sx={{ display: "inline-block", color: "gray" }}>
                                에어비앤비 회원 전용 할인, 추천 여행 정보, 마케팅 이메일, 푸시 알림을 보내드립니다. 계정 설정 또는 마케팅 알림에서 언제든지 수신을 거부할 수 있습니다.
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
                            동의 및 계속하기를 선택하여 에어비앤비 서비스 약관, 결제 서비스 약관, 위치기반서비스 이용약관, 차별 금지 정책, 개인정보 처리방침에 동의합니다.
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { onCheck() }} sx={[
                        { width: "100%", color: "white", fontWeight: "bold", bgcolor: CustomColor.main },
                        { "&:hover": { backgroundColor: CustomColor.mainHover } }
                    ]}>회원가입 후 추가 약관 보기</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={alert}>
                <DialogContent>
                    <Typography>소셜로 가입을 취소하시겠습니까?</Typography>
                </DialogContent>
                <DialogActions>
                    <Box sx={{display:"flex", flexDirection :"column", width : "100%"}}>
                        <Button onClick={()=>{onDelete()}} sx={[
                            {width :"99%", color : "white", fontWeight :"bold", bgcolor : CustomColor.black},
                            {"&:hover":{backgroundColor : CustomColor.black}}
                        ]}>가입 취소하기</Button>

                        <Button onClick={()=>{setAlert(false)}} sx={[
                            {width :"99%", color : CustomColor.black, fontWeight :"bold", bgcolor : CustomColor.white, mt : "10px", borderStyle : "solid", borderWidth : 1, borderColor : CustomColor.black},
                            {"&:hover":{backgroundColor : CustomColor.white}}
                        ]}>가입 마저하기</Button>

                    </Box>
                </DialogActions>
            </Dialog>
        </>
        }
        </>
    );
}

export default RegisterDialog;