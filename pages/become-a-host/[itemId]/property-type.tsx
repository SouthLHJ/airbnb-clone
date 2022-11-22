import { GetServerSideProps, GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { Button, Typography, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import {useState,useEffect} from "react"
import BecomeHostComment from "../../../components/becomehost/comment";
import { CustomColor } from "../../../interfaces/setting/color";
import BecomehostBottom from "../../../components/becomehost/bhBottom";
import Type from "../../../components/becomehost/type";
import BecomeHostSaveBottom from "../../../components/becomehost/bhSaveBottom";
import { useAccommodationDispatch, useAccommodationState } from "../../../contexts/accommodation";
import { Accommodation } from "../../../interfaces/becomehost/accommodation";

function PropertyType({item}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();

    const {itemId} = router.query;
    const [type, setType] = useState<string>(item.type ?? "공동 주택");
    
    //func
    const onNextPage = async()=>{
        //DB에 데이터 추가하기
        const rcv = await fetch("/api/becomehost/update",{
            method : "POST",
            body : JSON.stringify({
                _id : itemId,
                type : type
            }),
            headers : {
                "content-type" : "application/json"
            }
        })        
        const rst = await rcv.json();
        // console.log(rst);
        //다음페이지로 이동
        if(rst.result){
            router.push("/become-a-host/"+itemId+"/privacy-type")
        }
    }
    const onPrevPage = ()=>{
        router.push("/become-a-host/"+itemId+"/property-type-group")
    }

    const onSave = async()=>{
        const rcv = await fetch("/api/becomehost/update",{
            method : "POST",
            body : JSON.stringify({
                _id : itemId,
                type : type
            }),
            headers : {
                "content-type" : "application/json"
            }
        })        
        const rst = await rcv.json();
        // console.log(rst);
        //첫 페이지로 이동
        if(rst.result){
            router.push("/become-a-host/")
        }
    }

    return (
    <Grid container component="main" sx={{ height: "100vh" }}>
        <BecomeHostComment comment={"다음 중 숙소를 잘 설명하는 문구는 무엇인가요?"}/>
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
            <BecomeHostSaveBottom onSave={onSave}/>

            <Box flex={1} style={{display: "flex",flexDirection: "column",    alignItems: "center", justifyContent :"center",   width: "100%"}}>
                <Type type={type} setType={setType}  typeGroup={item.typeGroup}/>
            </Box>

            <BecomehostBottom onNextPage={onNextPage} onPrevPage={onPrevPage} page={2}/>
        </Grid>
    </Grid>
    );
}

export default PropertyType;



PropertyType.layout = "L2";


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
