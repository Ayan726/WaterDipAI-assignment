const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    hotel: {
        type: String,
    },
    arrival_date_year: {
        type: Number,
    },
    arrival_date_month: {
        type: String,
    },
    arrival_date_day_of_month: {
        type: Number,
    },
    adults: {
        type: Number,
    },
    children: {
        type: Number
    },
    babies: {
        type: Number
    },
    country: {
        type: String
    }
})

module.exports = mongoose.model('Booking', BookingSchema)