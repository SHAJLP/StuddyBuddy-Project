// sign up form handler
const signupFormHandler = async (event) => {
  //prevent default
  event.preventDefault();
  //get username, password
  const usernameEl = document.querySelector("#username-input-signup");
  const passwordEl = document.querySelector("#password-input-signup");
  //post to api/users
  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    //redirect to dashboard
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
