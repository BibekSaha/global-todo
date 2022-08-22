import { CustomError } from "./CustomError";

export class EmailOrPasswordIsIncorrect extends CustomError {
  constructor() {
    super(400, 'Email / Password is incorrect');
  }
}