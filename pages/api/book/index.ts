import { NextApiHandler } from "next";
import book from "../../../lib/models/book";
import dbConnect from "../../../lib/models/connect";


const handler : NextApiHandler = async(req,res)=>{
    await dbConnect();

    if(req.method === "POST"){
        if(req.query.update){
            const rcv = await book.findOneAndUpdate({_id : req.body._id},req.body,{returnDocument: "after"})

            return res.status(201).json({result : true, datas : rcv})

        }else{
            const rcv = await book.create(req.body)
            return res.status(201).json({result :true, datas  : rcv })
        }
    }else if(req.method === "GET"){
        try{
            const rcv = await book.find({_id : req.query._id})
            // console.log(rcv)
            return res.status(201).json({result :true, datas  : rcv })

        }catch(e){
            return res.status(422).json({result :false, error : e })

        }
    }
}


export default handler;