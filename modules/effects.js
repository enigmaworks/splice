import { game } from "./game.js";
import { text } from "./text.js";
import { lasers } from "./lasers.js";
import { units } from "./units.js";

let c = document.getElementById('canvas').getContext('2d');

export let colors = {
  c: function(cl){
      if(cl === 4){
          return "#222";
    } else {
        if(game.theme === 1){
            if(cl === 1){
                return '#73FF00';
            } else if (cl === 2) {
                return '#0073FF';
            } else {
                return '#FF0073';
            }
        } else if (game.theme === 2){
            if(cl === 1){
                return ' #00ffd2';
            } else if (cl === 2) {
                return '#3E00FF';
            } else {
                return '#db00ff';
            }
        } else if (game.theme === 3){
            if(cl === 1){
                return '#ff1600';
            } else if (cl === 2) {
                return  '#FF8E00';
            } else {
                return '#c5ff00';
            }
        } else {
            if(cl === 1){
                return '#e9ebf0';
            } else if (cl === 2) {
                return '#929396';
            } else {
                return '#3a3b3c';
            }
        }
    }
  },
  c1: '#73FF00',
  c2: '#0073FF',
  c3: '#FF0073',
}

export let effects = {
    x: [],
    y: [],
    type: [],
    color: [],
    progression: [],
    createNew: function(type, x = units.xCenter, y = units.yCenter, color = 1){
        effects.x.unshift(x);
        effects.y.unshift(y);
        effects.color.unshift(color);
        effects.type.unshift(type);
        effects.progression.unshift(0);
    },
}

export function drawEffects(){
    effects.type.forEach(function(e, i){
        if(effects.type[i] === 1){
            c.beginPath();
            c.save();
            c.globalAlpha = effects.progression[i] / 8;
            c.strokeStyle = colors.c(effects.color[i]);
            c.globalAlpha = effects.progression[i] / 3.3;
            c.fillStyle = colors.c(effects.color[i]);
            //[lw] = -1/10[progression]^2 + 1.25[progression]
            c.lineWidth =  ((effects.progression[i] ** 2)*-1/3) + (4 * effects.progression[i]); 
            //  [size] = -1/5[progression]^2 + 6.66[progression]
            c.arc(effects.x[i], effects.y[i], ((effects.progression[i] ** 2)*-1/5) + (10*(2/3) * effects.progression[i]), 0, Math.PI * 2);
            c.fill();
            c.stroke();
            c.closePath();
            c.restore();
            if(effects.progression[i] === 1){
                if(!(effects.type.length > 2 || lasers.type.length > 6)){
                    let blast = new Audio("./sounds/effects/blast.mp3");
                    blast.playbackRate = 3;
                    blast.play();
                }
            }
        if(effects.progression[i] > 10){
           remove(i);
        }
    }
    if(effects.type[i] === 2){
        c.save();
        if(effects.progression[i] <= 15){
            c.globalAlpha = (effects.progression[i] / (15));
        } else if (effects.progression[i] >= 70){
            c.globalAlpha = 1 - ((effects.progression[i] - 70)/40);
        } 
        text(`Wave ${game.wave}`, units.xCenter, units.yCenter, {size: 100, font: "Orbitron", weight: 800});
        c.restore();
        if(effects.progression[i] >= 110){
            remove(i);
         }
    }
    effects.progression[i]++;
  });
  }

function remove(index){
    effects.x.splice(index, 1);
    effects.y.splice(index, 1);
    effects.type.splice(index, 1);
    effects.color.splice(index, 1);
    effects.progression.splice(index, 1);
}