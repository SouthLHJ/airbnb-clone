import { Box,Typography, Container, IconButton, Menu ,MenuItem ,Avatar ,Divider ,ListItemIcon, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField, Slide, Button } from "@mui/material";
import { CustomColor } from "../../interfaces/setting/color";
import {IoSearchCircle} from "react-icons/io5"
import {useState,useContext,useRef, MutableRefObject} from "react"
import RoomAboutCalender from "../rooms/detail/about/calender";

import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDateRangePicker, StaticDateRangePickerProps} from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import {
  DateRangePickerDay as MuiDateRangePickerDay,
  DateRangePickerDayProps,
} from '@mui/x-date-pickers-pro/DateRangePickerDay';
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import  dateFns,{differenceInDays,getYear,getMonth,getDate,format, addDays, isEqual}  from 'date-fns';
import { ko } from "date-fns/locale";
import { HeaderContext } from "../layout/layout1";

function HeaderMiddle() {
    const headerCtx = useContext(HeaderContext);
    const saveRef = useRef<DateRange<typeof import("date-fns")>>();
    if(!headerCtx){
        return null
    }

    return (
    <>
        <Box
            onClick={(evt)=>{
                headerCtx?.setDetail(d=>!d)
            }}
            sx={[
                {display :"flex", flexDirection :"row", borderStyle : "solid", borderColor : CustomColor.blackHover, borderWidth: 1, borderRadius : 10, pt: 1, pb : 1, pl : 2, pr:2, justifyContent : "space-around", position : "relative", height : "55px"},
                {"&:hover":{boxShadow : 1}}
            ]}
            
        >
            {
                headerCtx?.detail?
                <>
                    <Box sx={{width : "28%",display :"flex", flexDirection :"row",alignItems : "center", justifyContent: "center"}}>
                        {/* <Typography fontSize={13} fontWeight={"bold"}>?????????</Typography> */}
                    </Box>
                    <Box sx={{width : "30%",display :"flex", flexDirection :"column",alignItems : "center", justifyContent: "center"}}>
                        <Typography fontSize={13} fontWeight={"bold"}>?????????</Typography>
                        <Typography fontSize={13} >{format(new Date(headerCtx.date[0] as any),"MM??? dd???")}</Typography>
                    </Box>
                    <Box sx={{width : "30%",display :"flex", flexDirection :"column",alignItems : "center", justifyContent: "center"}}>
                        <Typography fontSize={13} fontWeight={"bold"}>????????????</Typography>
                        <Typography fontSize={13} >{format(new Date(headerCtx.date[1] as any),"MM??? dd???")}</Typography>
                    </Box>
                    <Box sx={{width : "28%",display :"flex", flexDirection :"row",alignItems : "center", justifyContent: "center"}}>
                        <Typography fontSize={13}>?????????</Typography>
                    </Box>
                    <Box sx={{width : "20%",display :"flex", flexDirection :"row",alignItems : "center", justifyContent: "center"}}
                        onClick = {(evt)=>{
                            evt.stopPropagation();
                            if(!saveRef.current){
                                return
                            }
                            headerCtx.setDate([new Date(saveRef.current[0] as any), new Date(saveRef.current[1] as any)])
                            headerCtx.setDetail(false)
                            // console.log(saveRef.current)
                        }}
                    >
                        <IoSearchCircle fontSize={25} color={CustomColor.main}/>
                    </Box>

                    <Box sx={{position : "absolute", top : 55, borderWidth : "0.1px", borderStyle: "solid", borderColor : CustomColor.whiteHover, borderRadius  : "14px", overflow : "hidden"}}
                        onClick={(evt)=>evt.stopPropagation()}
                    >
                        <Calender saveRef={saveRef}/>
                    </Box>
                    <Box
                    onClick={()=>{}}
                    sx={{
                        position: "fixed",
                        zIndex: -10,
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor : CustomColor.blackHover
                        }}>

                    </Box>
                </> 
                :
                <>
                    <Box sx={{width : "28%",display :"flex", flexDirection :"row",alignItems : "center", justifyContent: "center"}}>
                        <Typography fontSize={13} fontWeight={"bold"}>????????????</Typography>
                    </Box>

                    {
                        !isEqual(headerCtx?.date[0] as any,headerCtx?.date[1] as any) ?
                    <Box sx={{width : "30%",display :"flex", flexDirection :"row",alignItems : "center", justifyContent: "center"}}>
                        <Typography fontSize={13} fontWeight={"bold"}>{format(new Date(headerCtx.date[0] as any),"MM??? dd???")}~{format(new Date(headerCtx.date[1] as any),"MM??? dd???")}</Typography>
                    </Box>
                    :
                    <Box sx={{width : "30%",display :"flex", flexDirection :"row",alignItems : "center", justifyContent: "center"}}>
                        <Typography fontSize={13} fontWeight={"bold"}>????????? ?????????</Typography>
                    </Box>
                    }
                    <Box sx={{width : "28%",display :"flex", flexDirection :"row",alignItems : "center", justifyContent: "center"}}>
                        <Typography fontSize={13}>????????? ??????</Typography>
                    </Box>
                    <Box sx={{width : "20%",display :"flex", flexDirection :"row",alignItems : "center", justifyContent: "center"}}>
                        <IoSearchCircle fontSize={25} color={CustomColor.main}/>
                    </Box>


                    
                </>

            }
        </Box>
    </>    
    );
}

export default HeaderMiddle;

const Calender = ({saveRef} : {saveRef: MutableRefObject<DateRange<typeof dateFns> | undefined> })=>{
    const headerCtx = useContext(HeaderContext);
    const date = headerCtx?.date;
    const setDate = headerCtx?.setDate;
    const [dd, setdd] = useState<DateRange<typeof dateFns>>([date![0] as any, date![1] as any]);

    const renderWeekPickerDay = (date: dateFns,dateRangePickerDayProps: DateRangePickerDayProps<dateFns>) => {
        return <DateRangePickerDay {...dateRangePickerDayProps} />;
    };
    return (
        <LocalizationProvider locale={ko} dateAdapter={AdapterDateFns}
            
        >
            <DatePickerWrap
                disablePast
                disableHighlightToday
                calendars={2}
                displayStaticWrapperAs="desktop"
                label="date range"
                value={dd}
                // minDate={5}
                inputFormat={"yyyy-MM-dd"}
                onChange={(newValue) => {
                    saveRef.current = newValue;
                    setdd(newValue);
                }}
                renderDay={renderWeekPickerDay}
                renderInput={(startProps, endProps) =>{
                    return (
                    <>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> ajslkdfjaslkdfjalsdjflaksjdfl </Box>
                        <TextField {...endProps} />
                    </>
                )}}

                // shouldDisableDate={(day,position)=>{
                //     const {rst,rst2} = checkDateRange(day);
                //     if(rst || rst2){
                //         return true
                //     }else{
                //         return false
                //     }
                // }}
            />
            </LocalizationProvider>
    )
}



const DatePickerWrap = styled((props: StaticDateRangePickerProps<typeof dateFns, typeof dateFns>) => (
    <StaticDateRangePicker
      {...props}
    />
))(()=>({
    '& .css-xelq0e-MuiPickerStaticWrapper-content > div > div:first-of-type': {
        opacity: 0
    },
    '& .css-3pa7bi-MuiDateRangePickerViewDesktop-container:not(:last-of-type)': {
        borderRight: 'none'
    },
    "& .css-10wpov9-MuiTypography-root" :{
        fontWeight : "bold",
        // color : "red"
    }
}))
const DateRangePickerDay = styled(MuiDateRangePickerDay)(
  ({
    theme,
    isHighlighting,
    isStartOfHighlighting,
    isEndOfHighlighting,
    outsideCurrentMonth,
  }) => ({
    ...(!outsideCurrentMonth &&
      isHighlighting && {
        borderRadius: 0,
        backgroundColor: "rgba(0,0,0,0.1)",
        // color: "salmon",
        '&:hover, &:focus': {
          backgroundColor: CustomColor.whiteHover,
        },
      }),
    ...(isStartOfHighlighting && {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
    //   "&:hover, &:focus, & button" :{
    //     backgroundColor : "red"
    // }   
    }),
    ...(isEndOfHighlighting && {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
    }),
    "& .MuiDateRangePickerDay-day.Mui-selected, & .MuiDateRangePickerDay-day.Mui-selected:hover, & .MuiDateRangePickerDay-day.Mui-selected:focus" : {
        backgroundColor : "black"
    },
    "& .css-l5pdik-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day:hover, & .MuiDateRangePickerDay-notSelectedDate MuiDateRangePickerDay-dayInsideRangeInterval" :{
        // backgroundColor : CustomColor.blackHover,
        boxShadow: "0 0 0 0.5px #000 inset"
    },
    "& .css-jwafdq-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected, & .css-jwafdq-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected:hover, & .css-jwafdq-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected:focus" : {
        backgroundColor : "black"
    },
    "& .css-18fxmqw-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected, & .css-18fxmqw-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected:hover, & .css-18fxmqw-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected:focus" : {
        backgroundColor : "black"
    },
    "& .MuiDateRangePickerDay-day.Mui-disabled": {
        textDecoration: "line-through"
    }
  }),
) as React.ComponentType<DateRangePickerDayProps<dateFns>>;