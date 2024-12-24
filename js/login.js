document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);
  
    if (user) {
      localStorage.setItem("token", JSON.stringify({ email }));
      alert("Login successful!");
      window.location.href = "shop.html";
    } else {
      alert("Invalid credentials");
    }
  });
  