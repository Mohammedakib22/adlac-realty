import mongoose, { Schema } from "mongoose";

const schema = new Schema({ name: { type: String, required: true, trim: true }, email: { type: String, lowercase: true, unique: true, sparse: true }, phone: String, role: String, location: String, experience: { type: Number, min: 0 }, rating: { type: Number, min: 0, max: 5 }, image: String, bio: { type: String, maxlength: 5000 }, active: { type: Boolean, default: true } }, { timestamps: true, versionKey: false });
export default mongoose.models.AldacAgent ?? mongoose.model("AldacAgent", schema);
