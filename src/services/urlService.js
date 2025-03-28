import Url from "../models/urlModel.js";
import AppError from "../utils/appError.js";

//Mutation

export const shortenUrl = async (url) => {
  try {
    const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000);
    const newUrl = new Url({ originalUrl: url, expiresAt });
    await newUrl.save();

    return `http://localhost:5000/${newUrl.shortId}`;
  } catch (error) {
    console.error(`url shorteninv error - ${error.message}`);
    throw new AppError(error.message);
  }
};

//Queries

export const getAUrl = async (shortId) => {
  try {
    const url = await Url.findOne({ shortId });
    return url;
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
