import mongoose, { Schema } from "mongoose";

const schema = new Schema({ propertyId: String, propertyName: { type: String, maxlength: 160 }, agent: { type: String, maxlength: 120 }, userId: { type: Schema.Types.ObjectId, ref: "AldacUser" }, name: { type: String, required: true, trim: true, maxlength: 120 }, email: { type: String, required: true, lowercase: true, trim: true, maxlength: 254 }, phone: { type: String, maxlength: 24 }, subject: { type: String, maxlength: 160 }, message: { type: String, required: true, maxlength: 4000 }, status: { type: String, enum: ["new", "contacted", "closed"], default: "new" } }, { timestamps: true, versionKey: false });
schema.index({ email: 1, createdAt: -1 });
export default mongoose.models.AldacInquiry ?? mongoose.model("AldacInquiry", schema);
