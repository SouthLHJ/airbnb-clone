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
import { useAccommodationDispatch, useAccommodationState } from "../../../contexts/accommodation";
import { Accommodation, FloorPlan, Location } from "../../../interfaces/becomehost/accommodation";
import BecomeHostMap from "../../../components/becomehost/location/bhMap";
import BecomeHostFloorPlan from "../../../components/becomehost/bhfloorplan";


function FloorPlans({item}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();

    const {itemId} = router.query;

    const [guestn, setGuestn] = useState<number>(0);
    const [bedn, setBedn] = useState<number>(0);
    const [bathn, setBathn] = useState<number>(0);

    useEffect(()=>{
        if(item.floorPlan){
            setGuestn(item.floorPlan.guest);
            setBathn(item.floorPlan.bathroom);
            setBedn(item.floorPlan.bed);
        }
    },[])

    //func
    const onNextPage = async()=>{
        // console.log(guestn,bedn,bathn)
        const save : FloorPlan = {
            guest : guestn,
            bed : bedn,
            bathroom : bathn
        }
        //DB에 데이터 추가하기
        const rcv = await fetch("/api/becomehost/update",{
            method : "POST",
            body : JSON.stringify({
                _id : itemId,
                floorPlan : save
            }),
            headers : {
                "content-type" : "application/json"
            }
        })        
        const rst = await rcv.json();
        // console.log(rst);
        //다음페이지로 이동
        if(rst.result){
            router.push("/become-a-host/"+itemId+"/amenities")
        }
    }
    const onPrevPage = ()=>{
        router.push("/become-a-host/"+itemId+"/locations")
    }

    const onSave = async()=>{
        const save : FloorPlan = {
            guest : guestn,
            bed : bedn,
            bathroom : bathn
        }
        //DB에 데이터 추가하기
        const rcv = await fetch("/api/becomehost/update",{
            method : "POST",
            body : JSON.stringify({
                _id : itemId,
                floorPlan : save
            }),
            headers : {
                "content-type" : "application/json"
            }
        })        
        const rst = await rcv.json();
        //첫 페이지로 이동
        if(rst.result){
            router.push("/become-a-host/")
        }
    }
    return (
    <Grid container component="main" sx={{ height: "100vh" }}>
        <BecomeHostComment comment={"숙소에서 맞이할 최대 인원수를 알려주세요."}/>
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
                <BecomeHostFloorPlan guestn={guestn} setGuestn={setGuestn} bedn={bedn} setBedn={setBedn} bathn={bathn} setBathn={setBathn}/>
            </Box>

            <BecomehostBottom onNextPage={onNextPage} onPrevPage={onPrevPage} page={5}/>
        </Grid>
    </Grid>
    );
}

export default FloorPlans;



FloorPlans.layout = "L2";


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
