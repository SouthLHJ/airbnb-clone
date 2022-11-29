import { NextApiHandler } from "next";
import book from "../../../lib/models/book";
import dbConnect from "../../../lib/models/connect";
import {format} from "date-fns"

const handler : NextApiHandler = async(req,res)=>{
    await dbConnect();
    
    if(req.method === "POST"){
        // const rcv = await reserve.create(req.body);
        // return res.status(201).json({result :true, datas  : rcv })


    }else if(req.method === "GET"){
        const today = format(new Date(),"yyyy-MM-dd");
        // console.log(today, new Date(today).valueOf());

        // 체크아웃 날짜가 오늘 이후이고 , 예약하는 시간대랑 룸번호 받아오기
        const rcv = await book.find({roomId : req.query.roomId}).where("checkoutDate").gte(new Date(today).valueOf()).select("checkinDate checkoutDate reserveTime roomId");
        
        // 현재시간의 20분 후
        // const d = new Date().setMinutes(new Date().getMinutes()+20)
        // console.log(new Date().getMinutes(), new Date(d).getMinutes())

        const booked = [];
        const booking = [];
        const cancelBooking = [];

        for(let i = 0 ; i<rcv.length ; i++){
            if(!rcv[i].reserveTime){
                booked.push({in : rcv[i].checkinDate, out : rcv[i].checkoutDate})
            }else{
                const tt = new Date(rcv[i].reserveTime as Date).setMinutes(new Date(rcv[i].reserveTime as Date).getMinutes()+20)
                // console.log(tt > Date.now())
                if(tt > Date.now()){
                    booking.push({in : rcv[i].checkinDate, out : rcv[i].checkoutDate})
                }else{
                    cancelBooking.push(rcv[i])
                }
            }
        }
        // console.log(booked);
        // console.log(booking);

        if(cancelBooking.length > 0 ){
            for(let i = 0; i<cancelBooking.length; i++){
                await book.deleteOne({_id : cancelBooking[i]._id})
            }
        }
    
        /* 이미 예약한거에서!!!
            checkin  : {$lt : one.checkout}
            checkout : {$gt : one.checkin}
        */

        return res.status(201).json({result :true, booked  : booked, booking : booking })
    }
}


export default handler;