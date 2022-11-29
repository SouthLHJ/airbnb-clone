import { Avatar, Box, Typography } from "@mui/material";
import React,{ useContext , useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { RecommandDateContext, RoomContext } from "../../../../contexts/rooms";


import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDateRangePicker, StaticDateRangePickerProps} from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import {
  DateRangePickerDay as MuiDateRangePickerDay,
  DateRangePickerDayProps,
} from '@mui/x-date-pickers-pro/DateRangePickerDay';
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import  dateFns,{differenceInDays,getYear,getMonth,getDate,format, addDays}  from 'date-fns';
import { ko } from "date-fns/locale";
import { CustomColor } from "../../../../interfaces/setting/color";

type dddd = {
    in : Date,
    out : Date,
}

const displayRow = {display: "flex", flexDirection : "row"};
const displayColumn = {display: "flex", flexDirection : "column"};

function RoomAboutCalender() {
    const ctx = useContext(RoomContext);
    const dateCtx = useContext(RecommandDateContext);
    const [bookedDate, setBookedDate] = useState<{booked : dddd[], booking : dddd[]}>({booked : [], booking : []});

    useEffect(()=>{
        if(ctx){
            init();
            // console.log("????")
        }
        async function init(){
            const rcv = await fetch(`/api/book/reserve?roomId=${ctx?.item._id}`,{method : "get"})
            const rst = await rcv.json();

            if(rst.result){
                // console.log(rst)
                let i = 1;
                while(1){
                    const f = checkDateRange(addDays(new Date(), i),{booked : rst.booked, booking : rst.booking})
                    if(!f.rst && !f.rst2 ){
                        dateCtx?.setDate([addDays(new Date(), i),addDays(new Date(), i)])
                        break;
                    }
                    else{
                        i += 1;
                    }
                }
                setBookedDate({booked : rst.booked, booking : rst.booking})
            }

        }

    },[])

    const onChangeDate = (date : DateRange<typeof dateFns>)=>{
        // console.log(date);


        if(differenceInDays(date[0] as any, dateCtx?.date[0] as any) < 0 || differenceInDays(date[0] as any, dateCtx?.date[1] as any) > 0 ){
            dateCtx?.setDate([date[0],null])
            return
        }

        if(!date[1]){
            return
        }

        const range = differenceInDays(date[1] as any,date[0] as any);
        // console.log(range)
        let disdate = false;
        for(let i = 0; i<=range ; i++ ){
            const f = checkDateRange(addDays(new Date(date[0] as any), i))
            // console.log(f)
            if(f.rst || f.rst2){
                disdate = true;
            }
        }
        // console.log(disdate)

        if(disdate){
            return
        }else{
            dateCtx?.setDate(date)
        }


    }


    const checkDateRange = (day : any , book : {booked : dddd[], booking : dddd[]}= bookedDate)=>{
        const rst = book.booked.reduce((prev, current) => {
            if (prev) {
                return true;
            }
            const tday = format(day as any, "yyyyMMdd");
            const cin = format(new Date(current.in), "yyyyMMdd");
            const cout = format(new Date(current.out), "yyyyMMdd");
            // console.log( tday, new Date(current.in).valueOf(),new Date(current.out).valueOf())
            return tday >= cin && tday <= cout
          }, false)
        const rst2 = book.booking.reduce((prev, current) => {
            if (prev) {
                return true;
            }
            const tday = format(day as any, "yyyyMMdd");
            const cin = format(new Date(current.in), "yyyyMMdd");
            const cout = format(new Date(current.out), "yyyyMMdd");
            // console.log( tday, new Date(current.in).valueOf(),new Date(current.out).valueOf())
            return tday >= cin && tday <= cout
          }, false)

        return {rst, rst2}
    }

    
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

    let subTitle=  <></>;
    if(!date[0] && !date[1]){
        subTitle = (<>
        <Typography  fontSize={"13px"} color={"gray"}>여행 날짜를 입력하여 정확한 요금을 확인하세요.</Typography>
        </>)
    }else if (!date[1]){
        subTitle = <Typography  fontSize={"13px"} color={"gray"}>최소 숙박일 수 1박</Typography>
    }else{
        subTitle = (<>
        <Typography  fontSize={"13px"} color={"gray"}>{getYear(date[0] as any)}년 {getMonth(date[0] as any)}월 {getDate(date[0] as any)}일</Typography>
        <Typography  fontSize={"13px"} color={"gray"} sx={{pl : 1, pr : 1}}>-</Typography>
        <Typography  fontSize={"13px"} color={"gray"}> {getYear(date[1] as any)}년 {getMonth(date[1] as any)}월 {getDate(date[1] as any)}일</Typography>
        </>)
    }


    return (
        <>  
            <Box sx={{display : "flex", flexDirection :"column", width : "50%"}}>
                { title }
                <Box sx={{display : "flex", flexDirection :"row"}}>
                {subTitle}
                </Box>
            </Box>
            <LocalizationProvider locale={ko} dateAdapter={AdapterDateFns}
            
            >
            <DatePickerWrap
                disablePast
                disableHighlightToday
                calendars={2}
                displayStaticWrapperAs="desktop"
                label="date range"
                value={date as any}
                // minDate={5}
                inputFormat={"yyyy-MM-dd"}
                onChange={(newValue) => onChangeDate(newValue)}
                renderDay={renderWeekPickerDay}
                renderInput={(startProps, endProps) =>{
                    return (
                    <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> ajslkdfjaslkdfjalsdjflaksjdfl </Box>
                        <TextField {...endProps} />
                    </React.Fragment>
                )}}

                shouldDisableDate={(day,position)=>{
                    const {rst,rst2} = checkDateRange(day);
                    if(rst || rst2){
                        return true
                    }else{
                        return false
                    }
                }}
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
