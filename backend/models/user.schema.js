import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Todo from './todo.schema.js';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, 'Email is required'],
  }, 
  firstName: {
    type: String,
    required: [true, 'First name is required']
  }, 
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
}, {
  timestamps: true
});

userSchema.methods.checkPassword = async function (plainPassword) {
  const user = this;
  return await bcrypt.compare(plainPassword, user.password);
};

userSchema.methods.generateToken = function () {
  const user = this;
  return jwt.sign({
    id: user._id
  }, process.env.JWT_SECRET, {
    expiresIn: '2000h'
  });
}

userSchema.pre('save', async function () {
  // Hash the password before storing
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(
      user.password, 
      parseInt(process.env.SALT_ROUNDS)
    );
  }
});

userSchema.pre('remove', async function () {
  // Remove all the todos when the user is deleted
  const user = this;
  await Todo.remove({ user: user._id });
});

const User = mongoose.model('User', userSchema);

export default User;
