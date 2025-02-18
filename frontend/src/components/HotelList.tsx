import React, { useEffect, useState } from "react";
import { fetchHotels } from "../services/api"; // Assuming this file contains API calls

interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
}

const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getHotels = async () => {
      try {
        const data = await fetchHotels();
        setHotels(data);
      } catch (err) {
        setError("Failed to fetch hotels");
      } finally {
        setLoading(false);
      }
    };

    getHotels();
  }, []); // Empty dependency array means it runs once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Hotels</h2>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.id}>{hotel.name} - {hotel.location}</li>
        ))}
      </ul>
    </div>
  );
};

export default HotelList;
