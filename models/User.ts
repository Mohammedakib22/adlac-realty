import mongoose, { Schema } from "mongoose";
import type { UserRole } from "@/lib/session";

const schema = new Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  phone: { type: String, trim: true, maxlength: 24 },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ["USER", "AGENT", "ADMIN"], default: "USER", required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true, versionKey: false });
export type UserDocument = mongoose.InferSchemaType<typeof schema> & { _id: mongoose.Types.ObjectId; role: UserRole };
export default (mongoose.models.AldacUser as mongoose.Model<UserDocument> | undefined) ?? mongoose.model<UserDocument>("AldacUser", schema);
