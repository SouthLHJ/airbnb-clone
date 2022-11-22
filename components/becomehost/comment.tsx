import { Avatar, Button, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import {SiAirbnb} from "react-icons/si"
import { CustomColor } from "../../interfaces/setting/color";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

type Props = {
    comment : string,
    comment2 ?:string,
}

function BecomeHostComment({comment,comment2} : Props) {
    const router = useRouter();

    return (
    <Grid 
        flex={1}
        item
        md={6}
        style={{
            display: "flex",
            flexDirection : "column",
            // alignItems: "center",
            backgroundImage: `linear-gradient(0deg,${CustomColor.sub}, ${CustomColor.main})`,
            // backgroundColor: CustomColor.main,
            padding: "10px",
            // justifyContent: "center"
        }}
    >
        <Box>
            <IconButton sx={{color : CustomColor.white}} onClick={()=>{router.push("/")}}>
                <SiAirbnb />
            </IconButton>
        </Box>
        <Box sx={{display: "flex",flexDirection : "column", justifyContent : "center", height : "100%", padding : 10}}>
            <Typography color={CustomColor.white} fontSize={40} fontWeight="bold" >{comment}</Typography>
            {
                comment2 &&
                <Typography color={CustomColor.white} fontSize={40} fontWeight="bold" >{comment2}</Typography>
            }
        </Box>
    </Grid>
    );
}

export default BecomeHostComment;

