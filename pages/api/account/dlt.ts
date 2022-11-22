import { NextApiHandler } from "next";
import { ResponseData } from "../../../interfaces/account";
import account from "../../../lib/models/account";
import dbConnect from "../../../lib/models/connect.js"

const handler :NextApiHandler<ResponseData> = async(req,res)=>{
    await dbConnect();
    if(req.method === "GET"){
        const {email} = req.query;
        // console.log(email);
        try{
            const rst = await account.findOneAndDelete({email : email})
            // console.log(rst)
            return res.json({result : true})
        }catch(e :any){
            return res.json({result : false, error : e.message})
        }
        
    }else if(req.method === "POST"){

    }

}

export default handler;