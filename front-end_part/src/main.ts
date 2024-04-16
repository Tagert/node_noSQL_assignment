import {
  addFlightButton,
  addFlightWrapper,
  linkFlightWrapper,
} from "./utils/dom/htmlVariables.ts";
import { FlightType } from "./features/flights/flight.types.ts";
import { renderFlightsToScreen } from "./utils/dom/renderToScreen.ts";
import { addFlightForm } from "./utils/controllers/addFlight.ts";
import { displayStatus } from "./utils/controllers/displayStatus.ts";
import { handleWrapperClick } from "./utils/controllers/addFlightWrapper.ts";

const fetchFlights = async () => {
  try {
    const jwtToken = localStorage.getItem("jwt");

    if (!jwtToken) {
      throw new Error("JWT token not found");
    }

    const response = await fetch("http://localhost:3000/flights", {
      method: "GET",
      headers: {
        Authorization: `${jwtToken}`,
        "Content-Type": "application/json",
      },
    });

    const flights = await response.json();

    return flights;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

const postFlight = async (flightData: FlightType) => {
  try {
    const jwtToken = localStorage.getItem("jwt");

    if (!jwtToken) {
      throw new Error("JWT token not found");
    }

    const response = await fetch("http://localhost:3000/flights", {
      method: "POST",
      headers: {
        Authorization: `${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flightData),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    displayStatus(true, "Flight successfully added.");
    setTimeout(() => {
      window.location.assign("../index.html");
    }, 1500);
  } catch (error) {
    console.error("Error:", error);
  }
};

const initPage = async () => {
  const flightsData = await fetchFlights();
  console.log("Flight Data:", flightsData.flights);
  renderFlightsToScreen(flightsData.flights);
};

initPage();

addFlightButton.addEventListener("click", async () => {
  const newFlightData = addFlightForm();
  await postFlight(newFlightData);
});

addFlightWrapper.addEventListener("click", handleWrapperClick);
linkFlightWrapper.addEventListener("click", handleWrapperClick);
