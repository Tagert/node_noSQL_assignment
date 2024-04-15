import { User } from "./features/users/User";
import { UserType } from "./features/users/user.types";

const signUpSwitchButton = document.getElementById("signUp") as HTMLButtonElement;
const signInSwitchButton = document.getElementById("signIn") as HTMLButtonElement;
const logInButton = document.getElementById("loginBtn") as HTMLButtonElement;
const container = document.querySelector(".account-manager-container") as HTMLDivElement;
const emailInput = document.getElementById("emailInput") as HTMLInputElement;
const passwordInput = document.getElementById("passwordInput") as HTMLInputElement;

const userLogin = async (userData: UserType) => {
  try {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const responseData = await response.json();

    // displayStatus(true, "Flight successfully added.");
    setTimeout(() => {
      window.location.assign("../../index.html");
    }, 1500);

    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};

const loginForm = (): User => {
  const checkUserData: UserType = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  const loggingInUser = new User(checkUserData);

  emailInput.value = "";
  passwordInput.value = "";

  return loggingInUser;
};

logInButton.addEventListener("click", async () => {
  const userData = loginForm();
  console.log(userData);
  const userLogged = await userLogin(userData);
  localStorage.setItem("jwt", userLogged.jwt);
});

signUpSwitchButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInSwitchButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});
