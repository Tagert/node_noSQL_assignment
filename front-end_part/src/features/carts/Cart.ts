import { CartType } from "./cart.types";
import { FlightType } from "../flights/flight.types";

export class Cart {
  date?: Date;
  userEmail: string;
  flightsCart: FlightType[];
  id?: string;

  constructor({ userEmail, flightsCart }: CartType) {
    this.userEmail = userEmail;
    this.flightsCart = flightsCart;
  }
}
