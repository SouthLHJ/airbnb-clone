export type Book = {
    businessTravel : {
        workTrip  : boolean
    },
    checkinDate : string,
    checkoutDate : string,
    confirmationCode ?: string,
    guestCounts : Guest,
    guestCurrencyOverride : string,
    lux ?: object,
    metadata ?: {
        internalFlags : string[]
    },
    org ?: object,
    roomId : string,
    completePay ?: Date,
    hostname : string,
    booker : string,
}

export type Guest = {
    adult : number,
    child : number,
    infant : number,
    pet : number    
}