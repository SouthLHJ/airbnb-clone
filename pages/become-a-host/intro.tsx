import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import BecomeHostComment from "../../components/becomehost/comment";
import { CustomColor } from "../../interfaces/setting/color";

function BecomeHostIntro() {
    const router = useRouter();
    const onNextPage = ()=>{
        router.push("/become-a-host/property-type-group")
    }

    return (
    <Grid container component="main" sx={{ height: "100vh" }}>
        <BecomeHostComment comment={"간단한 10단계로"} comment2={"호스팅 시작하기"}/>
        <Grid
            flex={1}
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
            <Box flex={1} sx={{display: "flex",
                flexDirection : "column",
                // alignItems: "center",
                backgroundColor: CustomColor.white,
                padding: "10px",
                justifyContent: "center",
                alignItems :"center"}}>
                <Typography fontWeight={"bold"}>에어비앤비 호스트가 되어보세요.</Typography>
                <Typography fontWeight={"bold"}>에어비앤비에서 모든 과정을 도와드립니다.</Typography>
            </Box>

            <Button onClick={()=>onNextPage()} sx={{backgroundImage:`linear-gradient(90deg,${CustomColor.mainHover}, ${CustomColor.main})`}}>
                <Typography sx={{color:CustomColor.white}}>시작하기</Typography>
            </Button>
        </Grid>
    </Grid>
    );
}

export default BecomeHostIntro;


BecomeHostIntro.layout = "L2";