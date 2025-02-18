const client = require('../config/redis');

const hotels = [
    { id: 1, name: 'Hotel A', location: 'New York' },
    { id: 2, name: 'Hotel B', location: 'Los Angeles' }
];

exports.getHotels = async (req, res) => {
    const { location } = req.query;
    let cacheHotels = await client.get('hotels');

    if (cacheHotels) {
        let hotelsList = JSON.parse(cacheHotels);
        if (location) {
            hotelsList = hotelsList.filter(hotel => hotel.location.toLowerCase() === location.toLowerCase());
        }
        return res.json(hotelsList);
    }

    await client.set('hotels', JSON.stringify(hotels));
    res.json(hotels);
};
