import { NextApiHandler } from "next";
import accommodations from "../../../lib/models/accommodations";
import dbConnect from "../../../lib/models/connect.js"

const handler : NextApiHandler = async(req,res)=>{
    await dbConnect();

    try{
        const rcv = await accommodations.findOneAndUpdate({_id : req.body._id}, req.body, {returnDocument : "after"})
        // console.log(rcv);
        return res.status(201).json({result : true, datas : rcv})

    }catch(e:any){
        return res.status(422).json({result : false, error : e.message})
    }

}

export default handler;