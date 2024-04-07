import express from "express";

import {
  ADD_CART,
  ADD_FLIGHT_ID_TO_CART,
  GET_ALL_CARTS,
  GET_CART_BY_ID,
  DELETE_CART_BY_ID,
  DELETE_FLIGHT_FROM_CARD_BY_ID,
} from "../controllers/flightsCart.js";

const router = express.Router();

router.post("/carts", ADD_CART);

router.put("/carts/:id", ADD_FLIGHT_ID_TO_CART);

router.get("/carts", GET_ALL_CARTS);

router.get("/carts/:id", GET_CART_BY_ID);

router.delete("/carts/:id", DELETE_CART_BY_ID);

router.delete("/carts/:cartId/flight/:flightId", DELETE_FLIGHT_FROM_CARD_BY_ID);

export default router;
