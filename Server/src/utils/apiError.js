export const sendError = (statusCode, message, errorDetails = {}) => {
  return {
    success: false,
    statusCode,
    message,
    errorDetails,
  };
};
