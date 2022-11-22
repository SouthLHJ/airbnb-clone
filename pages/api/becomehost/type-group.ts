import { NextApiHandler } from "next";
import { BecomeHostResponse, Category } from "../../../interfaces/becomehost/accommodation";
import accommodations from "../../../lib/models/accommodations";
import typeCategories from "../../../lib/models/typeCategories";
import dbConnect from "../../../lib/models/connect.js"
const handler : NextApiHandler<BecomeHostResponse> = async(req,res)=>{
    await dbConnect();
    switch(req.method){
        case "GET" :
            try{
                const data = await typeCategories.find({})
                if(data){
                // console.log(data)
                return  res.status(200).json({result : true, datas : data})
            }else{
                
            }
            }catch(e :any){
                console.log("type-group api get err" , e.message)
                return res.status(422).json({result:false, error : e.message})
            }


        case "POST" :   
            // console.log(req.body)
            try{
                const rst = await accommodations.create(req.body)
                return res.status(201).json({result : true, datas : rst})

            }catch(e :any){
                
                console.log("type-group api post err" , e.message)
                return res.status(422).json({result:false, error : e.message})
            }

    }
}

export default handler;