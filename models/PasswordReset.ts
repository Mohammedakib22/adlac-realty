import mongoose, { Schema } from "mongoose";

const schema = new Schema({ userId: { type: Schema.Types.ObjectId, ref: "AldacUser", required: true }, tokenHash: { type: String, required: true, unique: true }, expiresAt: { type: Date, required: true, expires: 0 } }, { timestamps: true, versionKey: false });
export default mongoose.models.AldacPasswordReset ?? mongoose.model("AldacPasswordReset", schema);
