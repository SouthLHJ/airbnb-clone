import { InputAdornment,OutlinedInput,FormControl,InputLabel, IconButton,Divider , Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField, Slide, Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


import React, {useState} from "react"

import { TransitionProps } from "@mui/material/transitions";
import { CustomColor } from "../../interfaces/setting/color";
import { signOut } from "next-auth/react";
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

type Props = {
    setTermsPersonDialog: React.Dispatch<React.SetStateAction<boolean>>,
    setLastDialog:React.Dispatch<React.SetStateAction<boolean>>,
    setDialog : React.Dispatch<React.SetStateAction<boolean>>,
    email : string
}

function TermsPerson({setDialog,setTermsPersonDialog,setLastDialog,email} : Props) {
    const [moreSaw, setMoreSaw] = useState<boolean>(false);
    const [noSelect, setNoSelect] = useState<boolean>(false);


    //func
    const onRemoveRegister = ()=>{
        // console.log("계정 삭제하기")
        fetch(`/api/account/dlt?email=${email}`,{method :"get"}).then((rcv)=>rcv.json())
        .then((rst)=>{
            if(rst.result){
                // console.log("삭제 완료")
                setDialog(false);setTermsPersonDialog(false);signOut();
            }
        })
    }
    
    const onTermsPersonOk = ()=>{
        fetch(`/api/account/signup?email=${email}`,{
            method : "get",

        }).then((rcv)=>rcv.json())
        .then((rst)=>{
            if(rst.result){
                // console.log(rst);
                setLastDialog(true);setTermsPersonDialog(false);
            }else{
                console.log("Person 전환 안됨", rst.error)
            }
        })

    }

    return (
        <>
            <Dialog open={true}
                onClose={()=>setTermsPersonDialog(false)} 
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogTitle>
                    <Typography  sx={{display : "inline-flex", fontSize : "15px", justifyContent :"center", fontWeight : "bold"}}>
                        차별 반대 서약하기
                    </Typography>
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    <Typography sx={{color : CustomColor.black,fontSize : "25px", fontWeight : "bold", mb : "10px"}}>
                        누구나 어디에서나 우리 집처럼 편안함을 느낄 수 있는 커뮤니티를 지향합니다.
                    </Typography>
                    <Typography sx={{color : CustomColor.black, mb : "10px"}}>
                        이를 위해 다음에 동의해 주실 것을 부탁드립니다.
                    </Typography>
                    <Typography sx={{color : CustomColor.black, mb : "10px"}}>
                        인종, 종교, 출신 국가, 민족, 피부색, 장애, 성별, 성 정체성, 성적 지향, 연령 등과 관계없이 자사 커뮤니티의 모든 사람을 존중하며 편견이나 선입견 없이 대하는 것에 동의합니다. 
                    </Typography>
                    <Button sx={[{color : CustomColor.black, mb : "10px"},{"&:hover" : {backgroundColor : "white"}}]} onClick={()=>setMoreSaw(true)}>
                        더 알아보기 {">"}
                    </Button>

                </DialogContent>
                <DialogActions  >
                    <Box sx={{display:"flex", flexDirection :"column", width : "100%"}}>
                        <Button onClick={()=>{onTermsPersonOk()}} sx={[
                            {width :"99%", color : "white", fontWeight :"bold", bgcolor : CustomColor.main},
                            {"&:hover":{backgroundColor : CustomColor.mainHover}}
                        ]}>동의 후 계속하기</Button>

                        <Button onClick={()=>{setNoSelect(true)}} sx={[
                            {width :"99%", color : CustomColor.black, fontWeight :"bold", bgcolor : CustomColor.white, mt : "10px", borderStyle : "solid", borderWidth : 1, borderColor : CustomColor.black},
                            {"&:hover":{backgroundColor : CustomColor.white}}
                        ]}>거절하기</Button>

                    </Box>
                </DialogActions>
            </Dialog>

            <Dialog open={moreSaw} onClose={()=>setMoreSaw(false)}>
                <DialogTitle>커뮤니티를 위한 반차별 약속 소개</DialogTitle>
                <DialogContent>
                    <Typography sx={{fontSize : "13px", fontWeight : "bold", color : CustomColor.black}}>
                        커뮤니티를 위한 반차별 약속을 만든 이유는 무엇인가요?
                    </Typography>
                    <Typography sx={{fontSize : "13px",  color : CustomColor.black, mb : "5px"}}>
                        이 약속은 에어비앤비가 누구나 진정으로 내 집 같은 편안함을 누릴 수 있는 글로벌 커뮤니티로 거듭나는 데 중요한 단계입니다. 차별 행위가 있으면 호스트와 게스트는 진정한 편안함과 진심 어린 환대를 느끼지 못하므로, 에어비앤비는 이러한 차별을 일절 용인하지 않습니다. 모두가 내 집 같은 편안함을 느낄 수 있는 에어비앤비를 만들기 위해서 커뮤니티의 모든 일원이 이러한 목표를 이해하고 이를 달성하기 위해 함께 노력해 주실 것을 부탁드립니다.
                    </Typography>

                    <Typography sx={{fontSize : "13px", fontWeight : "bold", color : CustomColor.black}}>
                        약속을 거부하면 어떻게 되나요?
                    </Typography>
                    <Typography sx={{fontSize : "13px",  color : CustomColor.black, mb : "5px"}}>
                        약속에 대한 동의를 거부하시면 에어비앤비에서 호스트로 활동하거나 숙소를 예약할 수 없으며, 에어비앤비 계정 취소를 선택할 수 있습니다. 계정을 취소하면 모든 향후의 예약이 함께 취소됩니다. 계정이 없어도 에어비앤비 사이트를 방문하고 둘러볼 수는 있지만, 예약이나 호스팅은 할 수 없습니다.
                    </Typography>

                    <Typography sx={{fontSize : "13px", fontWeight : "bold", color : CustomColor.black}}>
                    호스트로서 모든 사람의 예약을 수락하는 것에 대해 안전에 관한 우려가 있으면 어떻게 해야 하나요?
                    </Typography>
                    <Typography sx={{fontSize : "13px",  color : CustomColor.black, mb : "5px"}}>
                        회원님이 살고 계신 공간을 숙소로 공유하는 경우에는 회원님과 동성인 게스트에게만 예약을 허용할 수도 있습니다.
                    </Typography >
                    <Typography sx={{fontSize : "13px",  color : CustomColor.black, mb : "5px"}}>
                        이 정책에 근거하여 회원님께서는 인종, 종교, 출신 국가, 민족, 성적 취향 또는 연령이 아닌 다른 이유로 게스트의 예약 요청을 거절하실 수 있습니다.
                    </Typography>
                    <Typography sx={{fontSize : "13px",  color : CustomColor.black, mb : "5px"}}>
                        예약 요청을 고려할 때는 혹시 선입견이나 편견에 영향을 받지 않았는지, 예약 수락/거부를 결정하는 요소들을 곰곰이 생각해 보세요.
                    </Typography>

                    <Typography sx={{fontSize : "13px", fontWeight : "bold", color : CustomColor.black}}>
                        현지법에 따라 특정 게스트를 호스팅할 수 없을 경우에는 어떻게 해야 하나요?
                    </Typography>
                    <Typography sx={{fontSize : "13px",  color : CustomColor.black, mb : "5px"}}>
                        숙소 페이지에 제약 사항을 공지하되, 이는 회원님 지역에 적용되는 법적 요구사항이며 회원님이 현지 법규를 준수하고 있는 것임을 명확히 밝혀주세요.
                    </Typography>

                    <Typography sx={{fontSize : "13px", fontWeight : "bold", color : CustomColor.black}}>
                        장애가 있는 게스트에게 숙소가 적합하지 않다고 생각하면 거절할 수 있나요?
                    </Typography>
                    <Typography sx={{fontSize : "13px",  color : CustomColor.black, mb : "5px"}}>
                        대부분의 경우 에어비앤비 호스트의 숙소가 미국 장애인법(ADA)에서 규정하는 기준을 준수할 필요는 없습니다. 그러나, 실제로 장애가 있거나 장애가 있다고 판단되는 게스트를 거절할 수 없습니다. 게스트에게 숙소의 접근성(또는 접근성이 떨어짐)에 대해 정확한 정보를 제공하여 장애가 있는 게스트가 해당 숙소의 적합성 여부를 스스로 판단하도록 해야 합니다.
                    </Typography>

                    <Typography sx={{fontSize : "13px", fontWeight : "bold", color : CustomColor.black}}>
                        커뮤니티 약속과 관련한 다른 질문이 있으면 어떻게 하나요?
                    </Typography>
                    <Typography sx={{fontSize : "13px",  color : CustomColor.black, mb : "5px"}}>
                        차별 금지 도움말 센터에서 자세한 도움말을 확인하세요. 또한 호스트 자료 및 도움말에서 에어비앤비의 차별금지 정책에 관해 호스트가 자주 묻는 질문과 답을 확인하실 수 있습니다.
                    </Typography>
                </DialogContent>
            </Dialog>

            <Dialog open={noSelect}
                onClose={()=>{setNoSelect(false)}}
            >
                <DialogTitle>
                    <IconButton size="small" onClick={()=>setNoSelect(false)}>
                        <ArrowBackIosIcon fontSize="small"/>
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Typography sx={{fontSize : "20px", fontWeight : "bold", color : CustomColor.black, mb : "10px"}}>
                        정말로 취소하시겠어요?
                    </Typography>
                    <Typography sx={{fontSize : "13px",  color : CustomColor.black, mb : "10px"}}>
                        에어비앤비의 커뮤니티 차별반대 서약과 서비스 약관에 동의하지 않으면, 계정을 만드실 수 없습니다.
                        사이트를 둘러볼 수 있지만 예약은 하실 수 없습니다.
                    </Typography>

                    <Typography sx={{fontSize : "13px", fontWeight : "bold", color : CustomColor.black}}>
                        동의 절차가 필요한 이유
                    </Typography>
                    <Typography sx={{fontSize : "13px",  color : CustomColor.black, mb : "10px"}}>
                       에어비앤비 커뮤니티 차별 반대 서약과 서비스 약관은 에어비앤비 커뮤니티와 에어비앤비가 서로에게 기대하는 바에 대한 커뮤니티의 이해를 돕기 위해 마련되었습니다.
                        에어비앤비 커뮤니티를 위한 반차별 약속과 서비스 약관에 관해 자세히 알아보세요.
                    </Typography>

                    <Typography sx={{fontSize : "13px", fontWeight : "bold", color : CustomColor.black}}>
                        다시 회원 가입을 희망하는 경우
                    </Typography>
                    <Typography sx={{fontSize : "13px",  color : CustomColor.black, mb : "10px"}}>
                       마음이 바뀌면 언제든지 에어비앤비 서비스 약관과 커뮤니티 차별 반대 서약에 동의하고 회원 가입을 완료하실 수 있습니다.
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <Box sx={{display:"flex", flexDirection :"column", width : "100%"}}>
                        <Button onClick={()=>{setNoSelect(false)}} sx={[
                            {width :"99%", color : "white", fontWeight :"bold", bgcolor : CustomColor.black},
                            {"&:hover":{backgroundColor : CustomColor.black}}
                        ]}>돌아가기</Button>

                        <Button onClick={()=>{onRemoveRegister()}} sx={[
                            {width :"99%", color : CustomColor.black, fontWeight :"bold", bgcolor : CustomColor.white, mt : "10px", borderStyle : "solid", borderWidth : 1, borderColor : CustomColor.black},
                            {"&:hover":{backgroundColor : CustomColor.white}}
                        ]}>거절하기</Button>

                    </Box>
                </DialogActions>

            </Dialog>
        </>
    );
}

export default TermsPerson;