//https://mui.com/material-ui/react-drawer/
import { Box, IconButton, Paper, Tab, Tabs, ToggleButton ,ToggleButtonGroup, Button } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import {useState,useEffect} from "react"
import { CustomColor } from '../../../interfaces/setting/color';
import { DirAmenity } from '../../../lib/models/dirAmenities';

const useStyles = {
    customStyleOnTab: {
        fontSize: "12px",
        color: "red"
    },
      activeTab: {
        fontSize: "12px",
        fontWeight: "600",
        color: "red"
    },
};

function Navbar() {
  const [value, setValue] = useState(0);
  const [list, setList] = useState<DirAmenity[]>();
  console.log(process.env.NEXT_PUBLIC_SERVER_URI)
  useEffect(()=>{
    const test = async()=>{
      // async function init(){
        const rcv = await fetch(process.env.NEXT_PUBLIC_SERVER_URI+"/api/dir/amenity",{
          method: "get",
        })
        const rst = await rcv.json();
        // console.log(rst)
        if(rst.result){
          setList( rst.datas);
        }
      // };
      // init();
    }
    test();
  },[])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  
  
  return (
    <>
        <Paper
        elevation={0}
        sx={{
          width : "100%",
          display: 'flex',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
          justifyContent : "space-around",
        }}
      > 
        <Paper
            elevation={0}
            sx={{
                width : "94%",
                display: 'flex',
                mr : "-180px",
                justifyContent : "center",
            }}
        >
            <Box sx={{ maxWidth: { xs: 100, sm: "90%" }, bgcolor: 'background.paper' , display : "flex", alignItems : "center" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    // textColor='inherit'
                    TabIndicatorProps={{style: {background: CustomColor.black}}}
                > 
                  <Tab icon={<img src={`/amenities/new.png`} style={{width : "20px", height :"20px"}}/>}
                    label={"신규"} 
                    style={{color : value ===0 ? CustomColor.black : "gray"}}
                     />
                  {
                    list?.map(one=>{
                      return(
                        <Tab
                          icon={<img src={`/amenities/${one.amenitiy}.png`} style={{width : "20px", height :"20px"}}/>}
                          key={one.amenitiy}
                          label={one.ko} 
                          style={{color : value ===0 ? CustomColor.black : "gray"}}
                        />
                      )
                    })
                  }
                </Tabs>

            </Box>
                
        </Paper>

        <Paper
            elevation={0}
            sx={{
                display: 'flex',
                border: (theme) => `1p  x solid ${theme.palette.divider}`,
                flexWrap: 'wrap',
                mr : "-50px",
              }}
        >
                <IconButton size='small'>
                    <TuneIcon />
                    <p>필터</p>
                </IconButton>
        </Paper>

        
      </Paper>
      
    </>
  );
}

export default Navbar;