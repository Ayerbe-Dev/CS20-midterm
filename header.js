function updateCartBadge() {
    let badge = document.getElementById("cart-badge");
    if (!badge) return; // Prevent errors if badge isn't found

    let cartNums = JSON.parse(localStorage.getItem('cartNums')) || [];
    let totalItems = cartNums.reduce((sum, num) => sum + num, 0); // Sum all item quantities

    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.style.display = "inline-block"; // Show badge
    } else {
        badge.style.display = "none"; // Hide badge when cart is empty
    }
}

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(updateCartBadge, 100); // ✅ Ensure it updates after the header loads
});
