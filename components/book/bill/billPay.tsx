import { PayPalScriptProvider, PayPalButtons ,usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {useEffect,useContext,useState}from "react"
import {Box, Typography} from "@mui/material"
import { BookContext } from "../../../pages/book/stays";
import { Accommodation } from "../../../interfaces/becomehost/accommodation";
import { Book } from "../../../interfaces/book/book";
import { useRouter } from "next/router";
import { AppContext } from "../../../pages/_app";
import  dateFns,{differenceInDays,getYear,getMonth,getDate,addDays}  from 'date-fns';


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
        const day1 = bookCtx?.book.checkinDate.split("/")[0]
        const day2 = bookCtx?.book.checkoutDate.split("/")[0]
    
        const price = (room.price!*differenceInDays(new Date(day2!),new Date(day1!)))
        const cleanPirce = 53902;
        const servicePrice = Math.ceil((price+cleanPirce)*0.14);

        loading?.ready();
        const data = {
            businessTravel : {
                workTrip  : Boolean(bookCtx?.book.businessTravel)
            },
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
            price : (price+cleanPirce+servicePrice)
        }
        console.log("data",data);

        const rcv = await fetch("/api/book",{
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


    return (
        <Box sx={{mb : "24px"}}>
            <Typography fontSize={"20px"} fontWeight={"bold"}>결제 방식 선택하기</Typography>
            <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!, }}>
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