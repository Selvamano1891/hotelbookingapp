const express = require('express');
const { bookRoom, getUserBookings, modifyBooking, cancelBooking } = require('../controllers/bookingController');
const router = express.Router();

router.post('/', bookRoom);
router.get('/:user', getUserBookings);
router.put('/modify/:bookingId', modifyBooking);
router.delete('/cancel/:bookingId', cancelBooking);

module.exports = router;
