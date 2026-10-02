import mongoose, { Schema } from "mongoose";

const schema = new Schema({ email: { type: String, required: true, unique: true, lowercase: true, trim: true }, source: { type: String, default: "website" }, active: { type: Boolean, default: true } }, { timestamps: true, versionKey: false });
export default mongoose.models.AldacNewsletterSubscriber ?? mongoose.model("AldacNewsletterSubscriber", schema);
