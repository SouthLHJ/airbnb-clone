import { Container,Box } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import React, { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";
import Navbar from "./navbar";
import { DirAmenityProvider } from "../../../contexts/amenities";
import { createContext , useState } from "react";
import { DirAmenity } from "../../../lib/models/dirAmenities";

export const NavContext = createContext< {ame: DirAmenity | undefined,setAme: React.Dispatch<React.SetStateAction<DirAmenity>>} |null>(null)
export const HeaderContext = createContext< {detail: boolean,setDetail: React.Dispatch<React.SetStateAction<boolean>>,date: dateFns[] | Date[],setDate: React.Dispatch<React.SetStateAction<dateFns[] | Date[]>>} |null>(null)

//https://mui.com/material-ui/react-app-bar/
function MainLayout({children} : {children:ReactNode}) {
    const [ame, setAme] = useState<DirAmenity>({amenitiy : "new", image :"",ko : "신규"});
    const [detail ,setDetail] = useState<boolean>(false);
    const [date, setDate] = useState<dateFns[] | Date[]>([new Date(),new Date()]);

    return ( 
    <>  
        <NavContext.Provider value={{ame, setAme}}>
        <HeaderContext.Provider  value={{detail,setDetail,date,setDate}}>


        <DirAmenityProvider>
        <AppBar position="sticky" sx={{ top: 0, bottom: 'auto', boxShadow :0, bgcolor:'white', color: 'text.primary' ,zIndex :1200    }}>
            <header>
            <Toolbar>
                <Header />
            </Toolbar>
            </header>
        </AppBar>
        <AppBar position="sticky" sx={{ top: 70, bottom: 'auto', boxShadow :0, bgcolor:'white', color: 'text.primary' }}>
            <nav>
        
            <Toolbar>
                <Navbar/>
            </Toolbar>
            </nav>
        </AppBar>

        <main>
            {children}
        </main>

       
        <footer>
            <Footer/>
        </footer>
        </DirAmenityProvider>
        </HeaderContext.Provider>
        </NavContext.Provider>

        
    </> );
}

export default MainLayout;