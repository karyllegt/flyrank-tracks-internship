const form = document.querySelector("#settings-form");
const displayName = document.querySelector("#display-name");
const email = document.querySelector("#email");
const displayNameError = document.querySelector("#display-name-error");
const emailError = document.querySelector("#email-error");
const message = document.querySelector("#message");

function setError(input, output, text) {
  input.setAttribute("aria-invalid", String(Boolean(text)));
  output.textContent = text;
}

function validate() {
  let valid = true;
  const nameError = displayName.value.trim() ? "" : "Enter a display name.";
  const emailErrorText = email.validity.valid ? "" : "Enter a valid email address.";

  setError(displayName, displayNameError, nameError);
  setError(email, emailError, emailErrorText);
  valid = !nameError && !emailErrorText;
  return valid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  message.textContent = "";

  if (!validate()) {
    message.textContent = "Please correct the highlighted fields.";
    return;
  }

  message.textContent = "Settings saved.";
});
