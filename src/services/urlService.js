import Url from "../models/urlModel.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";

//Mutation

export const shortenUrl = async (_, { url }, context) => {
  try {
    const userId = context.req.user?.userId;

    const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000);
    const newUrl = new Url({ originalUrl: url, creator: userId, expiresAt });
    await newUrl.save();

    return `http://localhost:5000/${newUrl.shortId}`;
  } catch (error) {
    console.error(`url shortening error - ${error.message}`);
    throw new AppError(error.message);
  }
};

//Queries

export const getAUrl = async (shortId) => {
  try {
    const url = await Url.findOne({ shortId });

    return {
      id: url._id,
      originalUrl: url.originalUrl,
      creator: url.creator,
      clicks: url.clicks,
      expiresAt: url.expiresAt,
      shortId: url.shortId,
      analytics: url.analytics,
    };
  } catch (error) {
    console.error(`error: ${error.message}`);
    throw new AppError(error.message);
  }
};

export const analytics = async () => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    return urls.map((url) => ({
      ...url.toObject(),
      createdAt: new Date(url.createdAt).toISOString(),
    }));
  } catch (error) {
    console.error(`analytic error - ${error.message}`);
    throw new AppError(error.message);
  }
};

export const getShortUrlAnalytics = async (_, { shortId }) => {
  try {
    const url = await Url.findOne({ shortId });
    if (!url) {
      console.log(`no url found bruh!`);
      throw new AppError("url not found");
    }

    return url.analytics || [];
  } catch (error) {
    console.log(error.message);
    throw new AppError(error.message);
  }
};

export const getMyUrls = async (_, __, context) => {
  try {
    const userId = context.req.user?.userId;
		const user = await User.findOne({ _id: userId });

    if (!user) {
      console.log("user not found");
      throw new Error("user not found");
    }

    const urls = await Url.find({ creator: userId });
    if (!urls.length) {
      console.log("user has no url");
      throw new Error("no url found for user");
    }

    return {
      creator: user,
			shortUrl: urls,
		};
  } catch (error) {
    console.log("error retreiving url: ", error.message);
    throw new AppError("an error occurred");
  }
};
