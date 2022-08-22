import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './server.js';

async function main() {
  dotenv.config();
  const { PORT = 8000 } = process.env;
  try {
    await mongoose.connect(process.env.DB_URI);
    app.listen(PORT, () => {
      console.log(`🚀 Running @ http://localhost:${PORT}`);
    })
  } catch (err) {
    console.error('Cannot connect to the database', err);
    process.exit(1);
  }
}

main()
  .catch(console.error);
