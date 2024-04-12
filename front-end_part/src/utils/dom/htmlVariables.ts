export const flightsContainer = document.querySelector(
  ".flights-container",
) as HTMLDivElement;
export const cartsContainer = document.querySelector(
  ".carts-container",
) as HTMLDivElement;
export const formContainer = document.querySelector(".form-container") as HTMLDivElement;
export const addFlightWrapper = document.getElementById(
  "addFlightWrapper",
) as HTMLImageElement;
export const linkFlightWrapper = document.getElementById(
  "linkFlightWrapper",
) as HTMLAnchorElement;
export const addFlightButton = document.getElementById(
  "add-flight-btn",
) as HTMLButtonElement;
export const addCartButton = document.getElementById("add-cart-btn") as HTMLButtonElement;
export const editFlightButton = document.getElementById(
  "edit-flight-btn",
) as HTMLButtonElement;
export const priceInput = document.getElementById("price") as HTMLInputElement;
export const departureCityInput = document.getElementById(
  "departureCity",
) as HTMLInputElement;
export const destinationCityInput = document.getElementById(
  "destinationCity",
) as HTMLInputElement;
export const destinationCityPhotoUrlInput = document.getElementById(
  "destinationCityPhotoUrl",
) as HTMLInputElement;
export const departureTimeInput = document.getElementById(
  "departureTime",
) as HTMLInputElement;
export const userEmailInput = document.getElementById("userEmail") as HTMLInputElement;
export const statusDiv = document.getElementById("statusMessages") as HTMLDivElement;
export const cartEmails = document.getElementById("cart-emails") as HTMLSelectElement;
export const selectContainer = document.querySelector(
  ".select-cart-container",
) as HTMLDivElement;
export const selectElement = document.getElementById("cart-emails") as HTMLSelectElement;
export const flightId = localStorage.getItem("flightId") as string;
