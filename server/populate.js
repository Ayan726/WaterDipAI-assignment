require('dotenv').config()
const connectDB = require('./db/connect')
const bookings = require('./bookings.json')
const Booking = require('./models/Booking')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Booking.deleteMany()
        await Booking.create(bookings)
        console.log('Success!!!!')
        process.exit(0)
      } catch (error) {
        console.log(error)
        process.exit(1)
      }
}

start()
