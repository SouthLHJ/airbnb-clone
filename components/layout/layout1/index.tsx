import { Container } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import React, { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";
import Navbar from "./navbar";
//https://mui.com/material-ui/react-app-bar/
function Layout1({children} : {children:ReactNode}) {
    return ( 
    <>
        <AppBar position="sticky" sx={{ top: 0, bottom: 'auto', boxShadow :0, bgcolor:'white', color: 'text.primary' }}>
            <header>
            <Toolbar>
                <Header/>
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
        
    </> );
}

export default Layout1;