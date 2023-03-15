document.addEventListener("DOMContentLoaded", function () {
  const cartList = document.getElementById('cart-list');
  const checkoutButton = document.getElementById('checkout-button');

  // Load cart items from local storage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Remove a game from the cart
  function removeFromCart(gameId) {
    // Find the index of the game in the cart
    const index = cart.findIndex(item => item.guid == gameId);
    if (index > -1) {
      // If the game is in the cart, remove it
      cart.splice(index, 1);
    }

    // Save the updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Render the cart
    renderCart();
  }

  // Render the cart
  function renderCart() {
    // Clear the cart list
    cartList.innerHTML = '';

    // Loop through the cart and create a cart item for each game
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div>
            <h3>${item.name}</h3>
            <p>$${item.price} x ${item.quantity}</p>
          </div>
          <button data-guid="${item.guid}">Remove</button>
        `;
      cartList.appendChild(cartItem);

      // Add an event listener to the Remove button to remove the game from the cart
      const removeButton = cartItem.querySelector('button');
      removeButton.addEventListener('click', () => {
        const gameGuid = removeButton.getAttribute('data-guid');
        removeFromCart(gameGuid);
      });
    });

    // Disable the checkout button if the cart is empty
    checkoutButton.disabled = cart.length === 0;
  }
  // Add an event listener to the checkout button    
  checkoutButton.addEventListener('click', () => {
    var totalPrice = 0;
    cart.forEach(item => {
      totalPrice += parseInt(item.price) * item.quantity;
    });
    alert(`Total price: $${totalPrice}.`);
  });

  // Render the initial cart
  renderCart();
});
