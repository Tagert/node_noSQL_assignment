import {
  flightId,
  priceInput,
  departureCityInput,
  destinationCityInput,
  destinationCityPhotoUrlInput,
  departureTimeInput,
  editFlightButton,
  statusDiv,
  cartEmails,
  selectContainer,
} from "./utils/variables/htmlVariables.ts";
import { flightsContainer } from "./utils/variables/htmlVariables.ts";
import { FlightType } from "./features/flight.types.ts";
import { Flight } from "./features/Flight.ts";
import { CartType } from "./features/cart.types.ts";

const selectedIdFetch = async () => {
  try {
    const response = await fetch(`http://localhost:3000/flights/${flightId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status code: ${response.status}`);
    }

    const flight = await response.json();

    return flight;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const initPage = async () => {
  const flightsData = await selectedIdFetch();
  console.log("Flight Data:", flightsData);
  renderFlightToScreen(flightsData);

  const cartsData = await cartsEmailFetch();
  console.log("Carts Data:", cartsData);
  renderCartsToScreen(cartsData);
};

const renderFlightToScreen = (flight: FlightType) => {
  flightsContainer.innerHTML = "";

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

  const removeButton = document.createElement("button");
  removeButton.setAttribute("id", "remove-flight-btn");
  removeButton.innerText = "Remove a Flight";
  removeButton.addEventListener("click", async () => {
    await removeFlight();
  });

  flightsContainer.append(flightCard);
  flightCard.append(
    imageBox,
    departureCity,
    destinationCity,
    departureTime,
    price,
    removeButton,
  );
  imageBox.append(image);
};

const displayStatus = (isOk: boolean, text: string) => {
  const statusText = document.createElement("h1");
  statusDiv.innerHTML = "";

  statusDiv.style.color = isOk ? "green" : "red";
  statusText.innerHTML = text;
  statusDiv.append(statusText);
};

const putFlight = async (flightData: FlightType) => {
  try {
    const response = await fetch(`http://localhost:3000/flights/${flightId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flightData),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    displayStatus(true, "Item successfully edited.");
    setTimeout(() => {
      window.location.assign("../editFlight.html");
    }, 8000);
  } catch (error) {
    console.error("Error:", error);
  }
};

const editFlightForm = (): Flight => {
  const editedFlightData: FlightType = {
    price: priceInput.value.trim() !== "" ? Number(priceInput.value) : undefined,
    departureCity:
      departureCityInput.value.trim() !== "" ? departureCityInput.value : undefined,
    destinationCity:
      destinationCityInput.value.trim() !== "" ? destinationCityInput.value : undefined,
    destinationCityPhotoUrl:
      destinationCityPhotoUrlInput.value.trim() !== ""
        ? destinationCityPhotoUrlInput.value
        : undefined,
    departureTime:
      departureTimeInput.value.trim() !== "" ? departureTimeInput.value : undefined,
  };

  if (editedFlightData.price !== undefined) {
    priceInput.value = "";
  }
  if (editedFlightData.departureCity !== undefined) {
    departureCityInput.value = "";
  }
  if (editedFlightData.destinationCity !== undefined) {
    destinationCityInput.value = "";
  }
  if (editedFlightData.destinationCityPhotoUrl !== undefined) {
    destinationCityPhotoUrlInput.value = "";
  }
  if (editedFlightData.departureTime !== undefined) {
    departureTimeInput.value = "";
  }

  const editedFlight = new Flight(editedFlightData);

  priceInput.value = "";
  departureCityInput.value = "";
  destinationCityInput.value = "";
  destinationCityPhotoUrlInput.value = "";
  departureTimeInput.value = "";

  return editedFlight;
};

const removeFlight = async () => {
  try {
    const response = await fetch(`http://localhost:3000/flights/${flightId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    if (!response.ok) {
      throw new Error(`Failed to delete item. Status code: ${response.status}`);
    } else {
      displayStatus(response.ok, "Item has been successfully removed.");
      console.log(`Item with id ${flightId} has been deleted.`);
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1500);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const cartsEmailFetch = async () => {
  try {
    const response = await fetch("http://localhost:3000/carts");
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status code: ${response.status}`);
    }

    const carts = await response.json();

    return carts.flightsCarts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const renderCartsToScreen = (carts: CartType[]) => {
  const addToCartButton = document.createElement("button");
  addToCartButton.setAttribute("id", "add-to-cart-btn");
  addToCartButton.innerText = "Add a Flight to Cart";
  selectContainer.append(addToCartButton);

  carts.forEach((cart) => {
    const option = document.createElement("option");
    option.setAttribute("value", cart.userEmail);
    option.innerText = cart.userEmail;
    cartEmails.append(option);
  });
};

editFlightButton.addEventListener("click", async () => {
  const editedFlightData = editFlightForm();
  await putFlight(editedFlightData);
});

initPage();