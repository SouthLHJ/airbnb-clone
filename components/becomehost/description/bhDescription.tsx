import { Box, Button, Typography } from "@mui/material";
import {Dispatch,SetStateAction} from "react"
import { CustomColor } from "../../../interfaces/setting/color";
import DescriptionComment from "./comment";
import DescriptionSelect from "./select";


type Props = {
    select: string[],
    setSelect: Dispatch<SetStateAction<string[]>>,
    comment: string,
    setComment: Dispatch<SetStateAction<string>>
}


function BecomeHostDescription({select,setSelect,comment,setComment}:Props) {

    //func
    const onChoice = (comment:string)=>{
        if(select.includes(comment)){
            const newarr = select.filter(one=>{
                return one !== comment
            })    
            setSelect(newarr)
        }else{
            if(select.length === 2){
                let a = [...select]
                a.shift();
                setSelect([...a,comment]);
            }else{
                const newarr = [...select,comment]
                setSelect(newarr)
            }
        }
    }

    return (
        <Box sx={{width  : "100%"}}>
            <Typography>숙소의 특징이 잘 드러나는 문구를 최대 2개까지 선택하실 수 있습니다. 선택한 문구로 숙소 설명을 작성하실 수 있도록 도와드릴게요.</Typography>
            <Typography>작성 중에 변경할 경우, 작성 중인 내용이 사라집니다.</Typography>
            <DescriptionSelect select={select} onChoice={onChoice}/>
            <DescriptionComment select={select} comment={comment}  setComment={setComment}   />
        </Box>
      );
}

export default BecomeHostDescription;