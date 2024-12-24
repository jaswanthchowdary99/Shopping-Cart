document.addEventListener("DOMContentLoaded", function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartList = document.getElementById("cart-list");
  const totalPriceElem = document.getElementById("total-price");

  if (cart.length === 0) {
    cartList.innerHTML = `<p class="empty">Your cart is empty.</p>`;
    totalPriceElem.textContent = "$0";
    return;
  }

  let totalPrice = 0;
  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    totalPrice += item.price;
    const cartItem = `
      <div class="cart-item">
        <img src="${item.images[0]}" alt="${item.title}" class="cart-item-image">
        <div class="cart-item-details">
          <h4>${item.title}</h4>
          <p>Price: $${item.price}</p>
        </div>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>`;
    cartList.innerHTML += cartItem;
  });

  totalPriceElem.textContent = `$${totalPrice.toFixed(2)}`;
});

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); 
  localStorage.setItem("cart", JSON.stringify(cart)); 
  window.location.reload(); 
}

document.getElementById("checkout-btn").addEventListener("click", function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items to your cart before proceeding.");
    return;
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const razorpayKeyId = "your_razorpay_key_id"; 

  const options = {
    key: razorpayKeyId,  
    amount: totalPrice * 100, 
    currency: "INR",  
    name: "Your Shop Name",
    description: "Payment for your shopping cart",
    image: "https://yourdomain.com/your-logo.png", 
    handler: function (response) {
      console.log(response);
      alert("Payment Successful!");
      localStorage.removeItem("cart");
      window.location.href = "thank-you.html"; 
    },
    prefill: {
      name: "Customer Name",  
      email: "customer@example.com",
      contact: "1234567890",
    },
    notes: {
      address: "Customer Address",  
    },
    theme: {
      color: "#F37254",  
    },
  };

  const razorpay = new Razorpay(options);
  razorpay.open(); 
});
