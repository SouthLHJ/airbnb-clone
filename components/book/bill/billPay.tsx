import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {useEffect,useContext,useState}from "react"
import {Box, Typography} from "@mui/material"
import { BookContext } from "../../../pages/book/stays";
import { Accommodation } from "../../../interfaces/becomehost/accommodation";
import { Book } from "../../../interfaces/book/book";
import { useRouter } from "next/router";
import { AppContext } from "../../../pages/_app";

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
            <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_CLIENT_ID!, }}>
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
                        console.log(data);
                        const orderID = data.orderID;
                        const payerID = data.payerID!;
                        onBook(orderID,payerID, "paypal")
                        // console.log(actions);
                    }}
                />
            </PayPalScriptProvider>
        </Box>
      );
}

export default BookBillPay;