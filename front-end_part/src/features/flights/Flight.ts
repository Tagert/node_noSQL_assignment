import { FlightType } from "./flight.types";

export class Flight {
  price: number | undefined;
  departureCity: string | undefined;
  destinationCity: string | undefined;
  destinationCityPhotoUrl: string | undefined;
  departureTime: string | undefined;
  id?: string;

  constructor({
    price,
    departureCity,
    destinationCity,
    destinationCityPhotoUrl,
    departureTime,
  }: FlightType) {
    this.price = price;
    this.departureCity = departureCity;
    this.destinationCity = destinationCity;
    this.destinationCityPhotoUrl = destinationCityPhotoUrl;
    this.departureTime = departureTime;
  }
}
