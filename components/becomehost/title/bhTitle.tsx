import {Dispatch,SetStateAction,useState,useEffect} from "react"
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { alpha, styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';

import CancelIcon from '@mui/icons-material/Cancel';
import {Box,Typography} from "@mui/material"
import { CustomColor } from "../../../interfaces/setting/color";


type Props = {
  title: string,
  setTitle: Dispatch<SetStateAction<string>>,
  type : string,
}

function BecomeHostTitle({title, setTitle,type}:Props) {
  const [err,setErr]= useState<boolean>(false);

  useEffect(()=>{
    if(title.length>32){
      setErr(true)
    }else{
      setErr(false)
    }
  },[title])

  return (
      <Box>
        <Box>
          <Typography fontSize={"30px"} fontWeight={"bold"}>이제 {type}에 이름을 지⁠어⁠주⁠세⁠요</Typography>
        </Box>
        <Box>
          <Typography color={CustomColor.blackHover}>숙소 이름은 짧을수록 효과적입니다. 나중에 언제든지 변경할 수 있으니, 너무 걱정하지 마세요.</Typography>
        </Box>
        <Box>
          <MiddleTextField
            multiline
            fullWidth
            value={title}
            onChange={(evt)=>{
              setTitle(evt.target.value)
            }}
            error={err}
          />
          <Typography color={CustomColor.blackHover} fontSize={"12px"}>{title.length}/32</Typography>
          { err &&
            <Typography color={"red"}><CancelIcon sx={{ fontSize: "18px" }} />32자까지 입력할 수 있습니다.</Typography>
          }
        </Box>
      </Box>
    );
}

export default BecomeHostTitle;


const MiddleTextField = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{rows : 5 } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    border: '1px solid ',
    overflow: 'hidden',
    borderRadius: "20px",
    borderColor : CustomColor.black,
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: 'transparent',
      borderColor : CustomColor.blackHover,
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: CustomColor.black,
      color : CustomColor.black,
        
    },
    '&.Mui-error' :{
      color : "red",
      borderColor : "red",
      backgroundColor: "red"
    }
  },
}));