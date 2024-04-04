import { addFlightButton } from "./utils/variables/htmlVariables.ts";
import { FlightType } from "./features/flight.types.ts";
import { renderFlightsToScreen } from "./utils/dom/renderToScreen.ts";
// import { Flight } from "./features/Flight.ts";
import { addFlightForm } from "./utils/functionalities/addFlight.ts";

const fetchFlights = async () => {
  try {
    const response = await fetch("http://localhost:3000/flights");
    const flights = await response.json();

    return flights;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

const initPage = async () => {
  const flightsData = await fetchFlights();
  console.log("Flight Data:", flightsData.flights);
  renderFlightsToScreen(flightsData.flights);
};

const postFlight = async (flightData: FlightType) => {
  try {
    const response = await fetch("http://localhost:3000/flights", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flightData),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // displayStatus(true, "Item successfully added.");
    setTimeout(() => {
      window.location.assign("../index.html");
    }, 1500);
  } catch (error) {
    console.error("Error:", error);
  }
};

initPage();

addFlightButton.addEventListener("click", async () => {
  const newFlightData = addFlightForm();
  await postFlight(newFlightData);
});
