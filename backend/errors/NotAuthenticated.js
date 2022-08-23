import { CustomError } from './CustomError.js';

export class NotAuthenticated extends CustomError {
  constructor() {
    super(403, 'User is not authenticated');
  }
}
