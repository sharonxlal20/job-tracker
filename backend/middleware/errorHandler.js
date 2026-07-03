const errorHandler = (err, req, res, next) => {
  console.error(err); // full error still logs in your terminal, for your own debugging

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong, please try again';

  // Invalid MongoDB ObjectId (e.g. malformed job id in the URL)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Mongoose schema validation failed (missing required field, bad enum value, etc.)
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
  }

  // Duplicate key error (e.g. signing up with an email that already exists)
  if (err.code && err.code === 11000) {
    statusCode = 400;
    message = `Duplicate value entered for ${Object.keys(err.keyValue)} field`;
  }

  res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;