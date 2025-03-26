import Url from "./models/urlModel.js";

const resolvers = {
  Query: {
    getUrl: async (_, { shortId }) => {
      return await Url.findOne({ shortId });
    },
  },
  Mutation: {
    shortenedUrl: async (_, { url }) => {
      const newUrl = new Url({ originalUrl: url });
      await newUrl.save();
      return `http://localhost:5000/${newUrl.shortId}`;
    },
  },
};

export default resolvers;
