let canvas = document.createElement("canvas");
canvas.height = 320;
canvas.width = 320;
let ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

export default {
  canvas,
  clear() {
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 320, 320);
  },
  drawSquare(x, y, fruit) {
    ctx.fillStyle = fruit ? "red" : "yellow";
    ctx.fillRect(x * 32, y * 32, 32, 32);
    if (!fruit) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.strokeRect(x * 32, y * 32, 32, 32);
    }
  },
  drawScore(score) {
      ctx.fillStyle = "white";
      ctx.font = "20px serif";
      ctx.fillText("Score: "+score, 0, 20);
  }
};
