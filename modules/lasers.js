import { colors, effects } from "./effects.js";
import { enemies } from "./enemies.js";
import { game } from "./game.js";
import { distance } from "./units.js";


let c = document.getElementById('canvas').getContext('2d');


export let lasers = {
    x: [],
    y: [],
    dir: [],
    type: [],
    xChange: [],
    yChange: [],
    //to fire a new laser, you initate it by calling lasers.create(x,y,type 1-3, direction 0-360);
    delete: (i)=>{
        lasers.x.splice(i, 1);
        lasers.y.splice(i, 1);
        lasers.dir.splice(i, 1);
        lasers.type.splice(i, 1);
        lasers.xChange.splice(i, 1);
        lasers.yChange.splice(i, 1);
    },
    create: function(x,y,type,dir){
            let sound = Math.ceil(Math.random() * 3);
            if(sound === 1){
                let laser1 = new Audio("./sounds/effects/laser-1.mp3");
                laser1.play();
            }
            if(sound === 2){
                let laser2 = new Audio("./sounds/effects/laser-2.mp3");
                laser2.play();
            
            }
            if(sound === 3){
                let laser2 = new Audio("./sounds/effects/laser-1.mp3");
                laser2.play();
            }
        lasers.x.unshift(x);
        lasers.y.unshift(y);
        lasers.dir.unshift(dir);
        lasers.type.unshift(type);
        /*
        for movement, you add xChange to x, and the same for Y. 360, 90, 180, and 270 are straight lines, so they have no movement on one axis and 100% on the other.
        for the other directions, we must convert it to an angle less than 90 degrees, then input it into a  trigometric ratio where the hypotenuse is one(only takes radians, so we convert degrees into radians by multiplying by pi/180)
        */
        if(dir === 0 || dir === 360){
            lasers.xChange.unshift(0);
            lasers.yChange.unshift(1);
        } else if(dir === 90){
            lasers.xChange.unshift(-1);
            lasers.yChange.unshift(0);
        } else if(dir === 180){
            lasers.xChange.unshift(0);
            lasers.yChange.unshift(-1);
        } else if(dir === 270){
            lasers.xChange.unshift(1);
            lasers.yChange.unshift(0);
        } else if(dir < 90 && dir > 0){
            lasers.xChange.unshift(Math.cos((dir - 90) * (Math.PI/180)) * -1);
            lasers.yChange.unshift(Math.sin((dir - 90) * (Math.PI/180)) * -1);
        } else if(dir < 180 && dir > 90){
            lasers.xChange.unshift(Math.sin((dir - 180) * (Math.PI/180)));
            lasers.yChange.unshift(Math.cos((dir - 180) * (Math.PI/180)) * -1);
        } else if(dir < 270 && dir > 180){
            lasers.xChange.unshift(Math.cos((dir - 270) * (Math.PI/180)));
            lasers.yChange.unshift(Math.sin((dir - 270) * (Math.PI/180)));
        } else if(dir < 360 && dir > 270){
            lasers.xChange.unshift(Math.sin((dir - 360) * (Math.PI/180)) * -1);
            lasers.yChange.unshift(Math.cos((dir - 360) * (Math.PI/180)));
        }
        //the speed muliplyer, otherwise the lasers are really slow   
        lasers.xChange[0] *= 10;
        lasers.yChange[0] *= 10;
        }
        
}

export function drawLasers(){
	lasers.type.forEach((e,i) => {
        c.save();
        c.translate(lasers.x[i], lasers.y[i]);
        c.beginPath();
        c.moveTo(0,0);
        c.lineCap = "round";
        c.globalAlpha = .25;
        c.lineWidth = 5;
        c.lineTo(lasers.xChange[i] * 5, lasers.yChange[i] * 5);
        c.strokeStyle = "#ddd";
        c.stroke();
        c.strokeStyle = colors.c(lasers.type[i]);
        c.globalAlpha = 1;
        c.lineWidth = 3;
        c.moveTo(0,0);
        c.lineTo(lasers.xChange[i] * 5, lasers.yChange[i] * 5);
        c.stroke();
        c.closePath();
        c.restore();
  })
}

export function laserMovement(){
    lasers.type.forEach((e, i) =>{
        lasers.x[i] += lasers.xChange[i];
        lasers.y[i] += lasers.yChange[i];
        //delete if it runs off canvas
        if(lasers.x[i] > canvas.width  || lasers.x[i] < 0 || lasers.y[i] > canvas.height || lasers.y[i] < 0){
            effects.createNew(1, lasers.x[i], lasers.y[i], lasers.type[i]);
            lasers.delete(i);
        }
    })
}

export function laserColisions(){
    lasers.y.forEach((ly,li)=>{
        for (let ei = 0; ei < enemies.y.length; ei++) {
            let ex = enemies.x[ei];
            let ey = enemies.y[ei];
            let lx = lasers.x[li];
            let dist = distance(lx,ly,ex,ey);
            let lType = lasers.type[li];
            let eType = enemies.energyType[ei];
            if(dist <= enemies.radius[ei]){
                if(lType === eType){
                    enemies.weaken(ei);
                }
                if (lType === 1) {
                    if (eType === 2) {
                        enemies.strengthen(ei);
                    } else if (eType === 3){
                        enemies.divide(ei);
                    }
                } else if (lType === 2){
                    if (eType === 1) {
                        enemies.strengthen(ei);
                    } else if (eType === 3){
                        enemies.divide(ei);
                    }  
                } else {
                    if (eType === 1) {
                        enemies.strengthen(ei);
                    } else if (eType === 2){
                        enemies.divide(ei);
                    }
                }
                lasers.delete(li);
            } 
        }
    });
}