import mongoose from "mongoose";
import { Book } from "../../interfaces/book/book";

const BookSchema = new mongoose.Schema<Book>({
    businessTravel : Object,
    checkinDate : Date,
    checkoutDate : Date,
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
    price : Number,
    reserveTime : {type : Date},
})

export default mongoose.models.Book as mongoose.Model<Book> || mongoose.model<Book>("Book",BookSchema)


BookSchema.virtual("roomData", {
    localField: "roomId",
    ref: "Accommodation",
    foreignField: "_id",
  });


  /*
  const one = await Booking.findById(id).populate("product").lean();
  if (!one) {
    return {
      notFound: true,
    };
  }

  */
  