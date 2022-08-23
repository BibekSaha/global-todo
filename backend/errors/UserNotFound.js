import { CustomError } from "./CustomError.js";

export class UserNotFound extends CustomError {
  constructor(email = null) {
    if (email)
      super(400, `No user with email ${email} is found`);
    else super(400, 'User not found');
  }
}
