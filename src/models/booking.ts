import mongoose, { Schema, Document } from 'mongoose';

interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  quantity: number;
  timestamp: Date;
}

const bookingSchema = new Schema<IBooking>({
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Booking = mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
