import React, { useState } from "react";
import axios from "axios";

interface Booking {
  hotelId: string;
  rooms: number;
  checkIn: string;
  checkOut: string;
}

const BookingPage: React.FC = () => {
  const [bookingData, setBookingData] = useState<Booking>({
    hotelId: "",
    rooms: 1,
    checkIn: "",
    checkOut: "",
  });
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const handleBooking = () => {
    axios.post("/api/bookings", bookingData)
      .then(() => {
        setBookingSuccess(true);
      })
      .catch(error => {
        console.error("Error booking room", error);
      });
  };

  const closeModal = () => {
    setBookingSuccess(false);
  };

  return (
    <div>
      <h1>Book a Room</h1>
      <input type="text" placeholder="Hotel ID" onChange={(e) => setBookingData({ ...bookingData, hotelId: e.target.value })} />
      <input type="number" placeholder="Rooms" onChange={(e) => setBookingData({ ...bookingData, rooms: Number(e.target.value) })} />
      <input type="date" onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })} />
      <input type="date" onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })} />
      <button onClick={handleBooking}>Book Now</button>
      {bookingSuccess && (
        <div className="modal" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
          <h2>Booking Successful</h2>
          <p>Your room has been booked successfully.</p>
          <button onClick={closeModal} style={{ marginTop: "10px", padding: "5px 10px" }}>Close</button>
        </div>
      )}
    </div>
  );
};

export default BookingPage;