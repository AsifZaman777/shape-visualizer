import * as PIXI from 'pixi.js';


const app = new PIXI.Application({
    backgroundColor: 0xAAAAAA, // Specify your desired background color here, for example, 0xAAAAAA for a light gray color
    resizeTo: window,
  });
  document.body.appendChild(app.view);
  
