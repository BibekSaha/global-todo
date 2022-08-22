import { CustomError } from "./CustomError";

export class UserNotFound extends CustomError {
  constructor(email) {
    super(400, `No user with email ${email} is found`);
  }
}
