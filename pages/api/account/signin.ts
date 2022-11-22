import { compare } from "bcryptjs";
import { NextApiHandler } from "next";
import { Account, ResponseData } from "../../../interfaces/account";
import account from "../../../lib/models/account";
import dbConnect from "../../../lib/models/connect.js"


const handler : NextApiHandler<ResponseData> = async(req,res)=>{
    await dbConnect();
    const credentials = req.body;
    const user  = await account.findOne({email : credentials.email}) as Account ;
    // console.log("asdasd",user, (await compare(credentials.password,user.password)))

    if(!user || !(await compare(credentials.password,user.password))){
        return res.status(406).json({result  : false});
    }
    return  res.status(200).json({result  : true, datas:user})
}

export default handler;