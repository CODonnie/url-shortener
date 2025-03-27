import Url from "../models/urlModel.js"

//Mutation

export const shortenUrl = async (url) => {
	try{
		const newUrl = new Url({ originalUrl: url });
		await newUrl.save();

		return `http://localhost:5000/${newUrl.shortId}`;
	}catch(error){
		console.error(`url shorteninv error - ${error.message}`);
	}
}

//Queries

export const getAUrl = async (shortId) => {
	try{
		const url = await Url.findOne({ shortId });
		return url
	} catch(error) {
		console.error(`error: ${error.message}`);
	}
}

export const analytics = async () => {
	try{
		const urls = await Url.find().sort({ createdAt: -1 });
		return urls.map(url => ({
			...url.toObject(),
			createdAt: new Date(url.createdAt).toISOString()
		}))
	} catch(error) {
		console.error(`analytic error - ${error.message}`);
	}
}
