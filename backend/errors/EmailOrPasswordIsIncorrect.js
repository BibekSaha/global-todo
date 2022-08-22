import { CustomError } from "./CustomError.js";

export class EmailOrPasswordIsIncorrect extends CustomError {
  constructor() {
    super(400, 'Email / Password is incorrect');
  }
}