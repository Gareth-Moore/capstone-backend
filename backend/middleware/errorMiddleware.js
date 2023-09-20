// for routes that do not exist:
const routeNotFound = (req, res, next) => {
  const error = new Error(`Not Found = ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// global error handler
const globalErrorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // resource not found
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  // return error stack
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

export { routeNotFound, globalErrorHandler };
