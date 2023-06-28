const sendSuccess = (res, statusCode, message, data, totalCount) => {
  const response = {
    status: "success",
    code: statusCode,
    message,
    data,
  };

  if (totalCount !== null && totalCount !== undefined) {
    response.totalCount = totalCount;
  }

  return res.status(statusCode).json(response);
};

const sendError = (res, statusCode, message, error) => {
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message,
    error,
  });
};

module.exports = {
  sendSuccess,
  sendError,
};
