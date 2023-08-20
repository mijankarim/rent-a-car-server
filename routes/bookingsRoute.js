import express from 'express';
const router = express.Router();

import {
    bookCar,
    getAllBookings
} from '../controllers/bookingController.js';


router.route("/bookcar").post(bookCar);
router.route("/getallbookings").get(getAllBookings);

export default router;