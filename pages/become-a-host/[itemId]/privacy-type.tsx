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
import { Accommodation } from "../../../interfaces/becomehost/accommodation";

function PrivacyType({item}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const state = useAccommodationState();
    const dispatch = useAccommodationDispatch();

    const {itemId} = router.query;
    const [type, setType] = useState<string>(item.privacy ?? "공간 전체");
    
    //func
    const onNextPage = async()=>{
        //DB에 데이터 추가하기
        const rcv = await fetch("/api/becomehost/update",{
            method : "POST",
            body : JSON.stringify({
                _id : itemId,
                privacy : type
            }),
            headers : {
                "content-type" : "application/json"
            }
        })        
        const rst = await rcv.json();
        //다음페이지로 이동
        if(rst.result){
            router.push("/become-a-host/"+itemId+"/locations")
        }
    }
    const onPrevPage = ()=>{
        router.push("/become-a-host/"+itemId+"/property-type")
    }

    const onSave = async()=>{
        //DB에 데이터 추가하기
        const rcv = await fetch("/api/becomehost/update",{
            method : "POST",
            body : JSON.stringify({
                _id : itemId,
                privacy : type
            }),
            headers : {
                "content-type" : "application/json"
            }
        })        
        const rst = await rcv.json();
        //다음페이지로 이동
        if(rst.result){
            router.push("/become-a-host/")
        }
    }

    return (
    <Grid container component="main" sx={{ height: "100vh" }}>
        <BecomeHostComment comment={"게스트가 머무르게 될 숙소의 종류가 무엇인가요?"}/>
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
                <ToggleButton 
                    value={"공간 전체"}
                    onClick={()=>setType("공간 전체")}
                    sx={{width :"80%", borderColor :CustomColor.blackHover, borderWidth : 2, mb : 1}}
                    selected={type === "공간 전체"}
                    >
                        <Box sx={{
                        display: "flex",
                        flexDirection : "column",
                        width: "100%",
                        alignItems: "flex-start",
                        padding : 1,
                        }}>
                            <Typography flex={1} fontWeight={"bold"} fontSize="18px">{"공간 전체"}</Typography>
                        </Box>
                </ToggleButton>

                <ToggleButton 
                    value={"개인실"}
                    onClick={()=>setType("개인실")}
                    sx={{width :"80%", borderColor :CustomColor.blackHover, borderWidth : 2, mb : 1}}
                    selected={type === "개인실"}
                    >
                        <Box sx={{
                        display: "flex",
                        flexDirection : "column",
                        width: "100%",
                        alignItems: "flex-start",
                        padding : 1,
                        }}>
                            <Typography flex={1} fontWeight={"bold"} fontSize="18px">{"개인실"}</Typography>
                        </Box>
                </ToggleButton>
                <ToggleButton 
                    value={"다인실"}
                    onClick={()=>setType("다인실")}
                    sx={{width :"80%", borderColor :CustomColor.blackHover, borderWidth : 2, mb : 1}}
                    selected={type === "다인실"}
                    >
                        <Box sx={{
                        display: "flex",
                        flexDirection : "column",
                        width: "100%",
                        alignItems: "flex-start",
                        padding : 1,
                        }}>
                            <Typography flex={1} fontWeight={"bold"} fontSize="18px">{"다인실"}</Typography>
                        </Box>
                </ToggleButton>
            </Box>

            <BecomehostBottom onNextPage={onNextPage} onPrevPage={onPrevPage} page={3}/>
        </Grid>
    </Grid>
    );
}

export default PrivacyType;



PrivacyType.layout = "L2";



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
