
var products = [
    { id: 1, name: 'Laptop 1', price: 1000, image: 'https://www.startech.com.bd/image/cache/catalog/laptop/lenovo/ideapad-gaming-3/ideapad-gaming-3-001-200x200.jpg' },
    { id: 2, name: 'Laptop 2', price: 1500, image: 'https://www.startech.com.bd/image/cache/catalog/laptop/lenovo/ideapad-gaming-3/ideapad-gaming-3-001-200x200.jpg' },
    { id: 3, name: 'PC 1', price: 1200, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'PC 2', price: 1300, image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Laptop 3', price: 1100, image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'PC 3', price: 1250, image: 'https://via.placeholder.com/150' },
    { id: 7, name: 'Laptop 4', price: 1600, image: 'https://via.placeholder.com/150' },
    { id: 8, name: 'PC 4', price: 1350, image: 'https://via.placeholder.com/150' },
    { id: 9, name: 'Laptop 5', price: 1700, image: 'https://via.placeholder.com/150' },
    { id: 10, name: 'PC 5', price: 1400, image: 'https://via.placeholder.com/150' }
];

var cart = [];

document.getElementById('product_form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let name = document.getElementById('product_name').value;
    let price = parseFloat(document.getElementById('product_price').value);
    let image = document.getElementById('product_image').value;
    
    if (name && price && image) {
        let newProduct = { id: products.length + 1, name, price, image };
        products.push(newProduct);
        
        render_product_list();
        
        // Clear form fields
        document.getElementById('product_name').value = '';
        document.getElementById('product_price').value = '';
        document.getElementById('product_image').value = '';
    }
});

function render_product_list() {
    let product_container = document.getElementById('product_list');
    if (product_container) {
        product_container.innerHTML = ''; // Clear previous list
        for (let index = 0; index < products.length; index++) {
            let item = products[index];
            product_container.insertAdjacentHTML('beforeend', `
                <div class="col-6">
                    <div class="card mb-4">
                        <div class="card-body">
                            <img class="w-100" src="${item.image}" alt="">
                        </div>
                        <div class="card-footer text-center">
                            <h5>${item.name}</h5>
                            <h6>$${item.price}</h6>
                            <button class="btn btn-sm btn-primary" onclick="addToCart(${item.id})">
                            Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            `);
        }
    }
}

function addToCart(productId) {
    let product = products.find(p => p.id === productId);
    let cartItem = cart.find(c => c.id === productId);

    if (cartItem) {
        cartItem.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    renderCart();
}

function renderCart() {
    let cartBody = document.getElementById('cart_body');
    let cartTotal = 0;

    if (cartBody) {
        cartBody.innerHTML = '';

        cart.forEach(item => {
            let total = item.qty * item.price;
            cartTotal += total;

            cartBody.insertAdjacentHTML('beforeend', `
                <tr>
                    <td>
                        <img src="${item.image}" style="width:40px;" alt=""> ${item.name}
                    </td>
                    <td>
                        $${item.price} x <input type="number" min="1" value="${item.qty}" onchange="updateQty(${item.id}, this.value)">
                    </td>
                    <td>$${total}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">Delete</button>
                    </td>
                </tr>
            `);
        });

        document.getElementById('cart_total').innerText = `$${cartTotal}`;
    }
}

function updateQty(productId, newQty) {
    let cartItem = cart.find(c => c.id === productId);
    if (cartItem) {
        cartItem.qty = parseInt(newQty);
        renderCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(c => c.id !== productId);
    renderCart();
}

render_product_list();
