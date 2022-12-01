import { Backdrop,CircularProgress } from "@mui/material"; 
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { AccountProvider } from '../contexts/account';
import MainLayout from '../components/layout/layout1';
import BecomeHostLayout from '../components/layout/layout2';
import {ReactNode, createContext, useState} from "react"
import RoomsLayout from '../components/layout/layout3';
import BooksLayout from "../components/layout/layout4";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import accommodations from "../lib/models/accommodations";
import book from "../lib/models/book";

const layouts : keyvalue = {
  "L1": MainLayout ,
  "L2": BecomeHostLayout,
  "L3": RoomsLayout,
  "L4": BooksLayout,
};

type keyvalue = {
  [key : string] : ({ children }: { children: ReactNode}) =>JSX.Element
}

export const AppContext = createContext<{
  ready: () => void;
  done: () => void;
} | null>(null);

export default function App({ Component, pageProps : { session, ...pageProps }  }: AppProps & {Component : {layout : string}}) {
  // console.log("App",Component);
  // console.log("Layouts", layouts[Component.layout])
  const Layout  = layouts[Component.layout ?? "L1"];
  
  const [loading, setLoading] = useState<boolean>(false);
    const ready = () => {
      setLoading(true);
    };
    const done = () => {
      setLoading(false);
    };


  return(
    <> 
    <SessionProvider>
    <AccountProvider>
    <AppContext.Provider value={{ready,done}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: 9999999 }}>
        <CircularProgress color="info" />
      </Backdrop>
    </AppContext.Provider>
    </AccountProvider>
    </SessionProvider>
    </>
  )
}

export const getServerSideProps : GetServerSideProps<{}> = async(context : GetServerSidePropsContext)=>{
  const a = await accommodations.create({});
  const b = await book.create({})
  return {
    props :{

    }
  }
}