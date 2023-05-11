const AppError = require('./../utils/appError');
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProduct = (err, res) => {
  // Operational, trusted error: send message to clinet
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    //Programing or other unknown error: don't leak error details
  } else {
    // 1 Log error
    // console.error('Error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    if (err.name === 'CastError') {
      err = {
        statusCode: 400,
        message: `Invalid ${err.path}: ${err.value}`,
        isOperational: true,
        status: 'fail',
      };
    }
    sendErrorProduct(err, res);

    console.log('Loi roi:', err);
    // console.log('Loi roi:2', err);
  }
};
