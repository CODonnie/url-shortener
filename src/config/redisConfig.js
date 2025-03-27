import Redis from "ioredis";

const redisClient = new Redis();

redisClient.on("error", (err) => {
	console.error(`Redis error: ${err}`)
});

export default redisClient;
