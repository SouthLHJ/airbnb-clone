import { NextApiHandler } from "next";
import { Accommodation } from "../../../interfaces/becomehost/accommodation";
import accommodations from "../../../lib/models/accommodations";
import dbConnect from "../../../lib/models/connect";


const handler : NextApiHandler = async(req,res)=>{
    await dbConnect();

    if(req.method === "GET"){
        try{
            const rcv = await accommodations.find({})
            // console.log(rcv)
            return res.status(200).json({result : true, datas: rcv})
        }catch(e:any){
            return res.status(422).json({result : false, error: e.message})
        }

    }else if (req.method ==="POST"){
        // console.log(req.body)
        const {_id} = req.body;
        // const rcv = await accommodations.findOne({_id: itemId})
        const rcv2 : Accommodation | null = await accommodations.findOne({_id})
        
        return res.status(200).json({result : true, datas : rcv2})

    }


}

export default handler;