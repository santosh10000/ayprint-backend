import { StatusCodes } from "http-status-codes";

class CustomApiError extends Error {
  constructor(message, statusCodes) {
    super(message);
  }
}

export default CustomApiError;
