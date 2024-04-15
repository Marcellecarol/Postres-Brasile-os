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

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
       
        existingItem.quantity++;
    } else {
        
        const newItem = {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        };
        cart.push(newItem);
    }

    updateCartUI();
}


function removeFromCart(productId) {
  
    cart = cart.filter(item => item.id !== productId);

   
    updateCartUI();
}

function updateCartUI() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="products${item.immgUrl}" alt="${item.name}">
            <span>${item.name}</span>
            <div class="cart-item-details">
                <div>
                    <span>Quantity:</span>
                    <span class="quantity">${item.quantity}</span>
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
    });
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
    const cartSection = document.getElementById('cart');
    cartSection.style.display = 'block';
}
const closeCartButton = document.getElementById('close-cart-btn');

closeCartButton.addEventListener('click', () => {
    cartMenu.classList.remove('active');
});



