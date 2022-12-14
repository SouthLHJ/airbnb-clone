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
import { Accommodation, Amenities, FloorPlan, Location } from "../../../interfaces/becomehost/accommodation";
import BecomeHostAmenities from "../../../components/becomehost/amenities/bhAmenities";
import BecomeHostPhotos from "../../../components/becomehost/photos/bhPhotos";
import { usePhotosDispatch, usePhotosState, useUrlsDispatch, useUrlsState } from "../../../contexts/photos";
import { AppContext } from "../../_app";


function Photos({item}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const loading = useContext(AppContext)
    const router = useRouter();
    const photo = usePhotosState();
    const dispatch = usePhotosDispatch();
    const urls = useUrlsState();
    const urlsdispatch = useUrlsDispatch();

    const {itemId} = router.query;

    useEffect(()=>{
        if(item.photos){
            urlsdispatch({type : "save", payload : {origin : item.photos, change : item.photos}})
        }
    },[])
    
    //func
    const onNextPage = async()=>{
        // console.log(urls, photo)
        if((photo.length + urls.change.length)<5){
            return;
        }
        const dltrst = await deleteFiles();
        // console.log(dltrst);
        if(dltrst.result){
            loading?.ready()
            if(photo.length !== 0){
                const formData = new FormData();
                formData.append("itemId",itemId as string);
    
                photo.forEach(one=>{
                    // console.log(one);
                    formData.append("photos",one);
                })
                
                const response = await fetch("/api/becomehost/uploadPhotos",{
                    method : "post",
                    body : formData,
                    // headers : {
                        //     "content-type" : "multipart/form-data"
                        // }
                    })
                const data = await response.json();
                if(data.result){
                    //DB??? ????????? ????????????
                    // console.log(data.datas);
                    const arr =  [...urls.change, ...data.datas]
                    const rst = await updateDB(arr);
                    console.log(rst);
                    //?????????????????? ??????
                    if(rst.result){
                        router.push("/become-a-host/"+itemId+"/title")
                    }
        
                }
            }else{
                const arr =  [...urls.change]
                const rst = await updateDB(arr);
                // console.log(rst);
                //?????????????????? ??????
                if(rst.result){
                    router.push("/become-a-host/"+itemId+"/title")
                }
            }

        }
        
    }
    const onPrevPage = ()=>{
        router.push("/become-a-host/"+itemId+"/amenities")
    }

    const onSave = async()=>{
        //DB??? ????????? ????????????
        
        //??? ???????????? ??????
        // if(rst.result){
        //     router.push("/become-a-host/")
        // }
    }

    const updateDB = async(arr: string[])=>{
        const rcv = await fetch("/api/becomehost/update",{
            method : "POST",
            body : JSON.stringify({
                _id : itemId,
                photos : arr
            }),
            headers : {
                "content-type" : "application/json"
            }
        })        
        const rst = await rcv.json();

        return rst
    }

    const deleteFiles = async()=>{
        // console.log(urls)
        if(urls.origin != urls.change){
            const dlt = urls.origin.filter(one=>{
                if(!urls.change.find(url=>one==url)){
                    return one
                }
                
            })
            const rcv = await fetch("/api/becomehost/deletePhotos",{
                method : "post",
                body : JSON.stringify(dlt),
                headers : {
                    "content-type" : "application/json"
                }
            })
            const rst = await rcv.json();
            return rst
        }else{
            return {result : true}
        }

    }

    return (
    <Grid container component="main" sx={{ height: "100vh" }}>
        <BecomeHostComment comment={"???????????? ?????? ??????????????????"}/>
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
                <BecomeHostPhotos/>
            </Box>

            <BecomehostBottom onNextPage={onNextPage} onPrevPage={onPrevPage} page={7}/>
        </Grid>
    </Grid>
    );
}

export default Photos;



Photos.layout = "L2";


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