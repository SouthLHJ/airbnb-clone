import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { Button, Container, Grid, IconButton, Typography } from "@mui/material";
import Box  from "@mui/material/Box";

import { useSession } from "next-auth/react";
import BecomeHostComment from "../../components/becomehost/comment";
import { CustomColor } from "../../interfaces/setting/color";
import { useRouter } from 'next/router';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { Accommodation } from '../../interfaces/becomehost/accommodation';
import mongoose from 'mongoose';

export const BoxStyle= {display :"flex", flexDirection:"row", borderStyle:'solid', borderColor :CustomColor.blackHover, borderWidth :2, borderRadius : 2, pt:2, pb :2, pl : 1, pr:1, alignItems : "center", mb : 1 , cursor : "pointer"}
export const BoxStyleHover  =  {"&:hover" : {backgroundColor : CustomColor.whiteHover}}
const BoxIconLeft = {backgroundColor : CustomColor.whiteHover, borderRadius : 1, mr : "5px", fontSize : "18px"}
const BoxIconRight = {fontSize: "15px", color:CustomColor.black}

function BecomeAHostIndex({items}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const {data, status} = useSession();
    const router = useRouter();

    let comment = `${data?.user?.name}님, `
    let comment2 = "환영합니다."
        

    //func
    const onUnComplete = async(_id : mongoose.Types.ObjectId | undefined)=>{
        const rcv = await fetch("/api/becomehost/init", {method: "post", body : JSON.stringify({_id: _id}), headers : { "content-type" : "application/json"}})
        const rst = await rcv.json();
        const d : Accommodation = rst.data
        console.log(d)

        if(d.typeGroup && !d.type){
            router.push("/become-a-host/"+_id+"/property-type")
        }else if(d.type && !d.privacy){
            router.push("/become-a-host/"+_id+"/privacy-type")
        }else if(d.privacy && !d.location){
            router.push("/become-a-host/"+_id+"/locations")
        }else if(d.location && !d.floorPlan){
            router.push("/become-a-host/"+_id+"/floor-plan")
        }else if(d.floorPlan && !d.amenities){
            router.push("/become-a-host/"+_id+"/amenities")
        }else if(d.amenities && !d.photos){
            router.push("/become-a-host/"+_id+"/photos")
        }else if(d.photos && !d.title){
            router.push("/become-a-host/"+_id+"/title")
        }else if(d.title && !d.description){
            router.push("/become-a-host/"+_id+"/description")
        }else if(d.description && !d.price){
            router.push("/become-a-host/"+_id+"/price")
        }else if(d.price && !d.register){
            router.push("/become-a-host/"+_id+"/receipt")
        }
    }
    const onNewHouse = ()=>{
        router.push("/become-a-host/intro")
    }
    const onCopyHouse = ()=>{

    }

    return (
    <Grid container component="main" sx={{ height: "100vh" }}>
        <BecomeHostComment comment={comment} comment2={comment2}/>
        <Grid
            xs={6}
            item
            style ={{
                display: "flex",
                flexDirection : "column",
                // alignItems: "center",
                backgroundColor: CustomColor.white,
                padding: "10px",
                justifyContent: "center"
            }}
        >
            <Box sx={{height : "20%", overflowY : "scroll"}}>
                <Box sx={{mb : 1}}>
                    <Typography fontWeight={"bold"} fontSize={"20px"}>숙소 등록 완료하기</Typography>
                </Box>
                    {
                        items.map(one=>{
                            if(one.register){
                                return null;
                            }
                            return (
                                <Box key={(one._id)?.toString()} sx={[BoxStyle,BoxStyleHover]} onClick={()=>onUnComplete(one._id)} >
                                    <HomeIcon sx={BoxIconLeft}/>
                                    <Typography flex={1} fontWeight={"bold"} fontSize="13px">{one.typeGroup} 숙소 등록일 :{one.createdAt.toLocaleString().slice(0,10)}</Typography>
                                    <ArrowForwardIosIcon  sx={BoxIconRight}/>
                                </Box>
                            )
                        })

                    }
            </Box>

            <Box sx={{height : "28%"}}>
                <Box sx={{mb : 1}}>
                    <Typography fontWeight={"bold"} fontSize={"20px"}>숙소 등록 시작하기</Typography>
                </Box>
                <Box sx={[BoxStyle,BoxStyleHover]} onClick={()=>onNewHouse()}>
                    <AddIcon sx={BoxIconLeft}/>
                    <Typography flex={1} fontWeight={"bold"} fontSize="13px" >새로운 숙소 등록하기</Typography>
                    <ArrowForwardIosIcon  sx={BoxIconRight}/>
                </Box>
                <Box sx={[BoxStyle,BoxStyleHover]} onClick={()=>onCopyHouse()}>
                    <ContentCopyIcon sx={BoxIconLeft}/>
                    <Typography flex={1} fontWeight={"bold"} fontSize="13px">기존 숙소 복사하기</Typography>
                    <ArrowForwardIosIcon  sx={BoxIconRight}/>
                </Box>
            </Box>

            <Box sx={{height : "28%"}}>
                <Typography>숙소 등록에 도움이 필요하신가요?</Typography>
            </Box>
        </Grid>
    </Grid>
    );
}

export default BecomeAHostIndex;

BecomeAHostIndex.layout = "L2";




export const getServerSideProps : GetServerSideProps<{items  : Accommodation[]}> = async(context)=>{
    const token = await unstable_getServerSession(context.req,context.res,authOptions);
    // console.log(process.env.NEXT_PUBLIC_SERVER_URI+"/api/becomehost/init?");
    const rcv = await fetch(process.env.NEXT_PUBLIC_SERVER_URI+"/api/becomehost/init?"+`hostName=${token?.user?.email}`)
    const rst = await rcv.json();
    return {
        props :{
            items : rst.data
        }
    }
}