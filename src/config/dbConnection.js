import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongo_uri = process.env.MONGO_URI

const connectDB = async () => {
	try {
		const conn = await connect(mongo_uri);
		console.log(`db connected - ${conn.connection.host}`);
	} catch(error) {
		console.log(`db connection error - ${error}`);
		process.exit(1);
	}
}

export default connectDB
