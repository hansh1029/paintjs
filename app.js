const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// set size of canvas to manipulate pixcel in canvas
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function setTouchPosition(event) {
  const rect = event.target.getBoundingClientRect();
  const x = event.touches[0].clientX - window.pageXOffset - rect.left;
  const y = event.touches[0].clientY - window.pageYOffset - rect.top;
  return { x, y };
}

function startTouchPainting(event) {
  const { x, y } = setTouchPosition(event);
  //console.log("creating path in ", x, y);
  ctx.beginPath();
  ctx.moveTo(x, y);
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    //console.log("creating path in ", x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    //console.log("creating line in ", x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onTouchMove(event) {
  const { x, y } = setTouchPosition(event);
  //console.log("creating line in ", x, y);
  ctx.lineTo(x, y);
  ctx.stroke();
  event.preventDefault();
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(event) {
  //block event
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  console.log(link);
  link.click();
}


if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);

  canvas.addEventListener("touchmove", onTouchMove);
  canvas.addEventListener("touchstart", startTouchPainting);
  canvas.addEventListener("touchend", stopPainting);
  canvas.addEventListener("touchcancel", stopPainting);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
