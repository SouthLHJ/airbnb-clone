import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, } from 'next';
import {useContext} from "react"
import {Box,Button}from "@mui/material"
import { useEffect, useState } from 'react';
import {addDays, isEqual} from "date-fns"

import { Accommodation } from '../interfaces/becomehost/accommodation';
import MainPagePreviewItem from '../components/main/preview';
import { DirAmenity } from '../lib/models/dirAmenities';
import { useDirAmenityDispatch } from '../contexts/amenities';
import { HeaderContext, NavContext } from '../components/layout/layout1';

export default function Home({items,dirAmenity}:InferGetServerSidePropsType<typeof getServerSideProps>) {
  const navCtx = useContext(NavContext);
  const headerCtx = useContext(HeaderContext);

  const dirDispatch = useDirAmenityDispatch();

  useEffect(()=>{
    dirDispatch({type: "save", payload : dirAmenity})
  },[navCtx])

  // console.log();

  let amenit : any[] = [];
  items.forEach(one=>{
    if(one.register){
      if(one.amenities?.convenient.includes(navCtx?.ame?.amenitiy as string)){
        amenit.push(one._id)
      }else if(one.amenities?.safeItem.includes(navCtx?.ame?.amenitiy as string)){
        amenit.push(one._id)
      }else if(one.amenities?.specialConvenient.includes(navCtx?.ame?.amenitiy as string)){
        amenit.push(one._id)
      }else if(navCtx?.ame?.amenitiy === "new"){
        amenit.push(one._id)
      }
    }
  })

  


  return (
    <Box sx={{display:"flex", flexWrap : "wrap", flexDirection :"row", padding : "24px", gap : "10px"}}>
      {/* <Button onClick={async()=>{
        const rcv = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/accommodation/list`,{method:"get"})
        const data = await rcv.json();
        console.log(data)
      }}>
        test
      </Button> */}

      { 
        items.map(one=>{
          if(amenit.includes(one._id)){
            let isDate = true;
            if(!isEqual(headerCtx?.date[0] as any, headerCtx?.date[1] as any)){
              if(one.books){
                const a= one.books.sort((a,b)=>{
                  return (new Date(a.checkinDate).valueOf() - new Date(b.checkinDate).valueOf())
                })
                // 검색한 날짜의 안에 예약된 룸은 제외하고, 검색한 날짜의 체크인 날짜가 book 체크하던 중에 체크아웃 날짜가 초과가 된다면 더이상 체크할 필요 없으므로 정지
                for(let i = 0 ; i<a.length;i++){
                  if((new Date(a[i].checkinDate) <= new Date(headerCtx?.date[0] as any) && new Date(a[i].checkoutDate) >= new Date(headerCtx?.date[0] as any)) ||
                  (new Date(a[i].checkinDate) <= new Date(headerCtx?.date[1] as any) && new Date(a[i].checkoutDate) >= new Date(headerCtx?.date[1] as any))
                  ){
                    isDate=false;
                  }
                  if(new Date(addDays(headerCtx?.date[0] as any,30)) < new Date(a[i].checkinDate)){
                    break;
                  }
                }
              }
            }

            if(isDate){
              // console.log("items",one._id,one.books,isDate);
              return (
                <Box key={`${one._id}`}>
                  <MainPagePreviewItem item={one}/>
                </Box>
              )
            }
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
  const rcvdir = await fetch(process.env.NEXT_PUBLIC_SERVER_URI+"/api/dir/amenity",{method: "get"})
  const datadir = await rcvdir.json();

  return {
    props :{
      items : data.datas ?? [],
      dirAmenity : datadir.datas
    }
  }
}