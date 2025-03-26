const errorHandler = (err, req, res, next) => {
	console.log(`Error: ${err.message}`);

	res.status(err.statusCode || 500).json({
		message: err.message || "Internal server error",
		stack: process.env.NODE_ENV === "production" ? null : err.stack
	});
}

export default errorHandler;
