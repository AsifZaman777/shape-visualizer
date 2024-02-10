
// Custom class for resizable triangle
// class ResizableTriangle extends PIXI.Graphics {
//     constructor() {
//         super();

//         // Triangle points
//         this.points = [
//             new PIXI.Point(0, 0), // Top
//             new PIXI.Point(0, 100), // Bottom left
//             new PIXI.Point(100, 0) // Bottom right
//         ];

//         // Draw triangle
//         this.redraw();

//         // Create control points
//         this.controlPoints = [];
//         for (let i = 0; i < this.points.length; i++) {
//             const point = new PIXI.Graphics();
//             point.beginFill(0xFF0000);
//             point.drawCircle(0, 0, 9);
//             point.endFill();
//             point.interactive = true;
//             point.buttonMode = true;
//             point.on('pointerdown', this.onControlPointDragStart.bind(this, i));
//             point.on('pointerup', this.onControlPointDragEnd.bind(this, i));
//             point.on('pointerupoutside', this.onControlPointDragEnd.bind(this, i));
//             point.on('pointermove', this.onControlPointDragMove.bind(this, i));
//             this.controlPoints.push(point);
//             this.addChild(point);
//         }
//     }

//     redraw() {
//         this.clear();
//         this.lineStyle(4, 0x000000);
//         this.moveTo(this.points[0].x, this.points[0].y);
//         this.lineTo(this.points[1].x, this.points[1].y);
//         this.lineTo(this.points[2].x, this.points[1].y);
//         this.lineTo(this.points[0].x, this.points[0].y);
//     }

//     onControlPointDragStart(index, event) {
//         const point = this.points[index];
//         point.dragData = event.data;
//         point.dragging = true;
//     }

//     onControlPointDragEnd(index) {
//         const point = this.points[index];
//         if (point.dragging) {
//             delete point.dragData;
//             point.dragging = false;
//         }
//     }
//     onControlPointDragMove(index) {
//       const point = this.points[index];
//       if (point.dragging) {
//           const newPosition = point.dragData.getLocalPosition(this.parent);
  
//           // Ensure newPosition stays within the screen bounds
//           newPosition.x = Math.max(0, Math.min(newPosition.x, app.renderer.width));
//           newPosition.y = Math.max(0, Math.min(newPosition.y, app.renderer.height));
  
//           point.x = newPosition.x;
//           point.y = newPosition.y;
//           this.redraw();
//       }
//   }
// }

// Create PIXI application


const app = new PIXI.Application({
  backgroundColor: 0xAAAAAA,
  resizeTo: window,
});
document.body.appendChild(app.view);

// Add background container
const shapeContainer = new PIXI.Container();
const background = new PIXI.Graphics();
background.beginFill(0xFFFF00); // Yellow color
background.drawRect(0, 0, 800, 700); // Adjust dimensions as needed
background.endFill();
background.alpha = 0.1; //opacity
shapeContainer.addChild(background);
shapeContainer.x = app.renderer.width / 2 - 410;
shapeContainer.y = app.renderer.height / 2 - 300;
app.stage.addChild(shapeContainer);

let isDrawing = false;
let triangle = new PIXI.Graphics();
shapeContainer.addChild(triangle);

// Event listeners for mouse interaction
app.renderer.view.addEventListener('mousedown', onMouseDown);
app.renderer.view.addEventListener('mousemove', onMouseMove);
app.renderer.view.addEventListener('mouseup', onMouseUp);

let startX, startY;

function onMouseDown(event) {
  isDrawing = true;
  startX = event.clientX - app.renderer.view.offsetLeft - shapeContainer.x;
  startY = event.clientY - app.renderer.view.offsetTop - shapeContainer.y;
}

function onMouseMove(event) {
  if (isDrawing) {
      let currentX = event.clientX - app.renderer.view.offsetLeft - shapeContainer.x;
      let currentY = event.clientY - app.renderer.view.offsetTop - shapeContainer.y;

      triangle.clear();
      triangle.beginFill(0xFF0000); // Red color

      triangle.moveTo(startX, startY);
      triangle.lineTo(currentX, startY); // Horizontal line
      triangle.lineTo(startX, currentY); // Vertical line

      triangle.endFill();
  }
}

function onMouseUp(event) {
  isDrawing = false;
}

