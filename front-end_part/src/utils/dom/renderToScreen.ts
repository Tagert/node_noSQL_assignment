import { flightsContainer } from "../variables/htmlVariables";
import { FlightType } from "../../features/flight.types";

export const renderFlightsToScreen = (flights: FlightType[]) => {
  flightsContainer.innerHTML = "";

  console.log(flights);

  flights.forEach((flight) => {
    const flightId: string = flight.id!;

    const flightCard = document.createElement("div") as HTMLDivElement;
    flightCard.classList.add("flight-card");

    const imageBox = document.createElement("div") as HTMLDivElement;
    imageBox.classList.add("image-box");
    const image = document.createElement("img") as HTMLImageElement;
    if (flight.destinationCityPhotoUrl) {
      image.src = flight.destinationCityPhotoUrl;
    } else {
      image.src =
        "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg";
    }

    const price = document.createElement("p") as HTMLParagraphElement;
    price.innerText = `Price: ${flight.price}€`;
    const departureCity = document.createElement("p") as HTMLParagraphElement;
    departureCity.innerText = `Departure City: ${flight.departureCity}`;
    const destinationCity = document.createElement("p") as HTMLParagraphElement;
    destinationCity.innerText = `Destination City: ${flight.destinationCity}`;
    const departureTime = document.createElement("p") as HTMLParagraphElement;
    departureTime.innerText = `Departure Time: ${flight.departureTime}`;

    const editButton = document.createElement("button");
    editButton.setAttribute("id", "edit-btn");
    editButton.innerText = "Edit Flight";

    flightsContainer.append(flightCard);
    flightCard.append(
      imageBox,
      departureCity,
      destinationCity,
      departureTime,
      price,
      editButton,
    );
    imageBox.append(image);

    const navigateToDescriptionPage = (flightId: string) => {
      const flightPageUrl = `./editFlight.html?id=${flightId}`;
      window.location.href = flightPageUrl;
    };

    flightCard.addEventListener("click", (event: MouseEvent) => {
      const clickedButton = (event.target as HTMLElement).closest("#edit-btn");
      const clickedImage = (event.target as HTMLElement).closest(".image-box");

      if (clickedButton) {
        localStorage.setItem("flightId", flightId);
        navigateToDescriptionPage(flightId);
      } else if (clickedImage) {
        localStorage.setItem("flightId", flightId);
        navigateToDescriptionPage(flightId);
      }
    });
  });
};
