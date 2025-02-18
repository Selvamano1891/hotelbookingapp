import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

interface HotelCardProps {
  hotel: {
    id: string;
    name: string;
    location: string;
    description: string;
  };
  onBook: (hotelId: string) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onBook }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{hotel.name}</Typography>
        <Typography color="textSecondary">{hotel.location}</Typography>
        <Typography>{hotel.description}</Typography>
        <Button variant="contained" color="primary" onClick={() => onBook(hotel.id)}>
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default HotelCard;