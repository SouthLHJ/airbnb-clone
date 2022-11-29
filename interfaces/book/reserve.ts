import mongoose from "mongoose"

export type Reserve = {
    _id ?:mongoose.Types.ObjectId,
    checkinDate : Date,
    checkoutDate : Date,
    reserveTime : Date,
    roomId : string,
    guestname : string,
    hostname : string,
}