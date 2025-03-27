import { getAUrl, analytics, shortenUrl } from "./services/urlService.js";

const resolvers = {
  Query: {
    getUrl: async (_, { shortId }) => getAUrl(shortId),
		getAnalytics: async () => analytics(),
	},
  Mutation: {
    shortenedUrl: async (_, { url }) => shortenUrl(url),
  },
};

export default resolvers;
