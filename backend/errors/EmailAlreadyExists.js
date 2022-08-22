import { CustomError } from "./CustomError.js";

export class EmailAlreadyExists extends CustomError {
  constructor(email) {
    super(400, `${email} already exists`);
  }
}