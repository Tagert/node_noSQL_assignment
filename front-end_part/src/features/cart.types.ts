import { FlightType } from "./flight.types";

export type CartType = {
  date?: Date;
  userEmail: string;
  flightsCart: FlightType[];
  id?: string;
};
