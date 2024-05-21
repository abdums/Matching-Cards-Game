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

  element.addEventListener("click", () => {
    if (awaitingEndOfMove) {
      return;
    }

    element.style.backgroundColor = color;
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
