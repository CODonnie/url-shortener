import Url from "../models/urlModel.js";
import redisClient from "../config/redisConfig.js";

export const cleanupExpiredUrls = async () => {
  try {
    const now = new Date();
    const expiredUrls = await Url.find({ expiresAt: { $lt: now } });

    for (const url of expiredUrls) {
      await redisClient.del(url.shortId);
      await Url.deleteOne({ shortId: url.shortId });
      console.log(`Deleted expired URL: ${url.shortId}`);
    }
  } catch (error) {
    console.error("Cleanup error:", error);
  }
};

setInterval(cleanupExpiredUrls, 3600000);
