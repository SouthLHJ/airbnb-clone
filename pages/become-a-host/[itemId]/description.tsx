import { GetServerSideProps, GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { Button, Typography, Grid, ToggleButton } from "@mui/material";
import Box from "@mui/material/Box";
import {useState,useEffect,useContext} from "react"
import BecomeHostComment from "../../../components/becomehost/comment";
import { CustomColor } from "../../../interfaces/setting/color";
import BecomehostBottom from "../../../components/becomehost/bhBottom";
import BecomeHostSaveBottom from "../../../components/becomehost/bhSaveBottom";
import { Accommodation, Amenities, Description, FloorPlan, Location } from "../../../interfaces/becomehost/accommodation";
import BecomeHostDescription from "../../../components/becomehost/description/bhDescription";
import { AppContext } from "../../_app";


function Descriptions({item}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const loading = useContext(AppContext);
    const {itemId} = router.query;

    const [comment, setComment] = useState<string>("")
    const [select, setSelect] = useState<string[]>([]);

    useEffect(()=>{
        if(item.description){
            setSelect(item.description.categories);
            setComment(item.description.comment);
        }
        loading?.done();
    },[])


    //func
    const onNextPage = async()=>{
        //DB에 데이터 추가하기
        const rst = await updateDB({
            categories : select,
            comment : comment
        });
        console.log(rst);
        // //다음페이지로 이동
        if(rst.result){
            router.push("/become-a-host/"+itemId+"/price")
        }
    }
    const onPrevPage = ()=>{
        router.push("/become-a-host/"+itemId+"/title")
    }

    const onSave = async()=>{
       
        //DB에 데이터 추가하기
        const rst = await updateDB({
            categories : select,
            comment : comment
        });
        console.log(rst);
        //첫 페이지로 이동
        // if(rst.result){
        //     router.push("/become-a-host/")
        // }
    }

    const updateDB = async(data : Description)=>{
        
        const rcv = await fetch("/api/becomehost/update",{
            method : "POST",
            body : JSON.stringify({
                _id : itemId,
                description : data
            }),
            headers : {
                "content-type" : "application/json"
            }
        })
        return await rcv.json()
    }
    return (
    <Grid container component="main" sx={{ height: "100vh" }}>
        <BecomeHostComment comment={"이제 돔하우스에 대해 설⁠명⁠해⁠주⁠세⁠요"}/>
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
                <BecomeHostDescription select={select} setSelect={setSelect} comment={comment} setComment={setComment} />
            </Box>

            <BecomehostBottom onNextPage={onNextPage} onPrevPage={onPrevPage} page={9}/>
        </Grid>
    </Grid>
    );
}

export default Descriptions;



Descriptions.layout = "L2";


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