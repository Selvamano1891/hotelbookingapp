import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchBookings } from "../services/api";

interface Booking {
  id: string;
  hotelId: string;
  rooms: number;
  checkIn: string;
  checkOut: string;
}

const BookingsList: React.FC = () => {
  const [bookings, setBookings] = useState<any>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
      const getBookingList = async () => {
        try {
          const data = await fetchBookings();
          setBookings(data);
        } catch (err) {
          setError("Failed to fetch hotels");
        } finally {
            setBookings(false);
        }
      };
  
      getBookingList();
    }, []); // Empty dependency array means it runs once on mount

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const closeModal = () => {
    setSelectedBooking(null);
  };

  return (
    <div>
      <h1>Your Bookings</h1>
      <ul>
        {bookings.map((booking:Booking) => (
          <li key={booking.id} onClick={() => handleBookingClick(booking)} style={{ cursor: "pointer", textDecoration: "underline" }}>
            Hotel ID: {booking.hotelId}, Rooms: {booking.rooms}, Check-in: {booking.checkIn}, Check-out: {booking.checkOut}
          </li>
        ))}
      </ul>
      {selectedBooking && (
        <div className="modal" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
          <h2>Booking Details</h2>
          <p><strong>Hotel ID:</strong> {selectedBooking.hotelId}</p>
          <p><strong>Rooms:</strong> {selectedBooking.rooms}</p>
          <p><strong>Check-in:</strong> {selectedBooking.checkIn}</p>
          <p><strong>Check-out:</strong> {selectedBooking.checkOut}</p>
          <button onClick={closeModal} style={{ marginTop: "10px", padding: "5px 10px" }}>Close</button>
        </div>
      )}
    </div>
  );
};

export default BookingsList;