import mongoose from "mongoose";
import { Reserve } from "../../interfaces/book/reserve";

const ReserveSchema = new mongoose.Schema<Reserve>({
    checkinDate : Date,
    checkoutDate : Date,
    roomId : String,
    guestname : String,
    hostname : String,
})

export default mongoose.models.Reserve as mongoose.Model<Reserve> || mongoose.model<Reserve>("Reserve",ReserveSchema)