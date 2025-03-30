import Url from "../models/urlModel.js";
import redisClient from "../config/redisConfig.js"

//@desc - redirect shortened url to originalUrl
//@route - GET/:shortId
export const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
		const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress

    const urlEntry = await Url.findOneAndUpdate(
			{ shortId },
			{
				$inc : { clicks: 1 },
			  $push: { analytics: { ip, accessedAt: new Date() } },
			},
			{ new: true },
		);

    if (!urlEntry || urlEntry.expiresAt < new Date()) {
      return res.status(404).send("<h1>404: Url not found</h1>");
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
