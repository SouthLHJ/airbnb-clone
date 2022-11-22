import { NextApiHandler } from "next";
import accommodations from "../../../lib/models/accommodations";


const handler : NextApiHandler = async(req,res)=>{
    try{
        const rcv = await accommodations.find({})

        return res.status(200).json({result : true, datas: rcv})
    }catch(e:any){
        return res.status(422).json({result : false, error: e.message})
    }

}

export default handler;