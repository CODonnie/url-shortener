import Url from "../models/urlModel.js";
import redisClient from "../config/redisConfig.js"

//@desc - redirect shortened url to originalUrl
//@route - GET/:shortId
export const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
		const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
		const userAgent = req.headers["user-agent"];
		const currentTime = new Date().toISOString();

    const urlEntry = await Url.findOne({ shortId });
    if (!urlEntry || urlEntry.expiresAt < currentTime) {
      return res.status(404).send("<h1>404: Url not found</h1>");
    };

		const lastAccess = urlEntry.analytics.find(
			(entry) => entry.ip === ip && currentTime - entry.accessedAt < 30 * 60 * 1000
		)

		if(!lastAccess){
			if(urlEntry.analytics.length >= 100){
				urlEntry.analytics.shift();
			}

			urlEntry.analytics.push({ ip, userAgent, accessedAt: currentTime });
			urlEntry.clicks += 1;
			await urlEntry.save();
		}

		const cachedUrl = await redisClient.get(shortId);
		if(cachedUrl){
			console.log("Cache hit, redirecting from redis cache");
			return res.redirect(cachedUrl)
		}

		await redisClient.set(shortId, urlEntry.originalUrl, "EX", 604800);
		console.log("Cache miss, retrieved and redirecting from DB, saved to Redis");
    res.redirect(urlEntry.originalUrl);
  } catch (error) {
    console.error(`redirection error - ${error}`);
    res.status(500).json({ error: "an error occured" });
  }
};
