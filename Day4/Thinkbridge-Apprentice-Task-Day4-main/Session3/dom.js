const btn = document.getElementById("btn");
const msg = document.getElementById("message");

btn.addEventListener("click", () => {
  msg.textContent = "Button was clicked!";
  msg.classList.toggle("highlight");
});
