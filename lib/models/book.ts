import mongoose from "mongoose";
import { Book } from "../../interfaces/book/book";

const BookSchema = new mongoose.Schema<Book>({
    businessTravel : Object,
    checkinDate : String,
    checkoutDate : String,
    guestCounts : Object,
    guestCurrencyOverride : String,
    lux : Object,
    metadata : Object,
    org : Object,
    roomId : String,
    paypal_orderID : String,
    paypal_payerID : String,
    pay_service : String,
    guestname : String,
    hostname : String,
    

})

export default mongoose.models.Book as mongoose.Model<Book> || mongoose.model<Book>("Book",BookSchema)