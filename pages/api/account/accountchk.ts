import { NextApiHandler } from "next";
import { Account, ResponseData } from "../../../interfaces/account";
import account from "../../../lib/models/account";

import dbConnect from "../../../lib/models/connect.js"

const handler : NextApiHandler<ResponseData> = async(req,res)=>{
    await dbConnect();
    const method = req.method;
    const profile = req.body?.profile ?? null;
    if(profile){
        try{
            let email;    
            if(profile?.iss){//구글
                email = profile.email;
            }else if(profile?.kakao_account){//카카오
                email = profile.kakao_account.email
            }else if(profile?.response){//네이버
                email = profile.response.email
            }
            const data = await account.findOne({email:email})
            // console.log(data)
            if(!data){
                let newData ;
                if(profile?.iss){
                    newData = {
                        email : email,
                        firstname : profile?.given_name ?? "",
                        secondname : profile?.family_name ?? "",
                        birth : new Date(),
                        password : "",
                        createdAt : new Date(),
                        term_market : null,
                        term_person : null
                    }
                }else if(profile?.kakao_account){
                    newData = {
                        email : email,
                        firstname : profile?.kakao_account.profile.nickname.slice(1,) ?? "",
                        secondname : profile?.kakao_account.profile.nickname.slice(0,1) ?? "",
                        birth : new Date(),
                        password : "",
                        createdAt : new Date(),
                        term_market : null,
                        term_person : null
                    }
                }else if(profile?.response){
                    newData = {
                        email : email,
                        firstname : profile?.response.name.slice(1,) ?? "",
                        secondname : profile?.response.name.slice(0,1) ?? "",
                        birth : new Date(),
                        password : "",
                        createdAt : new Date(),
                        term_market : null,
                        term_person : null
                    }
                }
                let nndata = await account.create(newData)
                return res.json({result : false, datas : nndata})
            }else{
                return res.json({result : true})
            }
        }catch(e:any){
            console.log("accountchk social error",e.message)
            return res.json({result : false})
        }

    }else{
        switch(method){
            case "POST" :
                const {email} = req.body;
                try{
                    const data = await account.findOne({email : email})
                    // console.log(email, data)
                    if(data){
                        return res.json({result : true, datas : data})
                    }else {
                        return res.json({result : false, error : "no data"})
                    }
    
                }catch(e:any){
                    console.log("accountchk Err =>",e.message)
                }
        }
    }
    
}

export default handler;