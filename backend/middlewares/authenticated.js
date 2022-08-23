import jwt from 'jsonwebtoken';
import { CustomError } from '../errors/CustomError.js';
import { NotAuthenticated } from '../errors/NotAuthenticated.js';
import { UserNotFound } from '../errors/UserNotFound.js';
import User from '../models/user.schema.js';

export const authenticated = async (req, _res, next) => {
  try {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new NotAuthenticated();
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) throw new UserNotFound();
    req.user = user;
    next();
  } catch (err) {
    if (err.name)
      // JWT token error
      next(new CustomError(403, `${err.name} - ${err.message}`));
    else next(err);
  }
}