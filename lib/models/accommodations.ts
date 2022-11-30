import mongoose from "mongoose";
import { Accommodation } from "../../interfaces/becomehost/accommodation";

const AccommodationSchema = new mongoose.Schema<Accommodation>({
    hostName : String,
    typeGroup : String,
    type : String,
    privacy : String,
    location : Object,
    floorPlan : Object,
    amenities : Object,
    photos : Array,
    title : String,
    description : Object,
    price : Number,
    register : Date,
    createdAt : Date,
})

AccommodationSchema.virtual("book",{
    localField : "_id",
    ref : "Book",
    foreignField : "roomId"
})


export default mongoose.models.Accommodation as mongoose.Model<Accommodation> || mongoose.model<Accommodation>("Accommodation",AccommodationSchema)