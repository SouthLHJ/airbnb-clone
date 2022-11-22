import { NextApiHandler, NextApiRequest, NextConfig } from "next";
import {formidable} from "formidable"
import {getStorage,ref,getDownloadURL,uploadBytes} from "firebase/storage"
import { firebaseApp } from "../../../lib/firebase/firebase";
import fs from "fs"
import dbConnect from "../../../lib/models/connect.js"
export const config : NextConfig = {
    api: {
        bodyParser: false
    },
}

const handler : NextApiHandler = async(req,res)=>{
    await dbConnect();
    console.log("====uploadPhotos");
    // console.log(req.body); // 그냥은 볼 수 없고 모듈을 이용해서 가공해야한다.
    const form = formidable({multiples :true});
    const rst = await new Promise((resolve,reject)=>{
        form.parse(req, async(err,fields,files)=>{
            if(err){
                console.log("uploadPhotos form parse",err)
                resolve(
                    {result : false, error : err.message}
                )
            }
            let savePhotos = [];
            if(Array.isArray(files.photos)){
                const storage = getStorage(firebaseApp);
                
                const dirRef = ref(storage,"hosting/"+fields.itemId)
                for(let one of files.photos){
                    const fileRef = ref(dirRef, one.newFilename)
                    //one 의 type은 File이 아니므로 fs로 컨버트해줘야한다.
                    const file = fs.readFileSync(one.filepath);
                    const rst = await uploadBytes(fileRef,file,{contentType : one.mimetype!})
                    const url = await getDownloadURL(fileRef);
                    savePhotos.push(url);
                }
    
                // console.log(savePhotos);
                resolve(
                    {result : true, datas : savePhotos }
                ) 
            }else{
                const storage = getStorage(firebaseApp);
                const dirRef = ref(storage,"hosting/"+fields.itemId)
                const fileRef = ref(dirRef, files.photos.newFilename)
                const file = fs.readFileSync(files.photos.filepath);
    
                const rst = await uploadBytes(fileRef,file,{contentType :  files.photos.mimetype!})
                const url = await getDownloadURL(fileRef);
                // console.log(url);
                resolve(
                    {result : true, datas : [url] }
                )
    
            }
            
            // console.log("fields");
            // console.log(fields)
            // console.log("files");
            // console.log(files)
        })
        
    });
    // console.log(rst);
    return res.status(200).json(rst);




    // return res.status(200).json({});
}

export default handler;

