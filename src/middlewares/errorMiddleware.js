import AppError from "../utils/appError.js";

const errorHandler = (err) => {
  if (err.originalError instanceof AppError) {
    return {
      message: err.message,
      statusCode: err.originalError.statusCode,
    };
  }

  return {
    message: "Internal server error",
    statusCode: 500,
  };
};

export default errorHandler;
