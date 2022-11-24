import { Avatar, Box, Typography } from "@mui/material";
import React,{ useContext } from "react";
import { RecommandDateContext, RoomContext } from "../../../../pages/rooms/[itemId]";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';


import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDateRangePicker, StaticDateRangePickerProps} from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import {
  DateRangePickerDay as MuiDateRangePickerDay,
  DateRangePickerDayProps,
} from '@mui/x-date-pickers-pro/DateRangePickerDay';
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import  dateFns,{differenceInDays,getYear,getMonth,getDate,}  from 'date-fns';
import { ko } from "date-fns/locale";
import { CustomColor } from "../../../../interfaces/setting/color";



const displayRow = {display: "flex", flexDirection : "row"};
const displayColumn = {display: "flex", flexDirection : "column"};

function RoomAboutCalender() {
    
    const ctx = useContext(RoomContext);
    const dateCtx = useContext(RecommandDateContext);
    
    if(!dateCtx){
        return <></>
    }

    const date = dateCtx!.date;
    

    const renderWeekPickerDay = (date: dateFns,dateRangePickerDayProps: DateRangePickerDayProps<dateFns>) => {
        return <DateRangePickerDay {...dateRangePickerDayProps} />;
    };

    let title = <></>;
    if(!date[0] && !date[1]){
        title = <Typography  fontSize={"20px"} style={{fontWeight :"bold"}}>체크인 날짜를 선택하세요</Typography>
    }else if (!date[1]){
        title = <Typography  fontSize={"20px"} style={{fontWeight :"bold"}}>체크아웃 날짜를 선택하세요</Typography>
    }else{
        title = <Typography  fontSize={"20px"} style={{fontWeight :"bold"}}>{ctx?.item.location?.city},{ctx?.item.location?.state}에서의 {differenceInDays(date[1] as any,date[0] as any)} 박</Typography>
    }

    return (
        <>  
            <Box sx={{display : "flex", flexDirection :"column"}}>
                { title }
                <Box sx={{display : "flex", flexDirection :"row"}}>
                    <Typography  fontSize={"13px"} color={"gray"}>{getYear(date[0] as any)}년 {getMonth(date[0] as any)}월 {getDate(date[0] as any)}일</Typography>
                    <Typography  fontSize={"13px"} color={"gray"} sx={{pl : 1, pr : 1}}>-</Typography>
                    <Typography  fontSize={"13px"} color={"gray"}> {getYear(date[1] as any)}년 {getMonth(date[1] as any)}월 {getDate(date[1] as any)}일</Typography>
                </Box>
            </Box>
            <LocalizationProvider locale={ko} dateAdapter={AdapterDateFns}
            
            >
            <DatePickerWrap
                disablePast
                calendars={2}
                displayStaticWrapperAs="desktop"
                label="date range"
                value={date as any}
                // minDate={5}
                inputFormat={"yyyy-MM-dd"}
                onChange={(newValue) => dateCtx!.setDate(newValue)}
                renderDay={renderWeekPickerDay}
                renderInput={(startProps, endProps) =>{
                    return (
                    <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> ajslkdfjaslkdfjalsdjflaksjdfl </Box>
                        <TextField {...endProps} />
                    </React.Fragment>
                )}}
            />
            </LocalizationProvider>
        </>
    );
}

export default RoomAboutCalender;
const DatePickerWrap = styled((props: StaticDateRangePickerProps<typeof dateFns, typeof dateFns>) => (
    <StaticDateRangePicker
      {...props}
    />
))(()=>({
    '& .css-xelq0e-MuiPickerStaticWrapper-content > div > div:first-of-type': {
        opacity: '0 '
    },
    '& .css-3pa7bi-MuiDateRangePickerViewDesktop-container:not(:last-of-type)': {
        borderRight: 'none'
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
        backgroundColor: CustomColor.whiteHover,
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
    "& .css-pgdzhj-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected, & .css-pgdzhj-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected:hover, & .css-pgdzhj-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected:focus" : {
        backgroundColor : "black"
    },
    "& .css-jwafdq-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected, & .css-jwafdq-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected:hover, & .css-jwafdq-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected:focus" : {
        backgroundColor : "black"
    },
    "& .css-18fxmqw-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected, & .css-18fxmqw-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected:hover, & .css-18fxmqw-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day.Mui-selected:focus" : {
        backgroundColor : "black"
    },
  }),
) as React.ComponentType<DateRangePickerDayProps<dateFns>>;
