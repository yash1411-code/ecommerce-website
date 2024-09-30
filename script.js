const apiURL = 'https://fakestoreapi.com/products';
let cart = [];
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

function fetchProducts() {
    fetch(apiURL)
        .then(response => response.json())
        .then(products => displayProducts(products))
        .catch(error => console.error('Error fetching products:', error));
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.title}', '${product.image}', ${product.price})">Add to Cart</button>
        `;
        productsContainer.appendChild(productCard);
    });
}

function addToCart(id, title, image, price) {
    const cartItems = document.getElementById('cart-items');
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `
        <img src="${image}" alt="${title}" style="width: 50px; height: 50px; vertical-align: middle;">
        ${title} - $${price.toFixed(2)}
    `;
    cartItems.appendChild(cartItem);

    cart.push({ id, title, price });
    totalPrice += price;
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}
