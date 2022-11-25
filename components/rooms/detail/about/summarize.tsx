import { Avatar, Box, Typography } from "@mui/material";
import { useContext } from "react";
import {BsKey,BsCalendarDate}from "react-icons/bs"
import {IoMedalOutline}from "react-icons/io5"
import { RoomContext } from "../../../../contexts/rooms";
import { CustomColor } from "../../../../interfaces/setting/color";


const displayRow = {display: "flex", flexDirection : "row"};
const displayColumn = {display: "flex", flexDirection : "column"};

function RoomAboutSummarize() {
  const ctx = useContext(RoomContext);


  return (
    <Box  sx={{display : "flex", flexDirection : "column", alignItems :"flex-start", mt :2, height : "130px"}}>
      
      <Box sx={{display : "flex", flexDirection :"row", alignItems :"flex-start"}}>
          <IoMedalOutline fontSize={"25px"}/>
          <Box sx={{ml :1}}>
              <Typography fontSize={"18px"} fontWeight={"bold"}>{ctx?.item.title?.split("@")[0]}님은 슈퍼호스트입니다</Typography>
              <Typography fontSize={"13px"} color={CustomColor.blackHover}>본인 인증이 필요하거나 현지 정부에 등록해야 하는 경우 안내해드리겠습니다.</Typography>
          </Box>
      </Box>

      <Box sx={{display : "flex", flexDirection :"row", alignItems :"flex-start"}}>
          <BsKey fontSize={"25px"}/>
          <Box sx={{ml :1}}>
              <Typography fontSize={"18px"} fontWeight={"bold"}>순조로운 체크인 과정</Typography>
              <Typography  fontSize={"13px"} color={CustomColor.blackHover}>최근 숙박한 게스트 중 100%가 체크인 과정에 별점 5점을 준 숙소입니다.</Typography>
          </Box>
      </Box>

      <Box sx={{display : "flex", flexDirection :"row", alignItems :"flex-start"}}>
          <BsCalendarDate fontSize={"25px"}/>
          <Box sx={{ml :1}}>
              <Typography fontSize={"18px"} fontWeight={"bold"}>2월 26일 전까지 무료로 취소하실 수 있습니다.</Typography>
          </Box>
      </Box>
  </Box>
    );
}

export default RoomAboutSummarize;