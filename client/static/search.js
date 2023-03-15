document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const gameList = document.getElementById('game-list');

  // Load cart items from local storage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Add a game to the cart
  function addToCart(game) {
    // Check if the game is already in the cart
    const index = cart.findIndex(item => item.guid === game.guid);
    if (index > -1) {
      // If the game is already in the cart, increase the quantity
      cart[index].quantity++;
    } else {
      // If the game is not in the cart, add it with a quantity of 1
      cart.push({
        guid: game.guid,
        name: game.name,
        image: game.image.medium_url,
        price: game.price,
        quantity: 1
      });
    }

    // Save the updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Render the game list
  function renderGames(gameData) {
    // Clear the game list
    gameList.innerHTML = '';

    // Loop through the game data and create a game card for each game
    gameData.forEach(game => {
      const card = document.createElement('div');
      card.classList.add('game-card');
      card.innerHTML = `
        <img src="${game.image.medium_url}" alt="${game.name}">
        <h2>${game.name}</h2>
        <button data-guid="${game.guid}" data-price="${game.price}">$${game.price} - Rent</button>
      `;
      gameList.appendChild(card);

      // Add an event listener to the Rent button to add the game to the cart
      const rentButton = card.querySelector('button');
      rentButton.addEventListener('click', () => {
        const gamePrice = rentButton.getAttribute('data-price');
        const gameGuid = rentButton.getAttribute('data-guid');
        const url = `http://localhost:3000/api/game/${gameGuid}/?api_key=8ee9bd83db16d30d5369ced3c2c5a8d767036212&format=json&field_list=guid,name,image`;

        // Make the API request
        fetch(url)
          .then(response => response.json())
          .then(data => {
            // Extract the game data from the API response
            const game = data.results;
            const gameData = ({
              guid: game.guid,
              name: game.name,
              image: game.image,
              price: gamePrice
            });
            addToCart(gameData);
          })
          .catch(error => console.error(error));
      });
    });
  }
  // Add an event listener to the search button to search for games
  searchButton.addEventListener('click', () => {
    // Get the search query from the input field
    const query = searchInput.value;

    // Build the API URL with the search query
    const url = `http://localhost:3000/api/games/?api_key=8ee9bd83db16d30d5369ced3c2c5a8d767036212&format=json&field_list=guid,name,image&filter=name:${query}`;

    // Make the API request
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Extract the game data from the API response
        const gameData = data.results.map(game => ({
          guid: game.guid,
          name: game.name,
          image: game.image,
          price: Math.floor(Math.random() * 5 + 1) // Set a random rental price per game
        }));

        // Render the game list
        renderGames(gameData);
      })
      .catch(error => console.error(error));
  });

  // Render the initial game list
  renderGames([]);
});
