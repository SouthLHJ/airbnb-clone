import { AppBar, Button, Grid, ToggleButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { GetServerSideProps, GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";
import { BoxStyle, BoxStyleHover } from ".";
import BecomehostBottom from "../../components/becomehost/bhBottom";
import BecomeHostComment from "../../components/becomehost/comment";
import TypeGroup from "../../components/becomehost/type-group";
import { useAccommodationDispatch, useAccommodationState } from "../../contexts/accommodation";
import { Accommodation, BecomeHostResponse } from "../../interfaces/becomehost/accommodation";
import { CustomColor } from "../../interfaces/setting/color";

function BecomeHostPTG() {
    const router = useRouter();
    const {data,status} = useSession();
    const dispatch = useAccommodationDispatch();

    const [type , setType] = useState<string>("아파트");

    

    //func
    const onNextPage = async()=>{
        //DB에 데이터 생성하기 생성된 데이터의 ID를 얻어오고.. 
        const sndData : Accommodation = {
            hostName  : data!.user!.email as string,
            typeGroup : type,
            createdAt : new Date()
        }
        const res = await fetch("/api/becomehost/type-group",{
            method : "post",
            body : JSON.stringify(sndData),
            headers : {
                "content-type" : "application/json"
            }
        })
        const rst : BecomeHostResponse = await res.json();
        // console.log(rst);
        if(rst.result && rst.datas){
            //다음페이지로 이동
            const data = rst.datas as Accommodation
            const itemId = data._id ;
            dispatch({type : "save", payload : data})
            router.push("/become-a-host/"+itemId+"/property-type")

        }else{
            console.log("에러")
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

