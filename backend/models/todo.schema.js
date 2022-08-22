import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: [true, 'Title is required']
  },

  body: {
    type: String,
    required: [true, 'Body is required']
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Use'
  }
}, {
  timestamps: true
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
