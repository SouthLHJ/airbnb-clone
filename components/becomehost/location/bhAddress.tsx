import { IconButton,Divider , Box, Typography, Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useRef, useState ,ChangeEventHandler,Dispatch,SetStateAction,useEffect, MouseEventHandler} from "react"
import { BottomTextField, DetailSwitch, MiddleTextField, TopTextField } from "./bhAddresscustome";
import { CustomColor } from "../../../interfaces/setting/color";
import { Location } from "../../../interfaces/becomehost/accommodation";



type Props = {
    setDetail: Dispatch<SetStateAction<boolean>>,
    placeAbout : Location | undefined,
    setPlaceAbout: Dispatch<SetStateAction<any | null>>,
    setFixed : Dispatch<SetStateAction<boolean>>
}


function BecomeHostAddress({setDetail, placeAbout, setPlaceAbout, setFixed}: Props) {
    
    const [state, setState] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const [street, setStreet] = useState<string>("")
    const [apt, setApt] = useState<string>("")
    const [zipcode, setZipcode] = useState<string>("")
    const [countrycode, setCountrycode] = useState<string>("")
    const [checked, setChecked] = useState<boolean>(false);
    const [rgsterChk, setRgsterChk] = useState<boolean>(false);
    const [errChk, setErrChk] = useState<boolean>(false);

    
    useEffect(()=>{
        if(placeAbout){
            console.log(placeAbout)
            setState(placeAbout.state)
            setCity(placeAbout.city)
            setStreet(placeAbout.street)
            setZipcode(placeAbout.zipcode)
            setCountrycode(placeAbout.countrycode);
        }
    },[placeAbout])
    //func
    const saveText: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (evt)=>{
        switch(evt.target.id){
            case "state" :
                setState(evt.target.value)
                break;
            case "city" :
                setCity(evt.target.value)
                break;
            case "street" :
                setStreet(evt.target.value) 
                break;
            case "apt" :
                setApt(evt.target.value );
                break;
            case "zipcode" :
                setZipcode(evt.target.value) ;
                break;
            case "countrycode" :
                setCountrycode(evt.target.value) ;
                break;
        }
    }

    const onRegisterFirstOk : MouseEventHandler<HTMLButtonElement> = (evt)=>{
        if(!state && !city && !street && !zipcode && !countrycode){
            setErrChk(true);
        }else{
            setRgsterChk(true)
        }

    }

    const onRegisterLastOk : MouseEventHandler<HTMLDivElement> = (evt)=>{
        const data : Location = {
            countrycode : countrycode,
            state : state,
            city : city,
            street : street,
            zipcode : zipcode,
            apt : apt,
            view : checked,
            lat : placeAbout?.lat ?? "35",
            lng : placeAbout?.lng ?? "127",
        }
        setPlaceAbout(data)
        setFixed(true);
        setDetail(false);
    }

    return (
    <Box sx={{display : "flex" , flexDirection : "column", justifyContent :"space-between", bgcolor : "white", width : "80%", padding : 3, borderRadius : 3, overflowY :"scroll", boxShadow : "1px 1px 1px 1px rgba(0,0,0,0.2)"}}>
    
        <Box sx={{pl : 1, display :"flex", alignItems :"center"}}>
            <IconButton 
                size="small"
                onClick={() =>{setDetail(false); setPlaceAbout(undefined)}}
            >
                <ArrowBackIosIcon fontSize="small" />
            </IconButton>
            <Box sx={{width : "85%",display : "inline-flex",justifyContent :"center"}}>
                <Typography  sx={{display : "inline-flex", fontSize : "15px", justifyContent :"center", fontWeight : "bold"}}>
                   주소 확인
                </Typography>
            </Box>
        </Box>

        <Box>
            <Box sx={{width : "100%", mt : 1 }}>
                <TopTextField
                    label="주/도"
                    fullWidth
                    id="state"
                    value={state}
                    variant="filled"
                    style={{ marginTop: 11 }}
                    onChange={saveText}

                    error={!state && errChk}
                    
                />
                <MiddleTextField
                    label="도시"
                    fullWidth
                    id="city"
                    value={city}
                    variant="filled"
                    onChange={saveText}

                    error={!state && errChk}

                />
                <MiddleTextField
                    label="도로명"
                    fullWidth
                    id="street"
                    value={street}
                    variant="filled"
                    onChange={saveText}

                    error={!state && errChk}
                />
                <MiddleTextField
                    label="아파트 이름, 동호수 등 (선택사항) "
                    fullWidth
                    id="apt"
                    value={apt}
                    variant="filled"
                    onChange={saveText}
                />
                <MiddleTextField
                    label="우편번호"
                    fullWidth
                    id="zipcode"
                    value={zipcode}
                    variant="filled"
                    onChange={saveText}

                    error={!state && errChk}
                />
                <BottomTextField
                    label="국가 지역"
                    fullWidth
                    id="countrycode"
                    value={countrycode}
                    variant="filled"
                    onChange={saveText}

                    error={!state && errChk}
                />
            </Box>
        </Box>

        <Box sx={{mt : 2, mb :2}}>
            <Divider/>
        </Box> 

        <Box >
            <Box sx={{display : "flex"}}>
                <Box sx={{display : "flex", flexDirection : "column"}} flex={1}>
                    <Typography>구체적인 위치 표시하기</Typography>
                    <Typography fontSize={"12px"}>게스트에게 숙소 위치를 더욱 구체적으로 알려주실 수 있습니다. 숙소 주소는 예약이 확정된 후에만 공개됩니다.</Typography>
                </Box>
                <DetailSwitch
                    checked={checked}
                    onChange={(evt)=>{setChecked(evt.target.checked)}}
                />
            </Box>

        </Box> 

        <Box sx={{display:"flex", flexDirection: "row-reverse", alignItems :"flex-end" }}>
            <Button onClick={(evt)=>onRegisterFirstOk(evt)} sx={[{bgcolor : rgsterChk ? CustomColor.whiteHover:CustomColor.black, mt :2, bottom : 0},{"&:hover":{bgcolor : CustomColor.blackHover}}]} disabled={rgsterChk}>
                <Typography sx={{color:CustomColor.white}}>확인</Typography>
            </Button>
            {
                rgsterChk &&
                <Box sx={{mr : 1}} onClick={(evt)=>onRegisterLastOk(evt)}>
                    <Typography fontWeight={"bold"}  sx={{mt : 1, cursor:"pointer", textDecoration : "underline", fontSize : "13px"}}>예, 주소가 정확합니다.</Typography>
                </Box>
            }
        </Box>

    </Box>
    );
}

export default BecomeHostAddress;