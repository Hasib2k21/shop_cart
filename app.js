

const products = [
    { id: 1, name: 'Laptop 1', price: 1000, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Laptop 2', price: 1500, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'PC 1', price: 1200, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'PC 2', price: 1300, image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Laptop 3', price: 1100, image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'PC 3', price: 1250, image: 'https://via.placeholder.com/150' },
    { id: 7, name: 'Laptop 4', price: 1600, image: 'https://via.placeholder.com/150' },
    { id: 8, name: 'PC 4', price: 1350, image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Laptop 5', price: 1700, image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Laptop 5', price: 1700, image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Laptop 5', price: 1700, image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Laptop 5', price: 1700, image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Laptop 5', price: 1700, image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Laptop 5', price: 1700, image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Laptop 5', price: 1700, image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Laptop 5', price: 1700, image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Laptop 5', price: 1700, image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Laptop 5', price: 1700, image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Laptop 5', price: 1700, image: 'https://via.placeholder.com/150' },
    { id: 10, name: 'PC 5', price: 1400, image: 'https://via.placeholder.com/150' }
];

let cart = [];

// Display Products
function displayProducts() {
    let productGrid = $('#productGrid');
    products.forEach(product => {
        productGrid.append(`
            <div class="col-md-6 mb-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Price: $${product.price}</p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        `);
    });
}

// Add Product to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Update Cart
function updateCart() {
    let cartTable = $('#cartTable');
    cartTable.empty();

    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        cartTable.append(`
            <tr>
                <td><img src="${item.image}" alt="${item.name}"> ${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${itemTotal}</td>
            </tr>
        `);
    });

    $('#totalPrice').text(`$${totalPrice}`);
}

// Initialize
$(document).ready(function() {
    displayProducts();
});

