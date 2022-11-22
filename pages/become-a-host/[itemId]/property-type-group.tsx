import { AppBar, Button, Grid, ToggleButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { GetServerSideProps, GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";
import { BoxStyle, BoxStyleHover } from "..";
import BecomehostBottom from "../../../components/becomehost/bhBottom";
import BecomeHostComment from "../../../components/becomehost/comment";
import TypeGroup from "../../../components/becomehost/type-group";
import { useAccommodationDispatch, useAccommodationState } from "../../../contexts/accommodation";
import { Accommodation, BecomeHostResponse } from "../../../interfaces/becomehost/accommodation";
import { CustomColor } from "../../../interfaces/setting/color";

function BecomeHostPTG({item}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const {data,status} = useSession();
    const dispatch = useAccommodationDispatch();

    const [type , setType] = useState<string>(item.typeGroup);

    // console.log(item)

    //func
    const onNextPage = async()=>{
        //DB에 데이터 생성하기 생성된 데이터의 ID를 얻어오고.. 
        const sndData = {
            _id : item._id,
            typeGroup : type,
        }
        const res = await fetch("/api/becomehost/update",{
            method : "post",
            body : JSON.stringify(sndData),
            headers : {
                "content-type" : "application/json"
            }
        })
        const rst : BecomeHostResponse = await res.json();
        console.log(rst);
        if(rst.result && rst.datas){
            //다음페이지로 이동
            const data = rst.datas as Accommodation
            const itemId = data._id ;
            dispatch({type : "save", payload : data})
            router.push("/become-a-host/"+itemId+"/property-type")

        }else{
            console.log("에러", rst.error)
        }
        
        
    }

    const onPrevPage = ()=>{
        router.push("/become-a-host/")
    }

    return (
    <Grid container component="main" sx={{ height: "100vh" }}>
        <BecomeHostComment comment={"호스팅할 숙소 유형을 알려주세요"}/>
        <Grid
            flex={1}
            xs={6}
            item
            style ={{
                display: "flex",
                flexDirection : "column",
                alignItems: "center",
                backgroundColor: CustomColor.white,
                padding: "10px",
                justifyContent: "center"
            }}
        >
            <Box flex={1} style={{display: "flex",flexDirection: "column",    alignItems: "center", justifyContent :"center",   width: "100%"}}>
                <TypeGroup type={type} setType={setType}/>
            </Box>

            <BecomehostBottom onNextPage={onNextPage} onPrevPage={onPrevPage} page={1}/>
        </Grid>
    </Grid>
    );
}

export default BecomeHostPTG;

BecomeHostPTG.layout = "L2";

export const getServerSideProps : GetServerSideProps<{item  : Accommodation}> = async(context)=>{
    // console.log(context.params)
    // const token = await unstable_getServerSession(context.req,context.res,authOptions);
    // console.log(token);
    const rcv = await fetch(process.env.NEXT_PUBLIC_SERVER_URI+"/api/becomehost/init",{
        method: "post",
        body : JSON.stringify({_id : context!.params!.itemId}),
        headers : {
            "content-type" : "application/json"
        }
    })
    const rst = await rcv.json();

    return {
        props :{
            item : rst.data
        }
    }
}

