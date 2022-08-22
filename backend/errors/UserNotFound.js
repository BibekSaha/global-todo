import { CustomError } from "./CustomError.js";

export class UserNotFound extends CustomError {
  constructor(email) {
    super(400, `No user with email ${email} is found`);
  }
}
