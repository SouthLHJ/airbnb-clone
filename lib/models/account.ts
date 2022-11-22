import mongoose from "mongoose";
import { Account } from "../../interfaces/account";

const AccountSchema = new mongoose.Schema<Account>({
    email : String,
    password : String,
    firstname : String,
    secondname : String,
    birth :Date,
    term_market : Date,
    term_person : Date,
    createdAt : Date,
})

export default mongoose.models.Account as mongoose.Model<Account> || mongoose.model<Account>("Account",AccountSchema)