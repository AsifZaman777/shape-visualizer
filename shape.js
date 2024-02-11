const app = new PIXI.Application({
  backgroundColor: 0xaaaaaa,
  resizeTo: window,
});
document.body.appendChild(app.view);

// Add background container
const shapeContainer = new PIXI.Container();
const background = new PIXI.Graphics();
background.beginFill(0xffff00); // Yellow color
background.drawRect(0, 0, 800, 700); // Adjust dimensions as needed
background.endFill();
background.alpha = 0.5; //opacity
shapeContainer.addChild(background);
shapeContainer.x = app.renderer.width / 2 - 410;
shapeContainer.y = app.renderer.height / 2 - 300;
app.stage.addChild(shapeContainer);

let isDrawing = false;
let isMovingEnd1 = false;
let isMovingEnd2 = false;
let triangle = new PIXI.Graphics();
shapeContainer.addChild(triangle);

// Texts to display lengths and area
const sideTexts = [
  new PIXI.Text("", { fontFamily: "Arial", fontSize: 20, fill: 0x000000 }),
  new PIXI.Text("", { fontFamily: "Arial", fontSize: 20, fill: 0x000000 }),
  new PIXI.Text("", { fontFamily: "Arial", fontSize: 28, fill: 0x000000 }),
];

sideTexts.forEach((text, index) => {
  text.position.set(20, 30 + index * 30);
  app.stage.addChild(text);
});

// Initial triangle coordinates
let startX = 0;
let startY = 700;
let endX = 200;
let endY = 550;

// Draw initial triangle
triangle.lineStyle(2, 0x000000); // Black color, line width 2
triangle.moveTo(startX, startY);
triangle.lineTo(endX, startY); // Horizontal line
triangle.lineTo(startX, endY); // Vertical line
triangle.lineTo(startX, startY); // Complete the triangle path

const circleRadius = 10;
triangle.endFill();
triangle.beginFill(0xff0000);
triangle.drawCircle(endX, endY + 150, circleRadius);
triangle.endFill();

const circleRadius2 = 10;
triangle.endFill();
triangle.beginFill(0xff0000);
triangle.drawCircle(endX-200, endY , circleRadius2);
triangle.endFill();

// Calculate lengths of sides (scaled)
const base = Math.abs(endX - startX) / 50;
const height = Math.abs(endY - startY) / 50;
const hypotenuse = Math.sqrt(base * base + height * height);

// Display lengths and area (scaled)
sideTexts[0].text = `ভূমি: ${base.toFixed(2)} units`;
sideTexts[1].text = `উচ্চতা: ${height.toFixed(2)} units`;
sideTexts[2].text = `অতিভুজ: ${hypotenuse.toFixed(2)} units`;

// Event listeners for mouse interaction
app.renderer.view.addEventListener("mousedown", onMouseDown);
app.renderer.view.addEventListener("mousemove", onMouseMove);
app.renderer.view.addEventListener("mouseup", onMouseUp);

function onMouseDown(event) {
  isDrawing = true;
  let currentX = Math.max(
    0,
    Math.min(
      event.clientX - app.renderer.view.offsetLeft - shapeContainer.x,
      shapeContainer.width
    )
  );
  let currentY = Math.max(
    0,
    Math.min(
      event.clientY - app.renderer.view.offsetTop - shapeContainer.y,
      shapeContainer.height
    )
  );
  if (Math.abs(currentX - endX) < Math.abs(currentY - endY)) {
    isMovingEnd1 = true;
    isMovingEnd2 = false;
  } else {
    isMovingEnd1 = false;
    isMovingEnd2 = true;
  }
}

function onMouseMove(event) {
  if (isDrawing) {
    let currentX = Math.max(
      0,
      Math.min(
        event.clientX - app.renderer.view.offsetLeft - shapeContainer.x,
        shapeContainer.width
      )
    );
    let currentY = Math.max(
      0,
      Math.min(
        event.clientY - app.renderer.view.offsetTop - shapeContainer.y,
        shapeContainer.height
      )
    );

    if (isMovingEnd1) {
      endX = currentX;
    } else if (isMovingEnd2) {
      endY = currentY;
    }

    // Adjust circle position based on triangle end movement
    const circleX = isMovingEnd1 ? endX : startX;
    const circleY = isMovingEnd2 ? endY  : startY;

    triangle.clear();

    // Border
    triangle.lineStyle(2, 0x000000); // Black color, line width 2

    // Fill
    triangle.beginFill(0xff0000, 0.5); // Red color, 50% opacity

    // Draw triangle
    triangle.moveTo(startX, startY);
    triangle.lineTo(endX, startY); // Horizontal line
    triangle.lineTo(startX, endY); // Vertical line
    triangle.lineTo(startX, startY); // Complete the triangle path

    // Draw circle
    triangle.drawCircle(circleX, circleY, circleRadius);

    triangle.endFill();

    // Calculate lengths of sides (scaled)
    const base = Math.abs(endX - startX) / 50;
    const height = Math.abs(endY - startY) / 50;
    const hypotenuse = Math.sqrt(base * base + height * height);

    // Display lengths and area (scaled)
    sideTexts[0].text = `ভূমি: ${base.toFixed(2)} units`;
    sideTexts[1].text = `উচ্চতা: ${height.toFixed(2)} units`;
    sideTexts[2].text = `অতিভুজ: ${hypotenuse.toFixed(2)} units`;
  }
}

function onMouseUp(event) {
  isDrawing = false;
  isMovingEnd1 = false;
  isMovingEnd2 = false;
}
