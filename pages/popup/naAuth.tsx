import { signIn, useSession } from "next-auth/react"
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import{useEffect } from "react"


export default  function KakaoPopup (){
    const {data,status} = useSession();

    useEffect(()=>{
        if(status ==="authenticated"){
            window.close();
            
        }else if (status ==="unauthenticated"){
            signIn("naver") ;   
        }
        
    },[status])
    
    return (
        <Box sx={{display: "flex",flexDirection :"row", justifyContent : "center", alignItems : "center", height : "100%"}}>
            <CircularProgress color="error" />
        </Box>
    )
}
KakaoPopup.layout = "L1";