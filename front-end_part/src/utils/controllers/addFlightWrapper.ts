import { addFlightWrapper, formContainer } from "../dom/htmlVariables";

export const handleWrapperClick = () => {
  formContainer.classList.toggle("form-container-active");

  const currentIconSrc = addFlightWrapper.getAttribute("src");
  const upIconPath = "../../../assets/up_arrow_icon.svg";
  const downIconPath = "../../../assets/down_arrow_icon.svg";

  const newIconSrc = currentIconSrc === upIconPath ? downIconPath : upIconPath;

  addFlightWrapper.setAttribute("src", newIconSrc);
};
