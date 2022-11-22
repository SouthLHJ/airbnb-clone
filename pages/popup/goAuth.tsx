import { signIn, useSession } from "next-auth/react"
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import{useEffect } from "react"


export default  function GooglePopup (){
    const {data,status} = useSession();

    useEffect(()=>{

        if(status ==="authenticated"){
            window.close();
            
        }else if (status ==="unauthenticated"){
            signIn("google");   
        }
        
    },[status])
    
    return (
        <Box sx={{display: "flex",flexDirection :"row", justifyContent : "center", alignItems : "center", height : "100%"}}>
            <CircularProgress color="error" />
        </Box>
    )
}
GooglePopup.layout = "L1";