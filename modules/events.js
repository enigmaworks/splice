import {btns} from "./btns.js"
import {currentPage, homescreenBTN} from "./pages.js"


export let keys = {}
        
export function clickHandler(clickEvent){
    let bcr = canvas.getBoundingClientRect();
    let xScale = bcr.width/canvas.width; //the transformation scale between the css rendered size of the canvas and canvas pixels
    let yScale = bcr.height/canvas.height;
    let clickX = (clickEvent.clientX - bcr.left) / xScale; //scales coordinates appropriately, so that click position is accurate to canvas pixels
    let clickY = (clickEvent.clientY - bcr.top) / yScale;
    btns.x.forEach((x,i) => {
    let y = btns.y[i];
    let xOffset = btns.width[i] / 2;
    let yOffset = btns.height[i] / 2;
    let action = btns.action[i];
    if(clickX >= x - xOffset //checks if click is within button bounding box
        && clickX <= x + xOffset 
        && clickY >= y - yOffset
        && clickY <= y + yOffset){
        action(i);
    }});
}

export function keyUpHandler(key){
    if(key.code === 'KeyA' || key.code === 'ArrowLeft'){
        keys.left = false;
    }
    if(key.code === 'KeyD' || key.code === 'ArrowRight'){
        keys.right = false;
    }
    if(key.code === 'KeyS' || key.code === 'ArrowDown'){
        keys.down = false;
    }
    if(key.code === 'KeyW' || key.code === 'ArrowUp'){
        keys.up = false;
    }
    if(key.code === 'Space' || key.code === 'Period' || key.code === 'KeyQ'){
        keys.space = false;
    }
}

export function keyDownHandler(key){
    if(key.code === 'KeyA' || key.code === 'ArrowLeft'){
        keys.left = true;
    }
    if(key.code === 'KeyD' || key.code === 'ArrowRight'){
        keys.right = true;
    }
    if(key.code === 'KeyS' || key.code === 'ArrowDown'){
        keys.down = true;
    }
      if(key.code === 'KeyW' || key.code === 'ArrowUp'){
        keys.up = true;
    }
    if(key.code === 'Space' || key.code === 'Period' || key.code === 'KeyQ'){
        keys.space = true;
    }
    if(currentPage === "render"){
        homescreenBTN();
    }
}