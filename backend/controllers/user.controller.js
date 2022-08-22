import { CustomError } from '../errors/CustomError.js';
import { UserNotFound } from '../errors/UserNotFound';
import { EmailOrPasswordIsIncorrect } from '../errors/EmailOrPasswordIsIncorrect.js';
import User from '../models/user.schema.js';

export const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) 
      throw new CustomError(400, "Email / Password is blank");
    const user = await User.find({ email: req.body.email });
    if (!user) throw new UserNotFound(email);
    if (!user.checkPassword(password))
      throw new EmailOrPasswordIsIncorrect();
    return res.status(200).json({
      status: 'success',
      data: {
        token
      }
    });
  } catch (err) {
    next(err);
  }
}
