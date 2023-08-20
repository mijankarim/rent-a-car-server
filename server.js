import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import fileupload from 'express-fileupload'

import carsRoutes from './routes/carsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import bookingsRoute from './routes/bookingsRoute.js';

dotenv.config();
const port = 5000;

const app = express()
    if (process.env.NODE_ENV === 'development') {
     app.use(morgan('dev'))
}
app.use(cors());
app.use(fileupload({useTempFiles: true}))
app.use(cookieParser())
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/car-booking')    
    .then(() => console.log("Connected to MongoDB successfully")) 
    .catch(err => console.log(err));
   
app.get('/', (req, res) => {
      res.send('API is running...')
    })

app.use('/api/cars/', carsRoutes);
app.use('/booking/api/cars/', carsRoutes);
app.use('/editcar/api/cars/', carsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/bookings/', bookingsRoute);
   


app.listen(port, () => console.log(`App listening on port ${port}!`));
