import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//Adding Routes 👀
app.use('/api/auth', authRoutes);



mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected – the database gates are open! 🎉'))
  .catch(err => console.error('MongoDB connection failed – check your spells!', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} – adventure awaits!`));

