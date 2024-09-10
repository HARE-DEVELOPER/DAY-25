// Sample product data
const products = [
    { id: 1, name: 'Product 1', price: 29.99, imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 39.99, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', price: 49.99, imageUrl: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Product 4', price: 59.99, imageUrl: 'https://via.placeholder.com/150' }
];

// Cart storage
let cart = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCart();
});

// Display products
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear any existing content

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>$${product.price.toFixed(2)}</p>
            <button data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });

    // Add event listeners for Add to Cart buttons
    document.querySelectorAll('.product-item button').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add product to cart
function addToCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCart();
    }
}

// Update cart display
function updateCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = ''; // Clear existing cart content

    // Group cart items by product id
    const cartGrouped = cart.reduce((acc, item) => {
        acc[item.id] = (acc[item.id] || 0) + 1;
        return acc;
    }, {});

    Object.keys(cartGrouped).forEach(productId => {
        const product = products.find(p => p.id === parseInt(productId));
        const quantity = cartGrouped[productId];
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>$${product.price.toFixed(2)} x ${quantity}</p>
            <p>Total: $${(product.price * quantity).toFixed(2)}</p>
            <button data-id="${product.id}">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Add event listeners for Remove buttons
    document.querySelectorAll('.cart-item button').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });

    // Update cart summary
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-summary').innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

// Remove product from cart
function removeFromCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    cart = cart.filter(p => p.id !== productId);
    updateCart();
}
