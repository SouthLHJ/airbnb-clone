//import { Box, Container, IconButton, Menu ,MenuItem ,Avatar ,Divider ,ListItemIcon, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField, Slide, Button } from "@mui/material"; 
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { AccountProvider } from '../contexts/account';
import Layout1 from '../components/layout/layout1';
import Layout2 from '../components/layout/layout2';
import { NextPageContext } from 'next';
import {ReactNode} from "react"

const layouts : keyvalue = {
  "L1": Layout1 ,
  "L2": Layout2,
};

type keyvalue = {
  [key : string] : ({ children }: { children: ReactNode}) =>JSX.Element
}

export default function App({ Component, pageProps : { session, ...pageProps }  }: AppProps & {Component : {layout : string}}) {
  // console.log("App",Component);
  // console.log("Layouts", layouts[Component.layout])
  const Layout  = layouts[Component.layout ?? "L1"];

  return(
    <> 
    <SessionProvider>
    <AccountProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AccountProvider>
    </SessionProvider>
    </>
  )
}
