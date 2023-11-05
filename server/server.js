require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');

// routes
const bookingRouter = require('./routes/booking')
// error handler
const notFoundMiddleware = require('./middlewares/notFound');
const errorHandlerMiddleware = require('./middlewares/errorHandler');

app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173"
}));




// routes

app.get('/', (req, res) => {
  res.send('Hi');
});

app.use('/api/v1/bookings', bookingRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port http://localhost:${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();