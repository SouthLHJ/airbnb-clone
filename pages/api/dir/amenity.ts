import { NextApiHandler } from "next";
import dbConnect from "../../../lib/models/connect";
import dirAmenities from "../../../lib/models/dirAmenities";


const handler : NextApiHandler = async (req,res)=>{
    await dbConnect();
    if(req.method === "GET"){
        // console.log(req.method);
        const rcv = await dirAmenities.find({});
        // console.log(rcv);
        return res.status(200).json({result : true, datas : rcv})
    }
}

export default handler;