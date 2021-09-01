import { game } from "./game.js";
import { shuffle, units } from "./units.js";
import { colors } from "./effects.js";
import {text} from "./text.js"
let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');


export let enemies = {
    x: [],
    y: [],
    dir: [],
    energyType: [],
    type: [],
    power: [],
    radius: [],
    spawnList: [],

    addToSpawnList: (type, power, energyType) =>{
        let obj = {};
        obj.type = type;
        obj.power = power;
        obj.energyType = energyType;
        enemies.spawnList.unshift(obj);
    },
    shuffleSpawnList(){
        shuffle(enemies.spawnList);
    },
    create: (x,y,type,power, eType)=>{
        enemies.x.unshift(x);
        enemies.y.unshift(y);
        enemies.type.unshift(type);
        enemies.power.unshift(power);
        enemies.energyType.unshift(eType);
        enemies.radius.unshift(0);
    },
    spawn: ()=>{
        if(enemies.spawnList.length > 0){
            let e = enemies.spawnList[0];
            enemies.create(units.randomNum(50,units.xCenter*2 -50), -50, e.type, e.power, e.energyType)
            enemies.spawnList.splice(0, 1);
        }
    },
    weaken: function(i){
        enemies.power[i]--;
        if(enemies.power[i] <= 0){
            enemies.delete(i);
        }
    },
    strengthen: function(i){
        enemies.power[i]++;
        if(enemies.power[i] > 14){
            enemies.power[i]--;
            enemies.divide(i);
        }
    },
    divide: function(i){
        let p = enemies.power[i];
        let sp = 0;
        if(p === 1){
            sp = 1;
        } else if ( p % 2 === 0 ) {
            enemies.power[i] = p/2;
            sp =  enemies.power[i] + 1;
        } else {
            enemies.power[i] = Math.ceil(p/2);
            sp =  enemies.power[i] - 1;
        }
        enemies.x[i] = enemies.x[i] - enemies.radius[i] * 2;
        enemies.create(enemies.x[i] + enemies.radius[i]  * 2, enemies.y[i], enemies.type[i], sp, enemies.energyType[i]);
    },
    delete: (i)=>{
        enemies.x.splice(i, 1);
        enemies.y.splice(i, 1);
        enemies.type.splice(i, 1);
        enemies.power.splice(i, 1);
        enemies.energyType.splice(i, 1);
        enemies.radius.splice(i, 1);
        console.log("dead");
    }
}

export function enemyMovement(){
    enemies.type.forEach((e, i) =>{
        //enemies.x[i] += 10;
        if(enemies.type[i] === 4){
            enemies.y[i] += 0.35;
        }{
            enemies.y[i] += 0.25;
        }
        if(enemies.y[i] > canvas.height - 10){
            enemies.delete(i);
        }
    })
}

function getRadius(power, type){
    if (type === 4){
        return 14;
    } else if(type === 3){
        return Math.round(power * 1.02 + 22);
    }
    return Math.round(power * 1.02 + 18);
}

export function drawEnemies(){
    enemies.x.forEach((e,i)=>{
        if(enemies.power[i] <= 0){
            enemies.delete(i);
        } else {
            let radius = getRadius(enemies.power[i], enemies.type[i]);
            if(enemies.radius[i] < radius){
                enemies.radius[i]++;
            } else if (enemies.radius[i] > radius){
                enemies.radius[i]--;
            }
            let fontSize = radius * Math.SQRT2 - 2;
            let strokeWidth = enemies.power[i] /3 + 1;
            let baseColor = colors.c(enemies.energyType[i])
    
            if(enemies.type[i] === 1){
                c.save();
                c.translate(enemies.x[i], enemies.y[i]);
                c.rotate(enemies.dir[i] * Math.PI / 180);
                
                c.beginPath();
                c.fillStyle =  baseColor;
                c.globalAlpha = .2;
                c.arc(0,0,radius + (strokeWidth * 2), 0, 2 * Math.PI);
                c.fill();
                c.globalAlpha = 1;
                
                c.beginPath();
                c.fillStyle = colors.c(4);
                c.strokeStyle = baseColor;
                c.lineWidth = strokeWidth;
                c.arc(0,0,radius, 0, 2 * Math.PI);
                c.fill();
                c.stroke();
    
                c.beginPath();
                c.fillStyle = colors.c(4);
                c.arc(0,0,fontSize * .52 + 1, 0, 2 * Math.PI);
                c.fill();
    
                text(`${enemies.power[i]}`, 0, 0, {size: fontSize - 6, weight: 800, color: baseColor})
                c.restore();
            }
            if(enemies.type[i] === 2){
                c.save();
                c.translate(enemies.x[i], enemies.y[i]);
                c.rotate(enemies.dir[i] * Math.PI / 180);
                
                c.beginPath();
                c.fillStyle =  baseColor;
                c.globalAlpha = .2;
                c.arc(0,0,radius + (strokeWidth * 2), 0, 2 * Math.PI);
                c.fill();
                c.globalAlpha = 1;
                
                c.beginPath();
                c.fillStyle = baseColor;
                c.strokeStyle = baseColor;
                c.lineWidth = strokeWidth;
                c.arc(0,0,radius, 0, 2 * Math.PI);
                c.fill();
                c.stroke();
    
                c.beginPath();
                c.lineWidth = enemies.power[i]/2 + 2;
                c.strokeStyle = colors.c(4);
                c.arc(0,0,fontSize * .6 + 1, 0, 2 * Math.PI);
                c.stroke();
            
                text(`${enemies.power[i]}`, 0, 0, {size: fontSize - 6, weight: 800, color: colors.c(4)})
                c.restore();
            }
            if(enemies.type[i] === 3){
                c.save();
                c.translate(enemies.x[i], enemies.y[i]);
                c.rotate(enemies.dir[i] * Math.PI / 180);
                
                c.beginPath();
                c.fillStyle =  baseColor;
                c.globalAlpha = .2;
                c.arc(0,0,radius + (strokeWidth * 2), 0, 2 * Math.PI);
                c.fill();
                c.globalAlpha = 1;
                
                c.beginPath();
                c.fillStyle = colors.c(4);
                c.strokeStyle = baseColor;
                c.lineWidth = strokeWidth;
                c.arc(0,0,radius, 0, 2 * Math.PI);
                c.fill();
                c.stroke();
                
                c.beginPath();
                c.fillStyle = colors.c(4);
                c.strokeStyle = colors.c(4);
                c.lineWidth = strokeWidth * 3;
                c.arc(0,0,radius, .85, .75 * Math.PI);
                c.fill();
                c.stroke();
    
                c.beginPath();
                c.lineWidth = strokeWidth * 1.5 + 3;
                c.strokeStyle = baseColor;
                c.rect(-fontSize/2 + 1,-fontSize/2 + 1, fontSize -2, fontSize)
                c.stroke();
    
                c.beginPath();
                c.fillStyle = colors.c(4);
                c.rect(-fontSize/2 + 1,-fontSize/2 + 1, fontSize -2, fontSize + 4)
                c.fill();
    
                text(`${enemies.power[i]}`, 0, 4, {size: fontSize - 6, weight: 800, color: baseColor})
                
                c.restore();
            }
            if(enemies.type[i] === 4){
                let radius = 14;
                
                let baseColor = colors.c(enemies.energyType[i])
    
                c.save();
                c.translate(enemies.x[i], enemies.y[i]);
                c.rotate(enemies.dir[i] * Math.PI / 180);
                
                c.beginPath();
                c.strokeStyle = baseColor;
                c.lineWidth = 2;
                c.fillStyle = colors.c(4);
                c.arc(0,0, radius, 0, 2 * Math.PI);
                c.fill();
                c.stroke();
                
                c.beginPath();
                c.fillStyle = baseColor;
                c.arc(0,0,radius/3, 0, 2 * Math.PI);
                c.fill();
            
                c.restore();
            }
        }
    })
}

export function launchDrones(){
    enemies.type.forEach((type, i) => {
        if(type === 3){
            console.log(i);
            enemies.create(enemies.x[i], enemies.y[i], 4, 1, enemies.energyType[i]);
        }
    });
}