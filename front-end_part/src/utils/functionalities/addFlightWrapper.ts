import { addFlightWrapper, formContainer } from "../variables/htmlVariables";

export const handleWrapperClick = () => {
  formContainer.classList.toggle("form-container-active");

  const currentIconSrc = addFlightWrapper.getAttribute("src");
  const plusIconPath = "../page/assets/up_arrow_icon.svg";
  const minusIconPath = "../page/assets/down_arrow_icon.svg";

  const newIconSrc = currentIconSrc === plusIconPath ? minusIconPath : plusIconPath;

  addFlightWrapper.setAttribute("src", newIconSrc);
};
