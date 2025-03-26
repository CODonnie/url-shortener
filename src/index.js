import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import dotenv from "dotenv";
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";
import connectDB from "./config/dbConnection.js";
import urlRoutes from "./routes/urlRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";

//init
dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT;

//ApolloServer setup
const server = new ApolloServer({
	typeDefs,
	resolvers
});

//GRAPHQL middleware
async function startServer() {
	await server.start();

	app.use(cors());
	app.use(express.json());
	app.use("/graphql", expressMiddleware(server));

	//use Routes
	app.use("/", urlRoutes);

	//use Middleware
	app.use(errorHandler);

	app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}

startServer();
