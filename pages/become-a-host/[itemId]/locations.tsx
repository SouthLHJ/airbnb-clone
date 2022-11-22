import { useRouter } from "next/router";
import { Button, Typography, Grid, ToggleButton } from "@mui/material";
import Box from "@mui/material/Box";
import {useState,useEffect} from "react"
import BecomeHostComment from "../../../components/becomehost/comment";
import { CustomColor } from "../../../interfaces/setting/color";
import BecomehostBottom from "../../../components/becomehost/bhBottom";
import BecomeHostSaveBottom from "../../../components/becomehost/bhSaveBottom";
import { useAccommodationDispatch, useAccommodationState } from "../../../contexts/accommodation";
import { Accommodation, Location } from "../../../interfaces/becomehost/accommodation";
import BecomeHostMap from "../../../components/becomehost/location/bhMap";


function Locations() {
    const router = useRouter();
    const state = useAccommodationState();
    const dispatch = useAccommodationDispatch();

    const {itemId} = router.query;

    const [placeAbout, setPlaceAbout] = useState<Location>();
    const [fixed, setFixed] = useState<boolean>(false)

    
   


    //func
    const onNextPage = async()=>{
        // console.log(placeAbout)
        //DB에 데이터 추가하기
        const rcv = await fetch("/api/becomehost/update",{
            method : "POST",
            body : JSON.stringify({
                _id : itemId,
                location : placeAbout
            }),
            headers : {
                "content-type" : "application/json"
            }
        })        
        const rst = await rcv.json();
        // console.log(rst);
        //다음페이지로 이동
        if(rst.result){
            router.push("/become-a-host/"+itemId+"/floor-plan")
        }
    }
    const onPrevPage = ()=>{
        router.push("/become-a-host/"+itemId+"/privacy-type")
    }

    const onSave = async()=>{
        //DB에 데이터 추가하기
        const rcv = await fetch("/api/becomehost/update",{
            method : "POST",
            body : JSON.stringify({
                _id : itemId,
                location : placeAbout
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
        <BecomeHostComment comment={fixed ? "핀의 위치가 정확한가요?" : "숙소 위치는 어디인가요?"}/>
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
                <BecomeHostMap placeAbout={placeAbout} setPlaceAbout={setPlaceAbout} setFixed={setFixed} fixed={fixed}/>
            </Box>

            <BecomehostBottom onNextPage={onNextPage} onPrevPage={onPrevPage} page={4}/>
        </Grid>
    </Grid>
    );
}

export default Locations;



Locations.layout = "L2";


