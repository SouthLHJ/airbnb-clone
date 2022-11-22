import {Dispatch,SetStateAction,useState,useEffect,useRef} from "react"
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { alpha, styled } from '@mui/material/styles';

import { Box, Button, Typography } from "@mui/material";
import { AutoComment } from "../../../interfaces/becomehost/descriptionComment";
import { CustomColor } from "../../../interfaces/setting/color";
type Props = {
    select: string[],
    comment: string,
    setComment: Dispatch<SetStateAction<string>>
}


function DescriptionComment({select,comment,setComment}:Props) {

    useEffect(()=>{
        let autoComment = `${select[0] ? AutoComment[select[0]] : ""}`
        autoComment += `${select[1] ? AutoComment[select[1]] : ""}`
        setComment(autoComment)
    },[select])


    return (
        <Box sx={{mt : 2}}>
            <MiddleTextField 
                multiline
                fullWidth
                value={comment}
                onChange={(evt)=>{
                    setComment(evt.target.value)
                }}
            />
        </Box>
      );
}

export default DescriptionComment;


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