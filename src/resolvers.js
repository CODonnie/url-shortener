const resolvers = {
  Query: {
    hello: () => "Hello, GraphQL!",
  },
  Mutation: {
    shortenURL: (_, { url }) => {
      return `Shortened URL for: ${url}`;
    },
  },
};

export default resolvers;
