import { v4 as uuidv4 } from 'uuid';

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Ih6rcKIKnko8QH9hwDLAYFCedrxTP3157HzQ44l0PlVG10allO0TM4kP1m0T683LyNKGR3ClHR7aGEIHn374Pxj00DR1B9IZO');

import  Booking from "../models/bookingModel.js";
import  Car from "../models/carModel.js";


const bookCar = async (req, res) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "GBP",
        customer: customer.id,
        receipt_email: token.email,
        description: "Car Booking",
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const car = await Car.findOne({ _id: req.body.car });
      console.log(req.body.car);
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await car.save();
      res.send("Your booking is successfull");
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('car').populate('user');
    res.send(bookings);
    console.log(bookings)
  } catch (error) {
    return res.status(400).json(error);
  }
};

export{ bookCar, getAllBookings} 