// Load cart on page load
document.addEventListener("DOMContentLoaded", function () {
    updateCart();

    document.getElementById("clear-cart").addEventListener("click", clearCart);
});

function clearCart() {
    localStorage.removeItem("cartNames");
    localStorage.removeItem("cartNums");
    updateCart();
    updateCartBadge();
}

// Adds an item to the cart
function addToCart(itemName) {
    let cartNames = JSON.parse(localStorage.getItem('cartNames')) || [];
    let cartNums = JSON.parse(localStorage.getItem('cartNums')) || [];

    let index = cartNames.indexOf(itemName);
    if (index === -1) {
        cartNames.push(itemName);
        cartNums.push(1);
    } else {
        cartNums[index]++;
    }

    localStorage.setItem('cartNames', JSON.stringify(cartNames));
    localStorage.setItem('cartNums', JSON.stringify(cartNums));

    updateCart();
    updateCartBadge();
    alert(`✅ ${itemName} added to cart!`);
}

// Updates cart UI in cart.html
function updateCart() {
    const cartNames = JSON.parse(localStorage.getItem('cartNames')) || [];
    const cartNums = JSON.parse(localStorage.getItem('cartNums')) || [];
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    let total = 0;

    if (!cartContainer) return; // Prevent running if not on cart page

    cartContainer.innerHTML = ""; // Clear previous items

    if (cartNames.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "Total: $0.00";
        return;
    }

    cartNames.forEach((itemName, index) => {
        const quantity = cartNums[index];
        const item = gearItems.find(i => i.name === itemName);
        if (!item) return;

        const itemTotal = quantity * item.price;
        total += itemTotal;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <span><strong>${item.name}</strong> - $${item.price.toFixed(2)} x ${quantity}</span>
            <button class="btn small-btn" onclick="addToCart('${item.name}')">+</button>
            <button class="btn small-btn" onclick="removeFromCart('${item.name}')">-</button>
        `;
        cartContainer.appendChild(itemDiv);
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Removes an item from the cart
function removeFromCart(itemName) {
    let cartNames = JSON.parse(localStorage.getItem('cartNames')) || [];
    let cartNums = JSON.parse(localStorage.getItem('cartNums')) || [];

    let index = cartNames.indexOf(itemName);
    if (index !== -1) {
        cartNums[index]--;
        if (cartNums[index] <= 0) {
            cartNames.splice(index, 1);
            cartNums.splice(index, 1);
        }
    }

    localStorage.setItem('cartNames', JSON.stringify(cartNames));
    localStorage.setItem('cartNums', JSON.stringify(cartNums));

    updateCart();
    updateCartBadge();
}