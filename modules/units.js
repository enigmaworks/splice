let canvas = document.getElementById('canvas');


export let units = {
    xCenter: canvas.width/2,
    yCenter: canvas.height/2,
    assign: ()=>{
        units.xCenter = canvas.width/2;
        units.yCenter = canvas.height/2;
    },
    randomNum: (lower, upper) => {
        return Math.floor(Math.random() * ((upper + 1) - lower) + lower);
    }
}

export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

export function distance(x1,y1,x2,y2){
    return Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);
}