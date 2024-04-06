export let statusMessage: HTMLElement | null;

export const popUpStatus = () => {
  const statusMessage = document.createElement("div");
  statusMessage.classList.add("status-message");
  statusMessage.textContent = "Cart has been successfully removed.";
  statusMessage.setAttribute(
    "style",
    `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    border: 0.1rem solid black;
    border-bottom-left-radius: 0.6rem;
    border-bottom-right-radius: 0.6rem;
    text-align: center;
    font-size: 1.1rem;
    font-weight: bold;
    color: green;
    padding: 1rem;
  `,
  );
  document.body.append(statusMessage);
};
