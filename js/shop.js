document.getElementById("search").addEventListener("input", function(event) {
  const searchTerm = event.target.value.toLowerCase();
  searchProducts(searchTerm);
});

let products = [];

fetch("https://dummyjson.com/products")
  .then(response => response.json())
  .then(data => {
    products = data.products; 
    displayProducts(products); 
  })
  .catch(error => console.error("Error fetching products:", error));

function displayProducts(productList) {
  const productListElement = document.getElementById("product-list");
  productListElement.innerHTML = ""; 

  productList.forEach(product => {
    const productCard = `
      <div class="product-card">
        <img src="${product.images[0]}" alt="${product.title}" class="product-image">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>`;
    productListElement.innerHTML += productCard; 
  });
}

function searchProducts(searchTerm) {
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm) 
  );
  displayProducts(filteredProducts); 
}

document.getElementById("cart-btn").addEventListener("click", function() {
  window.location.href = "cart.html"; 
});

function addToCart(productId) {
  const product = products.find(product => product.id === productId);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.title} has been added to your cart!`);
}
