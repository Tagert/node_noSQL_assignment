import express from "express";

import {
  ADD_FLIGHT,
  ADD_FLIGHT_TO_CART,
  GET_ALL_FLIGHTS,
  GET_FLIGHT_BY_ID,
  DELETE_FLIGHT_BY_ID,
  UPDATE_FLIGHT_BY_ID,
  PAGINATED_FLIGHTS,
  APP_STATUS,
} from "../controllers/flights.js";
import { validateData } from "../middlewares/validation.js";
import { flightSchema } from "../validationSchema/flights.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/flights", validateData(flightSchema), auth, ADD_FLIGHT);

router.post("/flights/cart/:id", ADD_FLIGHT_TO_CART);

router.get("/flights", auth, GET_ALL_FLIGHTS);

router.get("/flights/:id", GET_FLIGHT_BY_ID);

router.delete("/flights/:id", DELETE_FLIGHT_BY_ID);

router.put("/flights/:id", UPDATE_FLIGHT_BY_ID);

router.get("/flights/page/:pageNumber", auth, PAGINATED_FLIGHTS);

router.get("/status", APP_STATUS);

export default router;
