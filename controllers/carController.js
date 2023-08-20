import  Car from "../models/carModel.js";

const getAllcars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.send(cars);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.send(car);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const addCar = async (req, res) => {
  try {
    const newcar = new Car(req.body);
    await newcar.save();
    res.send("Car added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
};

const editCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id );
    car.name = req.body.name;
    car.image = req.body.image;
    car.fuelType = req.body.fuelType;
    car.rentPerHour = req.body.rentPerHour;
    car.capacity = req.body.capacity;
    car.seats = req.body.seats;
    car.transmission = req.body.transmission;

    await car.save();

    res.send("Car details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
};


const deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndRemove({ _id: req.params.id }); 
    res.send("Car deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
};

export {addCar, getAllcars, getCarById, editCar, deleteCar}; 