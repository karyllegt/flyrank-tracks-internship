const status = document.querySelector("#status");
const button = document.querySelector("#check-button");

button.addEventListener("click", () => {
  status.textContent = "Workspace check complete: the frontend starter is responding.";
});
