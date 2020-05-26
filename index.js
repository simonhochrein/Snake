import canvas from "./canvas.js";

var body = [
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
  { x: 4, y: 1 },
  { x: 5, y: 1 },
];

function checkForCollision() {
  var i = 0;
  for (var a of body) {
    var i2 = 0;
    for (var b of body) {
      if (a.x == b.x && a.y == b.y && i != i2) {
        gameOver = true;
        return true;
      }
      i2++;
    }
    i++;
  }
  return false;
}

var fruit = { x: null, y: null };
var score = 0;

function renderBody() {
  canvas.clear();
  for (var segment of body) {
    canvas.drawSquare(segment.x, segment.y);
  }
}

function renderFruit() {
  canvas.drawSquare(fruit.x, fruit.y, true);
}

function makeFruit() {
  let x, y;
  /**
   * Search for a new position that the snake is not currently occupying
   */
  foundLoop: while (true) {
    x = Math.round(Math.random() * 9);
    y = Math.round(Math.random() * 9);
    var isValid = true;
    for (var segment of body) {
      if (cmp(segment, { x, y })) {
        isValid = false;
      }
    }
    if (isValid) {
      break foundLoop;
    }
  }
  console.log(x, y);
  fruit.x = x;
  fruit.y = y;
}

function render() {
  renderBody();
  renderFruit();
  canvas.drawScore(score);
}

function cmp(a, b) {
  return a.x == b.x && a.y == b.y;
}

makeFruit();
render();

var direction = {
  x: 1,
  y: 0,
};
var gameOver = false;

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowDown":
      if (direction.y != -1) {
        direction = { x: 0, y: 1 };
      }
      break;
    case "ArrowLeft":
      if (direction.x != 1) {
        direction = { x: -1, y: 0 };
      }
      break;
    case "ArrowRight":
      if (direction.x != -1) {
        direction = { x: 1, y: 0 };
      }
      break;
    case "ArrowUp":
      if (direction.y != 1) {
        direction = { x: 0, y: -1 };
      }
      break;
    default:
      return;
  }
});

setInterval(() => {
  if (!gameOver) {
    var last = body.slice(-1)[0];
    //TODO screen wrapping
    var targetX = last.x + direction.x;
    var targetY = last.y + direction.y;
    if (targetX == 10) {
      targetX = 0;
    }
    if (targetX == -1) {
      targetX = 9;
    }
    if (targetY == 10) {
      targetY = 0;
    }
    if (targetY == -1) {
      targetY = 9;
    }
    body.push({ x: targetX, y: targetY });
    if (!cmp(body.slice(-1)[0], fruit)) {
      body.shift();
    } else {
      makeFruit();
      score++;
    }
    if (checkForCollision()) {
      alert("Game Over");
    } else {
      render();
    }
  }
}, 250);
