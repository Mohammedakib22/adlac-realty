import mongoose, { Schema } from "mongoose";

const schema = new Schema({ propertyId: { type: String, required: true }, propertyName: { type: String, required: true, maxlength: 160 }, userId: { type: Schema.Types.ObjectId, ref: "AldacUser" }, name: { type: String, required: true, trim: true, maxlength: 120 }, email: { type: String, required: true, lowercase: true, trim: true, maxlength: 254 }, phone: { type: String, required: true, maxlength: 24 }, date: { type: Date, required: true }, time: { type: String, required: true, maxlength: 30 }, message: { type: String, maxlength: 2000 }, status: { type: String, enum: ["requested", "confirmed", "completed", "cancelled"], default: "requested" } }, { timestamps: true, versionKey: false });
schema.index({ date: 1, status: 1 });
export default mongoose.models.AldacVisit ?? mongoose.model("AldacVisit", schema);
