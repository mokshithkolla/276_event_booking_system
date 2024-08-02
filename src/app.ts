import express from 'express';
import mongoose from 'mongoose';
import eventRoutes from './routes/events';
import bookingRoutes from './routes/bookings';

const app = express();
app.use(express.json());

// Use event and booking routes
app.use('/events', eventRoutes);
app.use('/bookings', bookingRoutes);

// Connect to MongoDB
const startServer = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/event-booking-system');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
};

startServer();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app; 
