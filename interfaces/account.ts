import mongoose from "mongoose";

export type Account = {
    _id ?: mongoose.Types.ObjectId,
    email : string,
    secondname : string,
    firstname : string,
    password : string,
    birth : Date,
    term_market : Date | null,
    term_person : Date | null,
    createdAt : Date,
}

export type ResponseData = {
    result  : boolean,
    datas?: Account,
    error?: string,
}