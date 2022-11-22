import mongoose from "mongoose";

export type DirAmenity = {
    _id ?: mongoose.Types.ObjectId,
    amenitiy : string,
    ko : string,
    image : string,
}

const DirAmenitiesSchema = new mongoose.Schema<DirAmenity>({
    amenitiy : String,
    ko : String,
    image : String,
})

export default mongoose.models.dirAmenity as mongoose.Model<DirAmenity> || mongoose.model<DirAmenity>("dirAmenity",DirAmenitiesSchema)