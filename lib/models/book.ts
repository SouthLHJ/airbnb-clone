import mongoose from "mongoose";
import { Book } from "../../interfaces/book/book";

const BookSchema = new mongoose.Schema<Book>({
    businessTravel : Object,
    checkinDate : String,
    checkoutDate : String,
    confirmationCode : String,
    guestCounts : Object,
    guestCurrencyOverride : String,
    lux : Object,
    metadata : Object,
    org : Object,
    roomId : String,
    completePay : Date,
})

export default mongoose.models.Book as mongoose.Model<Book> || mongoose.model<Book>("Book",BookSchema)