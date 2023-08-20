import express from 'express';
import {
    getAllcars,
    getCarById,
    addCar,
    editCar,
    deleteCar
} from '../controllers/carController.js';

const router = express.Router();

router.route("/getallcars").get(getAllcars);
router.route("/:id").get(getCarById);
router.route("/addcar").post(addCar);
router.route("/updatecar/:id").put(editCar);
router.route("/deletecar/:id").delete(deleteCar); 

export default router; 