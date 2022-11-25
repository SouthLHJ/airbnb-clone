import { Avatar, Box, Typography } from "@mui/material";
import { useContext } from "react";
import {BsDot}from "react-icons/bs"
import { RoomContext } from "../../../../contexts/rooms";

const displayRow = {display: "flex", flexDirection : "row"};
const displayColumn = {display: "flex", flexDirection : "column"};

function RoomAboutTitle() {
  const ctx = useContext(RoomContext);


  return (
      <Box flex={1}>
          <Box sx={[displayRow,{width : "100%",justifyContent  : "space-between"}]}>
            <Box sx={[displayColumn,{width : "80%"}]}> 
              <Typography fontSize={"25px"} style={{fontWeight :"inherit"}}>{ctx?.item.hostName.split("@")[0]} 님이 호스팅하는 {ctx?.item.typeGroup} 전체</Typography>
              <Box sx={[displayRow,{alignItems :"center"}]}>
                <Typography>최대 인원 {ctx?.item.floorPlan?.guest}명</Typography>
                <BsDot />
                <Typography>침대 {ctx?.item.floorPlan?.bed}개</Typography>
                <BsDot />
                <Typography>욕실 {ctx?.item.floorPlan?.bathroom}개</Typography>
              </Box>
            </Box>
            <Box>
              <Avatar />
            </Box>
          </Box>
      </Box>
    );
}

export default RoomAboutTitle;