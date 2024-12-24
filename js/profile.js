document.addEventListener("DOMContentLoaded", function () {
    const userToken = JSON.parse(localStorage.getItem("token"));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === userToken?.email);
  
    if (!user) {
      alert("You must be logged in to access your profile.");
      window.location.href = "login.html";
      return;
    }
  
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
  
    document.getElementById("profileForm").addEventListener("submit", function (e) {
      e.preventDefault();
  
      const updatedName = document.getElementById("name").value.trim();
      const updatedEmail = document.getElementById("email").value.trim();
  
      if (!updatedName || !updatedEmail) {
        alert("Please fill out all fields.");
        return;
      }
  
      const updatedUsers = users.map(u =>
        u.email === user.email ? { ...u, name: updatedName, email: updatedEmail } : u
      );
  
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("token", JSON.stringify({ email: updatedEmail }));
  
      alert("Profile updated successfully!");
      window.location.reload();
    });
  });
  