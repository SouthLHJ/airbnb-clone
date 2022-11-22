import { hash } from "bcryptjs";
import { NextApiHandler } from "next";
import { Account, ResponseData } from "../../../interfaces/account";
import account from "../../../lib/models/account";
import dbConnect from "../../../lib/models/connect.js"

const handler : NextApiHandler<ResponseData> = async(req,res)=>{
    await dbConnect();
    if("POST" == req.method){
        const {email,birth,firstname,password,secondname} = req.body as Account;
        let market = null;
        if(req.body.market){
            market = new Date();
        }
        const createdAt = new Date();
        //비밀번호 암호화
        const hashedpw = await hash(password, 12);
        const data : Account = {
            email,
            password : hashedpw,
            secondname,
            firstname,
            birth,
            term_market : market,
            term_person : null,
            createdAt
        }
        try{
            if(req.body.social){
                const rst = await account.findOneAndUpdate({email: email},data) ;
                return res.status(201).json({result : true, datas : rst as Account})
            }else{
                const rst = await account.create(data);
                return res.status(201).json({result : true, datas : rst})
            }
    
        }catch(e : any){
            return res.status(401).json({result : false , error : e.message})
        }
    }else if ("GET"== req.method){
        const {person, email} = req.query;
        try{
            const rst = await account.findOneAndUpdate({email: email}, {term_person : new Date()},{returnDocument : "after"})
            if(rst){
                return res.json({result : true, datas : rst})
            }else{
                return res.json({result : false, error : "no data"})
            }
        }catch(e : any){
            return res.json({result : false, error  : e.message})
        }

    }



}

export default handler;