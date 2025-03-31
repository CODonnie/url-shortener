import mongoose from "mongoose";
import shortid from "shortid";

const UrlSchema = new mongoose.Schema({
	shortId: { type: String, default: shortid.generate, unique: true },
	originalUrl: { type: String, required: true },
	creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	clicks: { type: Number, default: 0 },
	expiresAt: { type: Date, expires: 604800 },
	analytics: [
		{
			ip: String,
			userAgent: String,
			accessedAt: { type: Date, default: () => new Date().toISOString() },
		}
	]
}, { timestamps: true });

UrlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const Url = mongoose.models.Url || mongoose.model("Url", UrlSchema);

export default Url;
