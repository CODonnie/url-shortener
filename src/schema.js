import gql from "graphql-tag";

const typeDefs = gql`
  type Url {
    shortId: String!
    originalUrl: String!
    clicks: Int!
    createdAt: String!
  }

	type User {
		id: ID!
		name: String!
		email: String!
		createdAt: String!
	}

	type AuthPayloader {
		id: ID!
		name: String!
		email: String!
		token: String!
	}

	type returnMessage {
		message: String
	}

  type Query {
    getUrl(shortId: String!): Url,
		getAnalytics: [Url!]
		getUser: [User!]
  }

  type Mutation {
		signUp(name: String!, email: String!, password: String!): User
		login(email: String!, password: String!): AuthPayloader!
		logout: returnMessage
    shortenedUrl(url: String!): String
  }
`;
export default typeDefs;
