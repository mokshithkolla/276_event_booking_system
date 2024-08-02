import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bookingRoutes from './routes/bookings';
import eventRoutes from './routes/events';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/events', eventRoutes);
app.use('/bookings', bookingRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/event-booking-system')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
