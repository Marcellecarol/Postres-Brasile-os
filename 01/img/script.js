let search = document.querySelector('.search-box');
document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
}

let header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0)
});

let cart = []; 

function addToCart(productId) {
    const productElement = document.querySelector(`.box[data-id="${productId}"]`);
    const productName = productElement.dataset.name;
    const productPrice = parseFloat(productElement.dataset.price);
    const productImgUrl = productElement.querySelector('img').src;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        const newItem = {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1,
            imgUrl: productImgUrl,
        };
        cart.push(newItem);
    }

    updateCartUI();
}

function incrementQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        updateCartUI();
    }
}

function decrementQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCartUI();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartSubtotalElement = document.getElementById('cart-subtotal');
    let subtotal = 0;

    cartItemsElement.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.imgUrl}" alt="${item.name}">
            <span>${item.name}</span>
            <div class="cart-item-details">
                <div>
                    <button onclick="decrementQuantity(${item.id})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button onclick="incrementQuantity(${item.id})">+</button>
                </div>
                <div>
                    <span>Price per item:</span>
                    <span>${item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                </div>
                <div>
                    <span>Total:</span>
                    <span>${(item.price * item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsElement.appendChild(cartItem);

        subtotal += item.price * item.quantity;
    });

    cartSubtotalElement.textContent = subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

const cartButton = document.getElementById('cart-btn');
const cartMenu = document.getElementById('cart');

cartButton.addEventListener('click', () => {
    cartMenu.classList.toggle('active');
});

function addToCartAndOpenCart(productId) {
    addToCart(productId);
    openCart();
}

function openCart() {
    cartMenu.classList.add('active');
}

function closeCart() {
    cartMenu.classList.remove('active');
}

const closeCartButton = document.getElementById('close-cart-btn');
closeCartButton.onclick = function() {
    closeCart();
};
