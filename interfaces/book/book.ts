import mongoose from "mongoose"

export type Book = {
    _id ?:mongoose.Types.ObjectId,
    businessTravel : {
        workTrip  : boolean
    },
    checkinDate : string,
    checkoutDate : string,
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
}

export type Guest = {
    adult : number,
    child : number,
    infant : number,
    pet : number    
}