import mongoose, { Schema } from "mongoose";

const schema = new Schema({ userId: { type: Schema.Types.ObjectId, ref: "AldacUser", required: true }, propertyId: { type: String, required: true } }, { timestamps: true, versionKey: false });
schema.index({ userId: 1, propertyId: 1 }, { unique: true });
export default mongoose.models.AldacFavorite ?? mongoose.model("AldacFavorite", schema);
