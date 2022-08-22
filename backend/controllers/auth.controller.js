import { CustomError } from '../errors/CustomError.js';
import { UserNotFound } from '../errors/UserNotFound.js';
import { EmailOrPasswordIsIncorrect } from '../errors/EmailOrPasswordIsIncorrect.js';
import User from '../models/user.schema.js';
import { EmailAlreadyExists } from '../errors/EmailAlreadyExists.js';

export const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) 
      throw new CustomError(400, "Email / Password is blank");
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new UserNotFound(email);
    if (!await user.checkPassword(password))
      throw new EmailOrPasswordIsIncorrect();
    const token = user.generateToken();
    res.cookie('token', token, { maxAge: 2000 * 60 * 60 * 1000, httpOnly: true });
    return res.status(200).json({
      status: 'success',
      data: {
        email: user.email,
        token
      }
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password)
      throw new CustomError(400, "Inadequate information provided");
    const user = await User.create({
      firstName, lastName, email, password
    });
    return res.status(200).json({
      status: 'success',
      data: {
        id: user._id,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at
      }
    });
  } catch (err) {
    if (err.code === 11000)
      next(new EmailAlreadyExists(Object.keys(err.keyValue)[0]));
    else next(err);
  }
}
