// Helper functions for localStorage
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  
  // Redirect if user is already logged in
  document.addEventListener("DOMContentLoaded", () => {
    const token = getFromLocalStorage("authToken");
    if (token) {
      window.location.href = "shop.html"; // Redirect to shop if logged in
    }
  });
  
  // Signup functionality
  function signupUser(event) {
    event.preventDefault();
  
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
  
    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }
  
    const users = getFromLocalStorage("users") || [];
    const userExists = users.find(user => user.email === email);
  
    if (userExists) {
      alert("User already exists. Please log in.");
      window.location.href = "login.html";
      return;
    }
  
    users.push({ name, email, password });
    saveToLocalStorage("users", users);
  
    alert("Signup successful! Please log in.");
    window.location.href = "login.html";
  }
  
  // Login functionality
  function loginUser(event) {
    event.preventDefault();
  
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
  
    if (!email || !password) {
      alert("Both email and password are required!");
      return;
    }
  
    const users = getFromLocalStorage("users") || [];
    const user = users.find(user => user.email === email && user.password === password);
  
    if (!user) {
      alert("Invalid email or password!");
      return;
    }
  
    // Generate a simple auth token
    const authToken = `${user.email}-${Date.now()}`;
    saveToLocalStorage("authToken", authToken);
    saveToLocalStorage("currentUser", user);
  
    alert("Login successful!");
    window.location.href = "shop.html";
  }
  
  // Logout functionality
  function logoutUser() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    alert("Logged out successfully!");
    window.location.href = "index.html";
  }
  
  // Event Listeners for forms
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  
  if (signupForm) {
    signupForm.addEventListener("submit", signupUser);
  }
  
  if (loginForm) {
    loginForm.addEventListener("submit", loginUser);
  }
  