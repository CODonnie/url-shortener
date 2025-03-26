import mongoose from "mongoose";
import shortid from "shortid";

const UrlSchema = new mongoose.Schema({
	shortId: { type: String, default: shortid.generate, unique: true },
	originalUrl: { type: String, required: true },
	clicks: { type: Number, default: 0 }
}, { timestamps: true });

const Url = mongoose.models.Url || mongoose.model("Url", UrlSchema);

export default Url;
