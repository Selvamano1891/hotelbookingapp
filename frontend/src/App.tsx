import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HotelList from "./components/HotelList";
import BookingPage from "./components/BookingPage";
import BookingsList from "./components/BookingList";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/my-bookings" element={<BookingsList />} />
      </Routes>
    </Router>
  );
};

export default App;