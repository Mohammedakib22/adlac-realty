import mongoose, { Schema } from "mongoose";

const schema = new Schema({ name: { type: String, required: true, maxlength: 160 }, slug: { type: String, required: true, unique: true }, developer: String, location: String, startingPrice: Number, configurations: [String], possessionDate: Date, status: { type: String, enum: ["new-launch", "under-construction", "ready-to-move"] }, images: [String], amenities: [String], description: { type: String, maxlength: 12000 } }, { timestamps: true, versionKey: false });
export default mongoose.models.AldacProject ?? mongoose.model("AldacProject", schema);
