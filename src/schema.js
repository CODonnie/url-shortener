import gql from "graphql-tag";

const typeDefs = gql`
  type Url {
    shortId: String!
    originalUrl: String!
    clicks: Int!
    createdAt: String!
  }

  type Query {
    getUrl(shortId: String!): Url,
		getAnalytics: [Url!]
  }

  type Mutation {
    shortenedUrl(url: String!): String
  }
`;
export default typeDefs;
