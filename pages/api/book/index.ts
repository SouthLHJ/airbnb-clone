import { NextApiHandler } from "next";
import book from "../../../lib/models/book";


const handler : NextApiHandler = async(req,res)=>{
    const rcv = await book.create(req.body)
    
    return res.status(201).json({result :true, datas  : rcv })
}


export default handler;