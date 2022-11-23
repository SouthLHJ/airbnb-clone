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

type Props = {
    children: ReactNode;
};

function RoomsLayout({children }: Props) {
    const [popup, setPopup] = useState<boolean>(false);


    const onPopupIcon : MouseEventHandler<HTMLElement> = (evt) =>{
        setPopup(true)
    }

    return (
    <DirAmenityProvider>

        <Box sx={{pl : "50px", pr :"50px"}}>
            <Box sx={{display : "flex" , flexDirection : "row", width  :"100%", alignItems :"center", mt : "24px"}}>
                    <Box sx={{width : "35%"}}>
                        <IconButton sx={{color : CustomColor.main}}>
                        <SiAirbnb />
                        </IconButton>
                    </Box>
                    <Box sx={{width : "35%", textAlign : "center"}}>
                        <HeaderMiddle/>
                    </Box>
                    <Box  sx={{width : "35%", textAlign : "right"}}>
                        <IconButton
                            onClick={(evt)=>onPopupIcon(evt)}
                            aria-controls={popup ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={popup ? 'true' : undefined}
                        >
                            <MenuIcon/>
                            <AccountCircleIcon/>
                        </IconButton> 
                    </Box>
            </Box>
            {children}
        </Box>
    </DirAmenityProvider>
    );
}

export default RoomsLayout;