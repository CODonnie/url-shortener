import { getAUrl, analytics, shortenUrl } from "./services/urlService.js";
import { loginUser, logoutUser, createUser, getUser } from "./services/authServices.js";
import { protect } from "./middlewares/authMiddleware.js";

const resolvers = {
  Query: {
    getUrl: async (_, { shortId }, context) => {
			protect(context);
			return await getAUrl(shortId);
		},
    getAnalytics: async (_, __, context) => {
			protect(context);
			return await analytics();
		},
		getUser: async (_, __, context) => {
			protect(context);
			return await getUser();
		}
	},
  Mutation: {
    signUp: async (_, args) => {
      return await createUser(_, args);
    },
    login: async (_, args, context) => {
      return await loginUser(_, args, context);
    },
    logout: (_, __, context) => {
			return logoutUser(_, __, context);
		},
    shortenedUrl: async (_, { url }, context) => {
			protect(context);
			return await shortenUrl(url);
		},
	},
};

export default resolvers;
