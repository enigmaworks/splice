
import {text} from "./modules/text.js"
import {btns} from "./modules/btns.js"
import {player, drawPlayer} from "./modules/player.js"
import { playerControls } from "./modules/controls.js";
import {drawLasers, laserMovement, laserColisions} from "./modules/lasers.js"
import {colors, drawEffects, effects} from "./modules/effects.js"
import {game, createWave} from "./modules/game.js"
import {currentPage, splashscreenP, homescreenP, optionsP, gameP, playBTN} from "./modules/pages.js";
import {keyDownHandler,keyUpHandler,clickHandler} from "./modules/events.js"
import {units} from "./modules/units.js"
import {enemies, enemyMovement, launchDrones, drawEnemies} from "./modules/enemies.js"

let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');
canvas.width = 1200;
canvas.height = 800;
units.assign();

canvas.addEventListener("click", clickHandler);
document.body.addEventListener("keydown", keyDownHandler);
document.body.addEventListener("keyup", keyUpHandler);

setInterval(renderLoop, 20);

function renderLoop(){
    renderPage();
}

let launchDelay = 0;
let spawnCount = 130;

function renderPage() {
    c.clearRect(0,0, canvas.width, canvas.height);
    if(currentPage === "render"){
        splashscreenP();
    }
    if (currentPage === "homescreen"){
        homescreenP();
    }
    if(currentPage === "options"){
        optionsP();
    }
    if(currentPage === "game"){
        if(enemies.type.length === 0 && game.remainingSubWaves === 0 && enemies.spawnList.length === 0){
            game.nextWave();
            game.waveInfo.forEach((e, i)=>{
                let numIn = game.waveInfo[i].normal + game.waveInfo[i].join + game.waveInfo[i].droneLaunch;
                game.addSubWave();
                setTimeout(game.subWave, (((i * 40000) + (numIn * 400))));
            });
            effects.createNew(2);
            spawnCount = 131;
        }
        launchDelay++;
        if(launchDelay >= 250){
            launchDelay = 0;
            launchDrones();
        }
        spawnCount++;
        if(spawnCount > 130){
            spawnCount = 0;
            enemies.spawn();
        }
        playerControls();
        laserMovement();
        enemyMovement();
        laserColisions();
        drawLasers();
        drawEnemies();
        drawEffects();
        drawPlayer(units.xCenter, canvas.height - 100);
    }
    //render btns
    btns.x.forEach((x, i) => {
        let y = btns.y[i];
        let width = btns.width[i];
        let height = btns.height[i];
        let label = btns.label[i];
        c.beginPath();
        c.save();
        c.fillStyle = btns.style[i].fill;
        c.strokeStyle = btns.style[i].stroke;
        c.lineWidth = btns.style[i].lineWidth;
        c.globalAlpha = btns.style[i].opacity;
        c.rect(x - width/2, y - height/2, width, height);
        c.fill();
        c.stroke();
        text(label, x, y, {color: btns.style[i].fontColor,font: btns.style[i].font, size: btns.style[i].fontSize, weight: btns.style[i].weight, baseline: btns.style[i].baseline,});
        c.restore();
    });
}
