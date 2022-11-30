import {Box, Typography,Button} from "@mui/material"
import {useContext} from "react"

import { TripContext } from "../../../pages/trip";
import TripItem from "./item";


function TripNextBox() {
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
                height : "300px",
                display : "flex",
                width : "100%",
                flexWrap : "wrap",
                gap  : "14px"
            }}
        >
            {
                tripCtx?.next.map(one =>
                    <TripItem item={one} />
                )
            }

        </Box>

      );
}

export default TripNextBox;