export class CustomError extends Error {
  statusCode;
  message;
  errorObject;

  constructor(statusCode, message, errorObject = null) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.errorObject = errorObject;
  }
}
