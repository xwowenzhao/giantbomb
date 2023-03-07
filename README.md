# Giant Bomb Game Rental

## System Design Consideration
Consuming Giant Bomb API from https://www.giantbomb.com/api/ from my client-side JavaScript caused CORS error, e.g.: Access to fetch at https://www.giantbomb.com/api/games/?api_key=[api_key]&format=json&field_list=guid,id,name,image&filter=name:[search_term] from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

I added a server-side proxy to resolve the CORS issue: Instead of making the API request directly from my client-side JavaScript code, I can send the request to a server-side script on my own domain, which will then forward the request to the API endpoint and return the response to my JavaScript code. This way, the request is not subject to the same-origin policy and the CORS issue is avoided.

I used localStorage to save the cart across browser sessions. 

## Giant Bomb API Server Proxy
This is a Node.js server that provides an API for accessing data from the Giant Bomb API. It uses the Express framework for routing, the node-fetch library for making HTTP requests, and the cors library for enabling Cross-Origin Resource Sharing.

### Installation
1. Clone the repository to your local machine.
2. Navigate to the repository directory in your terminal.
3. Run npm install to install the required dependencies.
4. Run npm install --save-dev nodemon to install nodemon.
Nodemon is a command-line tool that helps with the speedy development of Node. js applications. It monitors your project directory and automatically restarts your node application when it detects any changes. This means that you do not have to stop and restart your applications in order for your changes to take effect.

### Usage
1. Run npm start to start the server. By default, it will listen on port 3000.
2. Access the API endpoints by sending HTTP requests to http://localhost:3000/api/games/?:query or http://localhost:3000/api/game/:id/?:query, where :id is the GUID of the game you want to retrieve.
3. The server will fetch data from the Giant Bomb API and return it as JSON.

### Endpoints
1. GET /api/games
Returns a list of games from the Giant Bomb API.
2. GET /api/game/:id
Returns details about a specific game, based on the game GUID.

## Giant Bomb Game Rental - Search Page
This is a simple web page that allows users to search for games from the Giant Bomb API and add them to their rental cart. The page consists of an HTML file, a CSS file for styling, and a JavaScript file for handling search functionality.

### Usage
1. Open the search.html file in a web browser.
2. Use the search bar to search for games by keyword.
3. Click the "Search" button to retrieve a list of matching games from the Giant Bomb API.
4. Click the "Rent" button on any game to add it to your rental cart.
5. Navigate to the "Checkout" page using the navigation links to view your cart and complete your rental.

### Files
search.html
This file contains the basic structure and content of the web page, including the search bar.

static/styles.css
This file contains the styles for the checkout page, including the layout, colors, and fonts.

static/search.js
This file contains the JavaScript code that handles search functionality, including adding games to your rental cart.

## Giant Bomb Game Rental - Checkout Page
This is a simple web page that allows users to view their rental cart, remove games from it, and complete their rental. The page consists of an HTML file, a CSS file for styling, and a JavaScript file for handling checkout functionality.

### Usage
1. Open the checkout.html file in a web browser.
2. View the list of games in your rental cart.
3. Click the "Remove" button to remove a game from your cart.
4. Click the "Checkout" button to complete your rental.

### Files
checkout.html
This file contains the basic structure and content of the checkout page, including the list of games in the rental cart and the checkout button.

static/styles.css
This file contains the styles for the checkout page, including the layout, colors, and fonts.

static/checkout.js
This file contains the JavaScript code that handles search functionality, including retrieving data from the Giant Bomb API and updating the list of games.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
