import User from '../models/user.schema.js';

export const deleteUser = async (req, res) => {
  try {
    const { user } = req;
    await User.findByIdAndDelete(user._id);
    return res.status(200).json({
      status: 'success',
      data: {
        message: `User with email ${user.email} deleted successfully`
      }
    })  
  } catch (err) {
    next(err);
  }
};