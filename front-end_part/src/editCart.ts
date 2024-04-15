import { Cart } from "./features/carts/Cart";
import { CartType } from "./features/carts/cart.types";
import { FlightType } from "./features/flights/flight.types";
import { displayStatus } from "./utils/controllers/displayStatus";
import { popUpStatus, statusMessage } from "./utils/controllers/popUpStatus";
import { addCartButton, cartsContainer, userEmailInput } from "./utils/dom/htmlVariables";

const fetchCarts = async () => {
  try {
    const response = await fetch("http://localhost:3000/carts");
    const flights = await response.json();

    return flights.flightsCarts;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

const postCart = async (cartData: CartType) => {
  try {
    const response = await fetch("http://localhost:3000/carts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    displayStatus(true, "Cart successfully added.");
    setTimeout(() => {
      window.location.assign("./editCart.html");
    }, 1500);
  } catch (error) {
    console.error("Error:", error);
  }
};

const removeCart = async (cardId: string) => {
  try {
    const response = await fetch(`http://localhost:3000/carts/${cardId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    if (!response.ok) {
      throw new Error(`Failed to delete item. Status code: ${response.status}`);
    } else {
      console.log(`Cart with id ${cardId} has been deleted.`);

      popUpStatus("Cart has been successfully removed.");
      setTimeout(() => {
        if (statusMessage) {
          statusMessage.remove();
        }
        window.location.href = "./editCart.html";
      }, 1500);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const removeFlightFromCart = async (flightId: string, cardId: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/carts/${cardId}/flight/${flightId}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    if (!response.ok) {
      throw new Error(`Failed to delete item. Status code: ${response.status}`);
    } else {
      console.log(`Flight with id ${flightId} has been deleted.`);

      popUpStatus("Flight from cart has been successfully removed.");
      setTimeout(() => {
        if (statusMessage) {
          statusMessage.remove();
        }
        window.location.href = "./editCart.html";
      }, 1500);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const addCartForm = (): Cart => {
  const newCartData: CartType = {
    userEmail: userEmailInput.value,
    flightsCart: [],
  };

  const newCart = new Cart(newCartData);

  userEmailInput.value = "";

  return newCart;
};

const renderCartsToScreen = (carts: CartType[]) => {
  cartsContainer.innerHTML = "";

  carts.forEach((cart) => {
    const cartId: string = cart.id ?? "";

    const cartInfoContainer = document.createElement("div") as HTMLDivElement;
    cartInfoContainer.classList.add("cart-info");
    const userContainer = document.createElement("div") as HTMLDivElement;
    userContainer.classList.add("user-box");
    const userDescription = document.createElement("h3") as HTMLHeadingElement;
    userDescription.innerText = "User Cart:";
    const userEmail = document.createElement("h3") as HTMLHeadingElement;
    userEmail.innerText = cart.userEmail;

    const removeContainer = document.createElement("div") as HTMLDivElement;
    removeContainer.classList.add("remove-box");
    const removeCartButton = document.createElement("button") as HTMLButtonElement;
    removeCartButton.setAttribute("id", "remove-cart-btn");
    removeCartButton.innerText = "X";
    removeCartButton.addEventListener("click", async () => {
      await removeCart(cartId);
    });

    const cartCard = document.createElement("div") as HTMLDivElement;
    cartCard.classList.add("cart-card");

    const cartFlights: FlightType[] = Array.isArray(cart.flightsCart)
      ? cart.flightsCart
      : [cart.flightsCart];

    cartFlights.forEach((flight) => {
      const flightId: string = flight.id!;

      const flightCard = document.createElement("div") as HTMLDivElement;
      flightCard.classList.add("flight-card");

      const removeFlightButton = document.createElement("img") as HTMLImageElement;
      removeFlightButton.setAttribute("id", "remove-flight-btn");
      removeFlightButton.src = "../../assets/remove_recycle_icon.svg";

      const price = document.createElement("p") as HTMLParagraphElement;
      price.innerText = `Price: ${flight.price}€`;
      const departureCity = document.createElement("p") as HTMLParagraphElement;
      departureCity.innerText = `Departure City: ${flight.departureCity}`;
      const destinationCity = document.createElement("p") as HTMLParagraphElement;
      destinationCity.innerText = `Destination City: ${flight.destinationCity}`;
      const departureTime = document.createElement("p") as HTMLParagraphElement;
      departureTime.innerText = `Departure Time: ${flight.departureTime}`;

      const editButton = document.createElement("button") as HTMLButtonElement;
      editButton.setAttribute("id", "edit-btn");
      editButton.innerText = "Edit Flight";

      const navigateToDescriptionPage = (flightId: string) => {
        const flightPageUrl = `../edit_flight/editFlight.html?id=${flightId}`;
        window.location.href = flightPageUrl;
      };

      editButton.addEventListener("click", () => {
        localStorage.setItem("flightId", flightId);
        navigateToDescriptionPage(flightId);
      });

      removeFlightButton.addEventListener("click", () => {
        localStorage.setItem("flightId", flightId);
        removeFlightFromCart(flightId, cartId);
      });

      cartCard.append(flightCard);
      flightCard.append(
        removeFlightButton,
        departureCity,
        destinationCity,
        departureTime,
        price,
        editButton,
      );
    });

    cartsContainer.append(cartInfoContainer, cartCard);
    cartInfoContainer.append(userContainer, removeContainer);
    userContainer.append(userDescription, userEmail);
    removeContainer.append(removeCartButton);
  });
};

const initPage = async () => {
  const cartsData = await fetchCarts();
  console.log("Carts Data:", cartsData);
  renderCartsToScreen(cartsData);
};

addCartButton.addEventListener("click", async () => {
  const newCartData = addCartForm();
  await postCart(newCartData);
});

initPage();
