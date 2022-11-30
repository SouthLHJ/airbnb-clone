import {Box, Typography,Button} from "@mui/material"
import {useContext} from "react"
import { TripContext } from "../../../pages/trip";
import TripItem from "../next/item";

function TripPrevBox() {

    const tripCtx= useContext(TripContext)
    if(!tripCtx){
        return <></>
    }
    return (
        
        <Box 
        sx={{
            // borderStyle: "solid",
            // borderWidth : "1px",
            // borderColor : "rgb(221, 221, 221)",
            // borderRadius: "12px",
            padding: "24px",
            // boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px",
            height : "500px",
            display : "flex",
            width : "100%"

        }}
    >
        {
            tripCtx?.prev.map(one =>
                <TripItem item={one} />
            )
        }

        </Box>

      );
}

export default TripPrevBox;