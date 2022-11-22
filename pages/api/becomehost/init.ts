import { NextApiHandler } from "next";
import { unstable_getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { Accommodation } from "../../../interfaces/becomehost/accommodation";
import accommodations from "../../../lib/models/accommodations";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "../../../lib/models/connect.js"

const handler : NextApiHandler = async(req,res)=>{
    await dbConnect();

    switch(req.method){
        // 호스트의 등록 된 숙소 불러오기
        case "GET" : 
            const {hostName} = req.query;
            // const rcv = await accommodations.findOne({_id: itemId})
            const rcv : Accommodation[] | null = await accommodations.find({hostName})

            return res.status(200).json({result : true, data : rcv})
            
        // 숙소 하나 불러오기
        case "POST" : 
            const {_id} = req.body;
            // const rcv = await accommodations.findOne({_id: itemId})
            const rcv2 : Accommodation | null = await accommodations.findOne({_id})
            
            return res.status(200).json({result : true, data : rcv2})
    }    

}

export default handler;