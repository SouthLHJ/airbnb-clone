//icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import {SiAirbnb} from "react-icons/si"
//module
import React, { ChangeEventHandler, MouseEventHandler, useRef, useState ,useContext, useEffect, ReactNode} from "react";
import { Box,  IconButton} from "@mui/material";
//custom
import { CustomColor } from "../../../interfaces/setting/color";
import { AccountProvider } from "../../../contexts/account";
import { useAccountState,useAccountDispatch } from "../../../contexts/account";
//component


type Props = {
    children: ReactNode;
};

function BooksLayout({children }: Props) {
    return (
    <Box sx={{}}>
        <Box sx={{display : "flex" , flexDirection : "row", width  :"100%", alignItems :"center", pl : "50px", pr :"50px", pb : "24px", borderBottomStyle : "solid",borderBottomWidth : "0.2px",borderBottomColor : CustomColor.whiteHover ,mt : "24px"}}>
                <Box sx={{width : "35%"}}>
                    <IconButton sx={{color : CustomColor.main}}>
                    <SiAirbnb />
                    </IconButton>
                </Box>
                
        </Box>
        <Box sx={{pl : "50px", pr :"50px"}}>
            {children}
        </Box>
    </Box>
    );
}

export default BooksLayout;