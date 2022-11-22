import { NextApiHandler } from "next";
import {getStorage,ref,getDownloadURL,uploadBytes,deleteObject} from "firebase/storage"
import { firebaseApp } from "../../../lib/firebase/firebase";

const handler : NextApiHandler = async(req,res)=>{
    // console.log(req.body);
    const splitarr = req.body[0].split("%2F")
    // console.log(splitarr)
    const storage = getStorage(firebaseApp);
    const dirRef = ref(storage,"hosting/"+splitarr[1])
    const fileRef = ref(dirRef,splitarr[2].split("?")[0])
    const rst = await deleteObject(fileRef)

    if(rst === undefined){
        return res.status(200).json({result : true})
    }else{
        return res.status(422).json({result : false})
    }
}

export default handler;