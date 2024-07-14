export const sendResponse = (statusCode, message, data = {}) => {
  return {
    success: true,
    statusCode,
    message,
    data,
  };
};
