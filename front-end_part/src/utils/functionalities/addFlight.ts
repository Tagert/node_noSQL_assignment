import { FlightType } from "../../features/flights/flight.types";
import {
  priceInput,
  departureCityInput,
  destinationCityInput,
  destinationCityPhotoUrlInput,
  departureTimeInput,
} from "../variables/htmlVariables";
import { Flight } from "../../features/flights/Flight";

export const addFlightForm = (): Flight => {
  const newFlightData: FlightType = {
    price: Number(priceInput.value),
    departureCity: departureCityInput.value,
    destinationCity: destinationCityInput.value,
    destinationCityPhotoUrl: destinationCityPhotoUrlInput.value,
    departureTime: departureTimeInput.value,
  };

  const newFlight = new Flight(newFlightData);

  priceInput.value = "";
  departureCityInput.value = "";
  destinationCityInput.value = "";
  destinationCityPhotoUrlInput.value = "";
  departureTimeInput.value = "";

  return newFlight;
};
