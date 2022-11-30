import mongoose from "mongoose"
import { Book } from "../book/book"

export type BecomeHostResponse = {
    result : boolean,
    datas ?: Category[] | Accommodation[] | Accommodation,
    error ?: string
}

export type Accommodation = {
    _id?: mongoose.Types.ObjectId,
    hostName : string,
    typeGroup : string,
    type ?: string,
    privacy ?: string,
    location ?: Location,
    floorPlan ?: FloorPlan,
    amenities ?: Amenities,
    photos ?: string[],
    title ?: string,
    description ?: Description,
    price ?: number,
    register ?: Date,
    createdAt  : Date,
    book : Book[]
}

export type Location = {
    state : string,
    city : string,
    street : string,
    apt ?: string,
    zipcode : string,
    countrycode : string,
    view : boolean,
    lng : string,
    lat : string,
}

export type FloorPlan = {
    guest : number,
    bed : number,
    bathroom : number,
}

export type Amenities ={
    specialConvenient : string[],
    convenient : string[],
    safeItem : string[],
}

export type Description = {
    categories : string[],
    comment : string,
}

export type Category = {
    _id ?: mongoose.Types.ObjectId,
    group : string,
    image : string,
    types : Category_Type[]
}

export type Category_Type = {
    property : string,
    description : string,
}