import mongoose from "mongoose";
import { Category } from "../../interfaces/becomehost/accommodation";

const CategoriesSchema = new mongoose.Schema<Category>({
    group : String,
    image : String,
    types : Object
})

export default mongoose.models.Category as mongoose.Model<Category> || mongoose.model<Category>("Category",CategoriesSchema)