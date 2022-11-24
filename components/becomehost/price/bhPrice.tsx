import { Box, Button, Typography ,InputAdornment} from "@mui/material";
import {Dispatch,SetStateAction,useEffect,useState} from "react"
import { CustomColor } from "../../../interfaces/setting/color";
import {HiPlus, HiMinus} from "react-icons/hi"


import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";

type Props = {
    price: number
    setPrice: Dispatch<SetStateAction<number>>
}

const sltBox = {display :"flex", flexDirection :"row", alignItems:"center",justifyContent :"center",width : "40px",height : "40px",borderStyle : "solid", borderRadius : 10, borderColor : CustomColor.blackHover, borderWidth :1,cursor : "pointer"}
const sltBoxHover= {"&:hover" :{backgroundColor : CustomColor.whiteHover}}

function BecomeHostPrice({price,setPrice}:Props) {
    const [limMin, setLimMin] =  useState<boolean>(false);

    useEffect(()=>{
        if(price  < 13401){
            setLimMin(true)
        }else{
            setLimMin(false)
        }
    },[price])

    const onMinus = ()=>{
        if(price  <= 13401){
            return;
        }
        setPrice(p=>p-1000)
    }

    const onPlus = ()=>{
        setPrice(p=>p+1000)
    }

    return (
    <>
        <Box sx={{display :"flex", flexDirection :"row", alignItems:"center"}}>
            <Box sx={[sltBox,sltBoxHover,limMin && {cursor : "no-drop"}]}
                onClick={()=>onMinus()}
            >
                <HiMinus/>
            </Box>
            <PriceTextField
                sx={{
                    ml : 1,
                    mr : 1,
                    fontWeight : "bold",
                    fontSize:"30px",
                    width : "200px"
                }}
                error={limMin}
                value={price}
                onChange={(evt)=>setPrice(Number(evt.target.value))}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <Typography>￦</Typography>
                    </InputAdornment>
                    ),
                }}
            />
            <Box sx={[sltBox,sltBoxHover]}
                onClick={()=>onPlus()}
            >
                <HiPlus/>
            </Box>
        </Box>

            
        <Box sx={{mt : 2}}>
                <Typography>/박</Typography>
        </Box>

        <Box sx={{mt : 2}}>
             <Typography sx={{color : limMin ? "red" : CustomColor.black}}>기본 요금으로 ₩13,401~ ₩13,400,392 사이의 값을 입력해 주세요.</Typography>
        </Box>
    </>
    );
}

export default BecomeHostPrice;


const PriceTextField = styled((props: TextFieldProps) => (
    <TextField
      InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
      {...props}
    />
  ))(({ theme }) => ({
    // "& label.Mui-focused": {
    //   color: "green"
    // },
    // "& .MuiInput-underline:after": {
    //   borderBottomColor: "green"
    // },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: CustomColor.blackHover
      },
      "&:hover fieldset": {
        borderColor: CustomColor.black
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
        borderWidth : "2px"
      },
      "& input":{
        fontWeight : "bold",
        textAlign: "center",
        fontSize : "20px"
      }
    },
    "& .MuiInputAdornment-root" :{
        marginRight : "5px",
        color : CustomColor.black
    }
}));