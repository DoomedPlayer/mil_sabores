document.addEventListener('DOMContentLoaded', () => {
    const cartItemsTableBody = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    const storedCart = localStorage.getItem('cartItems');
    let cart = [];

    if (storedCart) {
        cart = JSON.parse(storedCart);
        renderCart(cart);
    } else {
        cartItemsTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">El carrito está vacío.</td></tr>';
        cartTotalElement.textContent = 'Total: $0 CLP';
    }
});

function renderCart(cart) {
    const cartItemsTableBody = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let total = 0;

    cartItemsTableBody.innerHTML = '';

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toLocaleString('es-CL')} CLP</td>
            <td>$${itemTotal.toLocaleString('es-CL')} CLP</td>
        `;
        cartItemsTableBody.appendChild(row);
    });

    cartTotalElement.textContent = `Total: $${total.toLocaleString('es-CL')} CLP`;
}