const size = 3; // 3x3 puzzle
const puzzle = document.getElementById("puzzle");

let tiles = [];
let firstTile = null;

// Create tiles
function createTiles() {
  for (let i = 0; i < size * size; i++) {
    let tile = document.createElement("div");
    tile.classList.add("tile");

    let row = Math.floor(i / size);
    let col = i % size;

    tile.style.backgroundPosition = `${(col * 100) / (size - 1)}% ${(row * 100) / (size - 1)}%`;

    tile.dataset.correct = i;
    tiles.push(tile);
  }

  shuffle(tiles);

  tiles.forEach(tile => {
    puzzle.appendChild(tile);

    tile.addEventListener("click", () => selectTile(tile));
    tile.addEventListener("touchstart", () => selectTile(tile));
  });
}

// Shuffle tiles
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Handle selection
function selectTile(tile) {
  if (!firstTile) {
    firstTile = tile;
    tile.style.border = "2px solid red";
  } else {
    swapTiles(firstTile, tile);
    firstTile.style.border = "1px solid #ccc";
    firstTile = null;
    checkWin();
  }
}

// Swap tiles
function swapTiles(t1, t2) {
  let temp = t1.style.backgroundPosition;
  t1.style.backgroundPosition = t2.style.backgroundPosition;
  t2.style.backgroundPosition = temp;

  let tempData = t1.dataset.correct;
  t1.dataset.correct = t2.dataset.correct;
  t2.dataset.correct = tempData;
}

// Check win
function checkWin() {
  let allTiles = document.querySelectorAll(".tile");
  let win = true;

  allTiles.forEach((tile, index) => {
    if (parseInt(tile.dataset.correct) !== index) {
      win = false;
    }
  });

  if (win) {
    launchConfetti();
    setTimeout(() => alert("🎉 Puzzle Completed!"), 300);
  }
}

// Confetti
function launchConfetti() {
  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 }
  });
}

createTiles();
