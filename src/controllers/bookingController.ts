import { Request, Response } from 'express';
import Event from '../models/event';
import Booking from '../models/booking';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { eventId, quantity } = req.body;

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if enough tickets are available
    if (event.totalTickets - event.bookedTickets < quantity) {
      return res.status(400).json({ error: 'Not enough tickets available' });
    }

    // Create the booking
    const booking = new Booking({
      eventId,
      quantity,
    });
    await booking.save();

    // Update the event's booked tickets
    event.bookedTickets += quantity;
    await event.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Error creating booking' });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.id;

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Find the associated event
    const event = await Event.findById(booking.eventId);
    if (event) {
      // Update the event's booked tickets
      event.bookedTickets -= booking.quantity;
      await event.save();
    }

    // Delete the booking
    await Booking.deleteOne({ _id: bookingId });

    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ error: 'Error cancelling booking' });
  }
};
