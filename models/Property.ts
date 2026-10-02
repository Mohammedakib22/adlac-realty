import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  slug: { type: String, unique: true, index: true, required: true, trim: true },
  name: { type: String, required: true, trim: true, maxlength: 140 },
  description: { type: String, required: true, maxlength: 12000 },
  location: { type: String, required: true, trim: true, maxlength: 120 },
  city: { type: String, required: true, trim: true, maxlength: 80 },
  price: { type: Number, required: true, min: 1 },
  priceLabel: { type: String, required: true, maxlength: 80 },
  type: { type: String, required: true, enum: ["Apartment", "Villa", "Penthouse", "Studio", "Plot"] },
  listing: { type: String, required: true, enum: ["Buy", "Rent"] },
  beds: { type: Number, required: true, min: 0, max: 20 },
  baths: { type: Number, required: true, min: 0, max: 20 },
  area: { type: Number, required: true, min: 50, max: 100000 },
  image: { type: String, required: true, maxlength: 2000 },
  images: [{ type: String, maxlength: 2000 }],
  tags: [{ type: String, maxlength: 80 }],
  agent: { type: String, required: true, maxlength: 120 },
  furnishing: { type: String, default: "Unfurnished", maxlength: 40 },
  featured: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  status: { type: String, enum: ["draft", "active", "pending", "sold", "leased"], default: "pending" },
  createdBy: { type: Schema.Types.ObjectId, ref: "AldacUser" },
}, { timestamps: true, versionKey: false });
schema.index({ name: "text", location: "text", city: "text", type: "text" });
const PropertyModel = (mongoose.models.AldacProperty ?? mongoose.model("AldacProperty", schema)) as mongoose.Model<mongoose.InferSchemaType<typeof schema>>;
export default PropertyModel;
