import { GetServerSideProps, GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { Button, Typography, Grid, ToggleButton } from "@mui/material";
import Box from "@mui/material/Box";
import {useState,useEffect} from "react"
import BecomeHostComment from "../../../components/becomehost/comment";
import { CustomColor } from "../../../interfaces/setting/color";
import BecomehostBottom from "../../../components/becomehost/bhBottom";
import BecomeHostSaveBottom from "../../../components/becomehost/bhSaveBottom";
import { Accommodation, Amenities, Description, FloorPlan, Location } from "../../../interfaces/becomehost/accommodation";
import BecomeHostPrice from "../../../components/becomehost/price/bhPrice";
import { useAccommodationDispatch, useAccommodationState } from "../../../contexts/accommodation";
import BecomeHostReceipt from "../../../components/becomehost/receipt/bhReceipt";


function Receipts({item}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const dispatch = useAccommodationDispatch();
    const house = useAccommodationState();
    const {itemId} = router.query;


    useEffect(()=>{
        dispatch({type:"save", payload : item})
    },[])


    //func
    const onNextPage = async()=>{
        //DB에 데이터 추가하기
        const rst = await updateDB();
        console.log(rst);
        //다음페이지로 이동
        if(rst.result){
            router.push("/become-a-host")
        }
    }
    const onPrevPage = ()=>{
        router.push("/become-a-host/"+itemId+"/price")
    }

    const onSave = async()=>{
       
        //DB에 데이터 추가하기
        const rst = await updateDB();
        console.log(rst);
        // 첫 페이지로 이동
        if(rst.result){
            router.push("/become-a-host/")
        }
    }

    const updateDB = async()=>{
        const rcv = await fetch("/api/becomehost/update",{
            method : "POST",
            body : JSON.stringify({
                _id : itemId,
                register : new Date()
            }),
            headers : {
                "content-type" : "application/json"
            }
        })
        return await rcv.json()
    }
    return (
    <Grid container component="main" sx={{ height: "100vh" }}>
        <BecomeHostComment comment={"숙소 검토하기"}/>
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

            <Box flex={1} style={{display: "flex",flexDirection: "column",    alignItems: "center", justifyContent :"center",   width: "100%", marginTop:10, marginBottom:10}}>
                <BecomeHostReceipt />
            </Box>

            <BecomehostBottom onNextPage={onNextPage} onPrevPage={onPrevPage} page={10} register={true}/>
        </Grid>
    </Grid>
    );
}

export default Receipts;



Receipts.layout = "L2";


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