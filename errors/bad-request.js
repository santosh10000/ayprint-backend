import { StatusCodes } from "http-status-codes";
import CustomApiError from "./custom-api.js";

class BadRequestError extends CustomApiError {
  constructor(message, statusCodes) {
    super(message);
    this.statusCodes = StatusCodes.BAD_REQUEST;
  }
}
export default BadRequestError;
