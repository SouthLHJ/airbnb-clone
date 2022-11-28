import mongoose from "mongoose"

export type Reserve = {
    _id ?:mongoose.Types.ObjectId,
    checkinDate : Date,
    checkoutDate : Date,
    roomId : string,
    guestname : string,
    hostname : string,
}