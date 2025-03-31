import Redis from "ioredis";

const redisClient = new Redis({
	host: "redis_cache",
	port: 6379,
});

redisClient.on("error", (err) => {
	console.error(`Redis error: ${err}`)
});

export default redisClient;
