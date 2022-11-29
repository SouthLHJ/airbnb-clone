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
import { DirAmenityProvider } from "../../../contexts/amenities";
import HeaderMenu from "../../header/headerMenu";
import HeaderMiddle from '../../header/headerMiddle';
import { useRouter } from 'next/router';

type Props = {
    children: ReactNode;
};

function RoomsLayout({children }: Props) {
    const router = useRouter();

    return (
    <DirAmenityProvider>

        <Box sx={{}}>
            <Box sx={{display : "flex" , flexDirection : "row", width  :"100%", alignItems :"center", pl : "50px", pr :"50px", pb : "24px", borderBottomStyle : "solid",borderBottomWidth : "0.2px",borderBottomColor : CustomColor.whiteHover ,mt : "24px"}}>
                    <Box sx={{width : "35%"}}>
                        <IconButton sx={{color : CustomColor.main}} onClick={()=>router.push(process.env.NEXT_PUBLIC_SERVER_URI!)}>
                        <SiAirbnb />
                        </IconButton>
                    </Box>
                    <Box sx={{width : "35%", textAlign : "center"}}>
                        <HeaderMiddle/>
                    </Box>

            </Box>
            <Box sx={{pl : "50px", pr :"50px"}}>
                {children}

            </Box>
        </Box>
    </DirAmenityProvider>
    );
}

export default RoomsLayout;