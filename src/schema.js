import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    shortenURL(url: String!): String
  }
`;

export default typeDefs;
