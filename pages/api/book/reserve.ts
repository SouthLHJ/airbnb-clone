import { NextApiHandler } from "next";
import dbConnect from "../../../lib/models/connect";
import reserve from "../../../lib/models/reserve";


const handler : NextApiHandler = async(req,res)=>{
    await dbConnect();
    
    if(req.method === "POST"){
        const rcv = await reserve.create(req.body);
        return res.status(201).json({result :true, datas  : rcv })
    }else if(req.method === "GET"){
        const rcv = await reserve.find({roomId : req.query.roomId}).where("checkinDate").gte(Date.now());
        return res.status(201).json({result :true, datas  : rcv })
    }
}


export default handler;