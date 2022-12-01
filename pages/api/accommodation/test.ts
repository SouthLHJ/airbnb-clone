


import { NextApiHandler } from "next";

import book from "../../../lib/models/book";
import dbConnect from "../../../lib/models/connect";


const handler : NextApiHandler = async(req,res)=>{
    await dbConnect();

    const a = await book.find().populate("roomData");
    res.json(a);
}

export default handler;