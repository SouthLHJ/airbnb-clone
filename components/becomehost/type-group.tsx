import { AppBar, Button, Grid, ToggleButton, Typography } from "@mui/material";
import { CustomColor } from "../../interfaces/setting/color";
import Box from "@mui/material/Box";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect,useState } from "react";
import { BecomeHostResponse, Category } from "../../interfaces/becomehost/accommodation";

type Props = {
    setType:Dispatch<SetStateAction<string>>,
    type:string,
}

function TypeGroup({setType,type}:Props) {
    const [list , setList] = useState<Category[]>();
    useEffect(()=>{
        onInit();
    },[])

    const onInit = async()=>{
        const rcv= await fetch("/api/becomehost/type-group",{method : "get"});
        const rst :BecomeHostResponse = await rcv.json();
        if(rst.result){
            // console.log(rst.datas)
            const d :Category[] = rst.datas as Category[];
            setList(d);
        }
    }


    return (
    <>
    {
        list?.map((one)=>{
            return (
                <ToggleButton key={one.group}
                    value={one.group}
                    onClick={()=>setType(one.group)}
                    sx={{width :"80%", borderColor :CustomColor.blackHover, borderWidth : 2, mb : 1}}
                    selected={type === one.group}
                    >
                        <Box sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        }}>
                            <Typography flex={1} fontWeight={"bold"} fontSize="13px">{one.group}</Typography>
                            <Image
                                alt={one.group}
                                src={one.image}
                                width={46}
                                height={46}
                                style={{ borderRadius: "5px" }}
                            />
                        </Box>
                </ToggleButton>
            )
        })
    }
                
    
    </>
    );
}

export default TypeGroup;