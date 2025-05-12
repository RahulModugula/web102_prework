/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// DOM element references
const gamesContainer = document.getElementById("games-container");
const contributionsCard = document.getElementById("num-contributions");
const raisedCard = document.getElementById("total-raised");
const gamesCard = document.getElementById("num-games");
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");
const descriptionContainer = document.getElementById("description-container"); // Fixed: was "company-description"
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// Challenge 3: Add data about each game as a card to the games-container
function addGamesToPage(games) {
  // loop over each item in the data
  games.forEach((game) => {
    // create a new div element, which will become the game card
    const gameCard = document.createElement("div");

    // add the class game-card to the list
    gameCard.classList.add("game-card");

    // set the inner HTML using a template literal
    gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Goal: $${game.goal.toLocaleString()}</p>
            <p>Backers: ${game.backers.toLocaleString()}</p>
        `;

    // append the game to the games-container
    gamesContainer.appendChild(gameCard);
  });
}

// call the function with the JSON data
addGamesToPage(GAMES_JSON);

// Count the number of total contributions
const totalContributions = GAMES_JSON.reduce((total, game) => {
  return total + game.backers;
}, 0);

// Set the inner HTML for contributions
contributionsCard.innerHTML = totalContributions.toLocaleString();

// Calculate total amount raised
const totalRaised = GAMES_JSON.reduce((total, game) => {
  return total + game.pledged;
}, 0);

// Set inner HTML for amount raised
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// Set inner HTML for number of games
gamesCard.innerHTML = GAMES_JSON.length;

// Filter for unfunded games
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);

  // add the unfunded games to the DOM
  addGamesToPage(unfundedGames);
}

// Filter for funded games
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);

  // add the funded games to the DOM
  addGamesToPage(fundedGames);
}

// Show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games to the DOM
  addGamesToPage(GAMES_JSON);
}

// Add event listeners to buttons
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

// Count unfunded games
const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
const numUnfundedGames = unfundedGames.length;

// Create message string using ternary operator
const gameText =
  numUnfundedGames === 1
    ? "Currently, there is 1 game that still needs funding!"
    : `Currently, there are ${numUnfundedGames} games that still need funding!`;

// Create element and add to description container
const unfundedInfo = document.createElement("p");
unfundedInfo.textContent = gameText;
descriptionContainer.appendChild(unfundedInfo);

// Sort games by pledged amount in descending order
const sortedGames = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

// Get top two games using destructuring
const [topGame, secondGame] = sortedGames;

// Clear existing content in the game containers before adding new content
deleteChildElements(
  firstGameContainer.querySelector("h3").nextElementSibling ||
    firstGameContainer
);
deleteChildElements(
  secondGameContainer.querySelector("h3").nextElementSibling ||
    secondGameContainer
);

// Create elements for top game
const topGameElement = document.createElement("div");
topGameElement.innerHTML = `
    <img class="game-img" src="${topGame.img}" alt="${topGame.name}" />
    <h4>${topGame.name}</h4>
    <p>$${topGame.pledged.toLocaleString()} pledged</p>
`;
firstGameContainer.appendChild(topGameElement);

// Create elements for runner up game
const secondGameElement = document.createElement("div");
secondGameElement.innerHTML = `
    <img class="game-img" src="${secondGame.img}" alt="${secondGame.name}" />
    <h4>${secondGame.name}</h4>
    <p>$${secondGame.pledged.toLocaleString()} pledged</p>
`;
secondGameContainer.appendChild(secondGameElement);
