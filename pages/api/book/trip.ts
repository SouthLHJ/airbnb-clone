import { NextApiHandler } from "next";
import { Book } from "../../../interfaces/book/book";
import book from "../../../lib/models/book";

export type TripResponse = {
    result : boolean,
    datas : {
        prev : Book[],
        next : Book[]
    }
}


const handler : NextApiHandler<TripResponse> = async(req,res) =>{
    if(req.method === "GET"){
        try{
            const rcv = await book.find({guestname : req.query.guestname}).populate("roomData").lean()
            // console.log(rcv)
            let today = new Date().setHours(11);
            let prev : Book[] =  [];
            let next : Book[]  = [];
    
            rcv.forEach(one=>{
                if(one.checkoutDate.setHours(11) > today){
                    next.push(one)
                }else{
                    prev.push(one)
                }
            })
    
            return res.status(200).json({result : true, datas : {prev, next}})

        }catch(e:any){
            console.log(e)
        }
    }

}

export default handler;