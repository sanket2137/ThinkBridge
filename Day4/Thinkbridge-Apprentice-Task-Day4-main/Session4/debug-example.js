// ===============================
// Session 4 - Debugging Practice
// Real-time Example: Login Form
// ===============================

const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

loginBtn.addEventListener("click", () => {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  console.log("DEBUG → Username:", username, "Password:", password);

  //  BUG: using OR (||) instead of AND (&&)
  if (username === "admin" || password === "1234") {
    message.textContent = " Login successful!";
    message.style.color = "green";
  } else {
    message.textContent = " Invalid credentials!";
    message.style.color = "red";
  }
});
