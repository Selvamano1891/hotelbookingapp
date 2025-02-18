const client = require('../config/redis');
const bookings = {};

exports.bookRoom = async (req, res) => {
    const { hotelId, user, rooms, checkIn, checkOut } = req.body;
    if (!hotelId || !user || !rooms || !checkIn || !checkOut) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const bookingId = `booking_${Date.now()}`;
    const bookingData = { hotelId, user, rooms, checkIn, checkOut };
    bookings[bookingId] = bookingData;
    await client.set(bookingId, JSON.stringify(bookingData));
    
    res.status(201).json({ message: 'Room booked successfully', bookingId, bookingData });
};

exports.getUserBookings = async (req, res) => {
    const { user } = req.params;

    const keys = await client.keys('booking_*');
    const bookings = await Promise.all(keys.map(async key => {
        const booking = await client.get(key);
        return booking ? JSON.parse(booking) : null;
    }));
    //res.json(bookings.filter(Boolean));
    const userBookings = Object.entries(bookings).filter(([_, value]) => value.user === user)
        .map(([id, data]) => ({ id, ...data }));
    
    res.json(userBookings);
};

exports.modifyBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { checkIn, checkOut } = req.body;

    if (!bookings[bookingId]) {
        return res.status(404).json({ message: 'Booking not found' });
    }

    bookings[bookingId].checkIn = checkIn || bookings[bookingId].checkIn;
    bookings[bookingId].checkOut = checkOut || bookings[bookingId].checkOut;
    await client.set(bookingId, JSON.stringify(bookings[bookingId]));

    res.json({ message: 'Booking updated successfully', bookingData: bookings[bookingId] });
};

exports.cancelBooking = async (req, res) => {
    const { bookingId } = req.params;
    
    if (!bookings[bookingId]) {
        return res.status(404).json({ message: 'Booking not found' });
    }

    delete bookings[bookingId];
    await client.del(bookingId);

    res.json({ message: 'Booking cancelled successfully' });
};
