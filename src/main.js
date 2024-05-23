const tilesContainer = document.querySelector(".tiles");
const colors = [
  "aqua",
  "aquamarine",
  "crimson",
  "blue",
  "dodgerblue",
  "gold",
  "greenyellow",
  "teal",
];
const colorPickList = [...colors, ...colors];
const tileCount = colorPickList.length;

//Game state
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

function buildTile(color) {
  const element = document.createElement("div");

  element.classList.add("tile");
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", "false");

  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");

    // Conditions to ignore the click
    if (awaitingEndOfMove || revealed === "true" || element === activeTile) {
      return;
    }

    element.style.backgroundColor = color;

    // Sets off tile comparison mode
    if (!activeTile) {
      activeTile = element;

      return;
    }

    // To compare card color
    const colorToMatch = activeTile.getAttribute("data-color");

    //Match Found & maybe winner winner chicken dinner
    if (colorToMatch === color) {
      activeTile.setAttribute("data-revealed", true);
      element.setAttribute("data-revealed", true);

      awaitingEndOfMove = false;
      activeTile = null;
      revealedCount += 2;

      if (revealedCount === tileCount) {
        alert("Hooray winna winna chicken dinner!!");
      }

      return;
    }

    awaitingEndOfMove = true;

    // Mismatched result
    setTimeout(() => {
      element.style.backgroundColor = null;
      activeTile.style.backgroundColor = null;

      //clear out game state variables
      awaitingEndOfMove = false;
      activeTile = null;
    }, 1000);
  });

  return element;
}

// Building the tiles
for (let i = 0; i < tileCount; i++) {
  const randomIndex = Math.floor(Math.random() * colorPickList.length);
  const color = colorPickList[randomIndex];
  const tile = buildTile(color);

  colorPickList.splice(randomIndex, 1);
  tilesContainer.appendChild(tile);
}

// Function to restart the game
function restartGame() {
  location.reload();
}

// Add event listener to the restart button
const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", restartGame);
