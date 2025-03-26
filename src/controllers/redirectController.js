import Url from "../models/urlModel.js";

//@desc - redirect shortened url to originalUrl
//@route - GET/:shortId
export const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
    const urlEntry = await Url.findOneAndUpdate(
			{ shortId },
			{ $inc : { clicks: 1 } },
			{ new: true },
		);
		console.log('increased');

    if (!urlEntry) {
      return res.status(404).send("<h1>404: Url not found</h1>");
    }

    res.redirect(urlEntry.originalUrl);
  } catch (error) {
    console.error(`redirection error - ${error}`);
    res.status(500).json({ error: "an error occured" });
  }
};
