import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { RoomContext } from "../../../pages/rooms/[itemId]";

const textSt = {ml : 1, mr : 1}

function RoomPhoto() {
    const ctx = useContext(RoomContext);

    return (
    <Box flex={1} sx={{maxWidth:"100%",maxHeight:"500px",display : "flex", flexDirection: "row", borderRadius : 10, overflow : "hidden", position : "relative" }}>
        <Box sx={{display : "flex", justifyContent : "center",alignItems: "center",width : "49%", height :"500px",  mr : "8px"}}>
            <img
                alt={"숙소 사진"}
                src={ctx?.item.photos![0]}
                style={{
                    objectFit : "cover"
                }}
                width={"100%"}
                height={"500px"}
            />
        </Box>
        <Box sx={{width : "50%", height :"500px"}}>
            <Box sx={{display : "flex", flexDirection : "row", width : "100%", height : "49%", mb : "8px"}}>
                <Box flex={1} sx={{width : "49%", mr : "8px"}}>
                    <img
                        alt={"숙소 사진"}
                        src={ctx?.item.photos![1]}
                        width={"100%"}
                        height={"100%"}
                        style={{
                            objectFit : "cover"
                        }}
                    />
                </Box>
                <Box flex={1} sx={{width : "49%"}}>
                    <img
                        alt={"숙소 사진"}
                        src={ctx?.item.photos![2]}
                        width={"100%"}
                        height={"100%"}
                        style={{
                            objectFit : "cover"
                        }}
                    />
                </Box>
            </Box>
            <Box sx={{display : "flex", flexDirection : "row", width : "100%", height : "50%"}}>
                <Box flex={1} sx={{width : "49%", mr : "8px"}}>
                    <img
                        alt={"숙소 사진"}
                        src={ctx?.item.photos![3]}
                        width={"100%"}
                        height={"100%"}
                        style={{
                            objectFit : "cover"
                        }}
                    />
                </Box>
                <Box flex={1} sx={{width : "49%"}}>

                    <img
                        alt={"숙소 사진"}
                        src={ctx?.item.photos![4]}
                        width={"100%"}
                        height={"100%"}
                        style={{
                            objectFit : "cover"
                        }}
                    />
                </Box>
            </Box>

        </Box>

        <Box sx={{position : "absolute", bottom : "30px", right : "30px", bgcolor : "white", borderRadius  :"4px", pl: "10px", pr : "10px", pt : "5px", pb : "5px", borderStyle : "solid", borderColor:"black", borderWidth : 1}}>
            <Typography>사진 모두보기</Typography>
        </Box>
    </Box>
    );
}

export default RoomPhoto;
