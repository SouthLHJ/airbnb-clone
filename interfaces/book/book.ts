import mongoose from "mongoose"
import { Accommodation } from "../../interfaces/becomehost/accommodation";

export type Book = {
    _id ?:mongoose.Types.ObjectId,
    businessTravel : {
        workTrip  : boolean
    },
    checkinDate : Date,
    checkoutDate : Date,
    guestCounts : Guest,
    guestCurrencyOverride : string,
    lux ?: object,
    metadata ?: {
        internalFlags : string[]
    },
    org ?: object,
    roomId : string,
    paypal_orderID ?: string,
    paypal_payerID ?: string,
    pay_service ?: string,
    guestname : string,
    hostname : string,
    price : number,
    reserveTime : Date | null,
    roomData ?: Accommodation[],
}

export type Guest = {
    adult : number,
    child : number,
    infant : number,
    pet : number    
}