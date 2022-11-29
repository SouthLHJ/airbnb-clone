import { PayPalScriptProvider, PayPalButtons ,usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {useEffect,useContext,useState}from "react"
import {Box, Typography,Button} from "@mui/material"
import { BookContext } from "../../../pages/book/stays";
import { Accommodation } from "../../../interfaces/becomehost/accommodation";
import { Book } from "../../../interfaces/book/book";
import { useRouter } from "next/router";
import { AppContext } from "../../../pages/_app";
import  dateFns,{differenceInDays,getYear,getMonth,getDate,addDays,format}  from 'date-fns';

type dddd = {
    in : Date,
    out : Date,
}



function BookBillPay() {
    const bookCtx = useContext(BookContext);
    const loading = useContext(AppContext);
    const [room,setRoom] =  useState<Accommodation>();
    const router = useRouter();

    useEffect(()=>{
        if(bookCtx){
            init();
        }
        async function init (){
            const rcv = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/accommodation/list`,{
                method : "post",
                body : JSON.stringify({_id : bookCtx?.book.roomId}),
                headers : {
                    "content-type" : "application/json"
                }
            })
            const rst = await rcv.json();
            if(rst.result){
                setRoom(rst.datas)
            }
        }
    },[bookCtx])

    if(!room){
        return <></>
    }


    //func
    const onBook = async(paypal_orderID : string,paypal_payerID : string, pay_service : string)=>{
        // console.log(bookCtx?.book)
        // console.log(paypal_orderID,paypal_payerID)
        const day1 = new Date(Number(bookCtx?.book!.checkinDate))
        const day2 = new Date(Number(bookCtx?.book?.checkoutDate))
    
        const price = (room.price!*differenceInDays(day2,day1))
        const cleanPirce = 53902;
        const servicePrice = Math.ceil(price*0.163);


        loading?.ready();

        const chkDate = await ontest();

        console.log(chkDate)
        
        const data = {
            _id : bookCtx?.book._id,
            businessTravel :bookCtx?.book.businessTravel,
            checkinDate : bookCtx?.book.checkinDate,
            checkoutDate : bookCtx?.book.checkoutDate,
            guestCounts : {
                adult : bookCtx?.book.adult,
                child : bookCtx?.book.child,
                infant : bookCtx?.book.infant,
                pet : bookCtx?.book.pet    
            },
            guestCurrencyOverride : bookCtx?.book.guestCurrencyOverride,
            roomId : bookCtx?.book.roomId,
            guestname : bookCtx?.book.guestname,
            hostname : bookCtx?.book.hostname,
            paypal_orderID : paypal_orderID,
            paypal_payerID : paypal_payerID,
            pay_service : pay_service,
            price : (price+cleanPirce+servicePrice),
            reserveTime : null
        }


        console.log("data",data);

        const rcv = await fetch("/api/book?update=true",{
            method : "post",
            body : JSON.stringify(data),
            headers : {
                "content-type" : "application/json"
            }
        })

        const rst = await rcv.json();

        console.log(rst)
        if(rst.result){
            router.push("/book/checked?"+`_id=${rst.datas._id}`)
        }
        
    }

    const ontest = async()=>{
        const rcv = await fetch(`/api/book/reserve?roomId=${bookCtx?.book.roomId}`,{method : "get"})
        const rst = await rcv.json();

        const book = { booked : rst.booked as dddd[], booking : rst.booking as dddd[]}
        // console.log(book)
        const range = differenceInDays(new Date(Number(bookCtx?.book.checkoutDate)),new Date(Number(bookCtx?.book.checkinDate)));
        let disdate = false;
        for(let i = 0; i<=range ; i++ ){
            const f = checkDateRange(addDays(new Date(Number(bookCtx?.book.checkinDate)), i),book)
            console.log(f, i)
            if(f){
                disdate = true
                break;
            }
        }
        // console.log(disdate)
        return disdate;
    
    }

    const checkDateRange = (day : Date, book : { booked : dddd[], booking : dddd[]})=>{
        // console.log(book)
        const chk1 = book.booked.reduce((prev, current) => {
            if (prev) {
                return true;
            }
            const tday = format(day as any, "yyyyMMdd");
            const cin = format(new Date(current.in), "yyyyMMdd");
            const cout = format(new Date(current.out), "yyyyMMdd");
            // console.log( tday, new Date(current.in).valueOf(),new Date(current.out).valueOf())
            return tday >= cin && tday <= cout
            }, false)
        const chk2 = book.booking.reduce((prev, current) => {
            if (prev) {
                return true;
            }
            const tday = format(day as any, "yyyyMMdd");
            const cin = format(new Date(current.in), "yyyyMMdd");
            const cout = format(new Date(current.out), "yyyyMMdd");
            // console.log( tday, new Date(current.in).valueOf(),new Date(current.out).valueOf())
            return tday >= cin && tday <= cout
            }, false)
        
        if(!chk1 && !chk2){
            return false
        }else{
            return true
        }
    }



    return (
        <Box sx={{mb : "24px"}}>
            <Typography fontSize={"20px"} fontWeight={"bold"}>결제 방식 선택하기</Typography>
            <Button onClick={()=>ontest()}>
                test
            </Button>
            <PayPalScriptProvider
                options={{ 
                    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                    intent : "authorize" // 바로 결제 말고 확인 후 결제하기 (중간에 나간다거나 돌발 이벤트 발생 시 처리하기위해서)
            }}>
                <PayPalButtons style={{ layout: "horizontal" }}
                    
                    createOrder={(data, actions) => {
                        //결제자가 얻을 데이터
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: `${room?.price}`
                                    },
                                    description : "숙소 예약 하기"
                                },
                            ],
                        });
                    }}

                    onApprove={async (data,actions)=>{
                        // console.log("결제 완료 후");
                        // console.log(data);
                        actions.order?.authorize(); // 처리가 완료 되었다면, 확인했다고 처리해서 paypal에서 결제하게 만들기

                        const orderID = data.orderID;
                        const payerID = data.payerID!;
                        onBook(orderID,payerID, "paypal")
                        // console.log(actions);
                    }}
                />
                {/* <ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                /> */}
            </PayPalScriptProvider>
        </Box>
      );
}

export default BookBillPay;


const amount = "2";
const currency = "USD";
const style = {"layout":"vertical"};

const ButtonWrapper = ({ currency, showSpinner } : {currency : string, showSpinner : boolean}) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={{"layout":"vertical"}}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions!.order!.capture().then(function () {
                        // Your code here after capture the order
                    });
                }}
            />
        </>
    );
}