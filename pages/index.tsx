import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import {Box}from "@mui/material"
import { useSession } from 'next-auth/react';
import Head from 'next/head'
import Image from 'next/image'
import { Accommodation } from '../interfaces/becomehost/accommodation';
import styles from '../styles/Home.module.css'
import MainPagePreviewItem from '../components/main/preview';

export default function Home({items}:InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const {data, status} = useSession();
  console.log(process.env.NEXT_PUBLIC_SERVER_URI)

  return (
    <Box sx={{display:"flex", flexWrap : "wrap", flexDirection :"row", padding : "24px"}}>
      {
        items.map(one=>{
          return (
            <MainPagePreviewItem item={one}/>
          )
        })
      }
    </Box>
  )
}



Home.layout = "L1";


export const getServerSideProps : GetServerSideProps<{items : Accommodation[]}> = async(context : GetServerSidePropsContext)=>{

  const rcv = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/accommodation/list`,{method:"get"})
  const data = await rcv.json();


  return {
    props :{
      items : data.datas
    }
  }
}