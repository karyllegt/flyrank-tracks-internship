const form = document.querySelector("#settings-form");
const message = document.querySelector("#message");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  message.textContent = "Settings saved.";
});
