import {Box, Typography} from "@mui/material"


function BookCheckedBox() {
    return (
        <Box 
            sx={{
                borderStyle: "solid",
                borderWidth : "1px",
                borderColor : "rgb(221, 221, 221)",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px",
                maxheight : "600px",
                position :"sticky",
                top : "0px",
            }}
        >
            <Box sx={{width  :"40%", height : "106px"}}>
                {/* <img
                    alt={"roomimg"}    
                    src={room.photos![0]}
                    style={{
                        width : "100%",
                        height :"100%",
                        objectFit : "cover",
                        borderRadius : "10px",
                    }}
                /> */}
            </Box>

        </Box>
      );
}

export default BookCheckedBox;