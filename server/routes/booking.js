const express = require('express')
const router = express.Router()
const Booking = require('../models/Booking')
const {BadRequest} = require('../errors');
const { StatusCodes } = require('http-status-codes');

const monthMap = {
    'January': '01',
    'February': '02',
    'March': '03',
    'April': '04',
    'May': '05',
    'June': '06',
    'July': '07',
    'August': '08',
    'September': '09',
    'October': '10',
    'November': '11',
    'December': '12',
};

router.get('/', async (req, res) => {
    const { date } = req.query
    if(!date){
        throw new BadRequest("Provide date!!")
    }
    const dates = date.split(",")
    const startDate = new Date(dates[0])
    const endDate = new Date(dates[1])
    if(!startDate || !endDate || startDate > endDate){
        throw new BadRequest("Please provide correct dates or startDate is greater!!")
    }

    let bookings = await Booking.find({})
    bookings = bookings.filter(record => {
        const recordDate = new Date(`${record.arrival_date_year.toString()}-${monthMap[record.arrival_date_month]}-${record.arrival_date_day_of_month.toString()}`)
        return recordDate >= startDate && recordDate <= endDate
    })

    res.status(StatusCodes.OK).json({error: false, data: {count: bookings.length, bookings}})

})

module.exports = router