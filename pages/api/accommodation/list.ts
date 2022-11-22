import { NextApiHandler } from "next";
import accommodations from "../../../lib/models/accommodations";
import dbConnect from "../../../lib/models/connect";


const handler : NextApiHandler = async(req,res)=>{
    await dbConnect();
    try{
        const rcv = await accommodations.find({})
        console.log(rcv)
        return res.status(200).json({result : true, datas: rcv})
    }catch(e:any){
        return res.status(422).json({result : false, error: e.message})
    }

}

export default handler;