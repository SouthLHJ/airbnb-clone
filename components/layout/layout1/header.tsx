//icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import {SiAirbnb} from "react-icons/si"
//module
import React, { ChangeEventHandler, MouseEventHandler, useRef, useState ,useContext, useEffect} from "react";
import { Box,  IconButton} from "@mui/material";
//custom
import { CustomColor } from "../../../interfaces/setting/color";
import { AccountProvider } from "../../../contexts/account";
import { useAccountState,useAccountDispatch } from "../../../contexts/account";
//component
import FirstDialog from "../../account/firstDialog";
import RegisterDialog from "../../account/registerDialog";
import AccountDialog from "../../account/accountDialog";
import TermsPerson from "../../account/terms-person";
import LastDialog from "../../account/lastDialog";
import HeaderMenu from "../../header/headerMenu";
import HeaderMiddle from '../../header/headerMiddle';


export default function Header (){
    const state = useAccountState();
    const dispatch = useAccountDispatch();

    const [dialog, setDialog] = useState<boolean>(false);
    const [social, setSocial] = useState<boolean>(false);
    const [registerDialog, setRegisterDialog] = useState<boolean>(false)
    const [accountDialog, setAccountDialog] = useState<boolean>(false);
    const [termsPersonDialog, setTermsPersonDialog] = useState<boolean>(false);
    const [lastDialog, setLastDialog] = useState<boolean>(false);

    const [email, setEmail] = useState<string>("");

    const countryRef = useRef<HTMLElement>();
    const [popup, setPopup] = useState<boolean>(false);
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    
    useEffect(()=>{

        // console.log(social)
        if(social){
            setRegisterDialog(true);
        }

    },[state, social])

    //func
    const onPopupIcon : MouseEventHandler<HTMLElement> = (evt) =>{
        setPopup(true)
        setAnchor(evt.currentTarget);
    }

    const offPopupIcon : MouseEventHandler<HTMLElement> = (evt) =>{
        setPopup(false);
        setAnchor(null);
    }

    const onRegisterAccount :MouseEventHandler<HTMLElement> = ()=>{
        setDialog(true)
    }



    return (
        <>  
            <AccountProvider>

            <Box sx={{display : "flex" , flexDirection : "row", alignItems :"center",backgroundColor : "white"}}>
                <Box flex={1}>
                    <IconButton sx={{color : CustomColor.main}}>
                    <SiAirbnb />
                    </IconButton>
                </Box>
                <Box sx={{minWidth : "620px", textAlign : "center"}}>
                    <HeaderMiddle/>
                </Box>
                <Box flex={1} sx={{textAlign : "right"}}>
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
            
            <HeaderMenu anchor={anchor}popup={popup}offPopupIcon={offPopupIcon}onRegisterAccount={onRegisterAccount} />

            {
                dialog &&
                <FirstDialog setDialog={setDialog} setRegisterDialog={setRegisterDialog} setAccountDialog={setAccountDialog} email={email} setEmail={setEmail} setSocial={setSocial}/>
            }

            {
                registerDialog &&
                <RegisterDialog setDialog={setDialog} setRegisterDialog={setRegisterDialog} setTermsPersonDialog={setTermsPersonDialog} email={email} setEmail={setEmail} social={social} setSocial={setSocial}/>
            }

            {
                accountDialog &&
                <AccountDialog setDialog={setDialog} setAccountDialog={setAccountDialog} email={email} setEmail={setEmail}/>
            }
        
            {
                termsPersonDialog 
                // true
                &&
                <TermsPerson setDialog={setDialog} setTermsPersonDialog={setTermsPersonDialog} setLastDialog={setLastDialog} email={email}/>
            }

            {
                lastDialog 
                // true
                &&
                <LastDialog setDialog={setDialog} setLastDialog={setLastDialog}/>
            }
            </AccountProvider>

        </>
    )
}