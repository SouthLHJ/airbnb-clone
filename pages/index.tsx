import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import {Box}from "@mui/material"
import { useSession } from 'next-auth/react';
import Head from 'next/head'
import Image from 'next/image'
import { Accommodation } from '../interfaces/becomehost/accommodation';
import styles from '../styles/Home.module.css'
import MainPagePreviewItem from '../components/main/preview';
import { useEffect, useState } from 'react';
import { DirAmenity } from '../lib/models/dirAmenities';
import { useDirAmenityDispatch } from '../contexts/amenities';

export default function Home({items,dirAmenity}:InferGetServerSidePropsType<typeof getServerSideProps>) {
  // export default function Home() {
  // const [items, setItems] = useState<Accommodation[]>();
  const dirDispatch = useDirAmenityDispatch();
  useEffect(()=>{
    dirDispatch({type: "save", payload : dirAmenity})
  },[])
  return (
    <Box sx={{display:"flex", flexWrap : "wrap", flexDirection :"row", padding : "24px", gap : "10px"}}>
      { items &&
        items.map(one=>{
          if(one.register){
            return (
              <Box key={`${one._id}`}>
                <MainPagePreviewItem item={one}/>
              </Box>
            )
          }else{
            return null
          }
          
        })
      }
    </Box>
  )
}



Home.layout = "L1";


export const getServerSideProps : GetServerSideProps<{items : Accommodation[] , dirAmenity : DirAmenity[]}> = async(context : GetServerSidePropsContext)=>{

  const rcv = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/accommodation/list`,{method:"get"})
  const data = await rcv.json();
  const rcvdir = await await fetch(process.env.NEXT_PUBLIC_SERVER_URI+"/api/dir/amenity",{method: "get"})
  const datadir = await rcvdir.json();

  return {
    props :{
      items : data.datas,
      dirAmenity : datadir.datas
    }
  }
}