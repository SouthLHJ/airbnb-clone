import { AppBar, Button, Grid, ToggleButton, Typography } from "@mui/material";
import { CustomColor } from "../../interfaces/setting/color";
import Box from "@mui/material/Box";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect,useState } from "react";
import { BecomeHostResponse, Category, Category_Type } from "../../interfaces/becomehost/accommodation";
import { useAccommodationState } from "../../contexts/accommodation";

type Props = {
    setType:Dispatch<SetStateAction<string>>,
    type:string,
    typeGroup : string,
}

function Type({setType,type,typeGroup}:Props) {
    const [list , setList] = useState<Category_Type[]>([]);
    useEffect(()=>{
        onInit();
    },[])

    const onInit = async()=>{
        const rcv= await fetch("/api/becomehost/type-group",{method : "get"});
        const rst :BecomeHostResponse = await rcv.json();
        if(rst.result){
            
            // console.log(rst.datas, state?.typeGroup)
            const category = rst.datas as Category[]
            const t = category.find(one=>{
                return one.group === typeGroup
            })
            if(t){
                // console.log(t.types);
                setList(t.types);
            }
        }
    }


    return (
    <>
    {
        
        list.map((one)=>{
            return (
                <ToggleButton key={one.property}
                    value={one.property}
                    onClick={()=>setType(one.property)}
                    sx={{width :"80%", borderColor :CustomColor.blackHover, borderWidth : 2, mb : 1}}
                    selected={type === one.property}
                    >
                        <Box sx={{
                        display: "flex",
                        flexDirection : "column",
                        width: "100%",
                        alignItems: "flex-start",
                        }}>
                            <Typography flex={1} fontWeight={"bold"} fontSize="18px">{one.property}</Typography>
                            <Typography flex={1} fontSize="13px" textAlign={"left"}>{one.description}</Typography>
                        </Box>
                </ToggleButton>
            )
        })
    }
                
    
    </>
    );
}

export default Type;