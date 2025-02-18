import axios from "axios";

const API_BASE_URL = process.env.API_URL;

interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
}

interface Booking {
  hotelId: string;
  rooms: number;
  checkIn: string;
  checkOut: string;
}

export const fetchHotels = async (): Promise<Hotel[]> => {
  try {
    const response = await axios.get<Hotel[]>(`${API_BASE_URL}/hotels`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels", error);
    throw error;
  }
};

export const fetchBookings = async (): Promise<Booking[]> => {
  try {
    const response = await axios.get<Booking[]>(`${API_BASE_URL}/bookings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings", error);
    throw error;
  }
};

export const createBooking = async (bookingData: Booking): Promise<Booking> => {
  try {
    const response = await axios.post<Booking>(`${API_BASE_URL}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    console.error("Error creating booking", error);
    throw error;
  }
};

export const updateBooking = async (bookingId: string, updatedData: Partial<Booking>): Promise<Booking> => {
  try {
    const response = await axios.put<Booking>(`${API_BASE_URL}/bookings/${bookingId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating booking", error);
    throw error;
  }
};

export const deleteBooking = async (bookingId: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/bookings/${bookingId}`);
  } catch (error) {
    console.error("Error deleting booking", error);
    throw error;
  }
};