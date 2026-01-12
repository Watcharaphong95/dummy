const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let drawing = false;

function pos(e) {
  const r = canvas.getBoundingClientRect();
  if (e.touches) {
    return {
      x: e.touches[0].clientX - r.left,
      y: e.touches[0].clientY - r.top
    };
  }
  return {
    x: e.clientX - r.left,
    y: e.clientY - r.top
  };
}

function start(e) {
  drawing = true;
  let p = pos(e);
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
}

function draw(e) {
  if (!drawing) return;
  let p = pos(e);
  ctx.lineTo(p.x, p.y);
  ctx.strokeStyle = color.value;
  ctx.lineWidth = size.value;
  ctx.lineCap = "round";
  ctx.stroke();
}

function stop() {
  drawing = false;
}

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stop);
canvas.addEventListener("touchstart", start);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stop);

function addSticker(text) {
  ctx.font = "40px serif";
  ctx.fillText(text, 50 + Math.random() * 200, 60 + Math.random() * 300);
}

imgUpload.onchange = function () {
  const file = this.files[0];
  const img = new Image();
  img.onload = () => ctx.drawImage(img, 50, 50, 150, 150);
  img.src = URL.createObjectURL(file);
};

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveImage() {
  ctx.fillStyle = "#000";
  ctx.font = "14px sans-serif";
  ctx.fillText("ความรู้สึก: " + feeling.value, 10, 390);
  ctx.fillText("ความรู้ที่ได้: " + knowledge.value, 10, 410);

  const link = document.createElement("a");
  link.download = "artwork_wangnarai.png";
  link.href = canvas.toDataURL();
  link.click();
}
