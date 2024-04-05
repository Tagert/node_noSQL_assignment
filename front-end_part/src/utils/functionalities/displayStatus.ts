import { statusDiv } from "../variables/htmlVariables";

export const displayStatus = (isOk: boolean, text: string) => {
  const statusText = document.createElement("h3");
  statusDiv.innerHTML = "";

  statusDiv.style.color = isOk ? "green" : "red";
  statusText.innerHTML = text;
  statusDiv.append(statusText);
};
