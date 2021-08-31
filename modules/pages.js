import { text } from "./text.js";
import { distance, units } from "./units.js";
import { player } from "./player.js";
import { colors } from "./effects.js";
import { game } from "./game.js";
import { btns } from "./btns.js";

let c = document.getElementById('canvas').getContext('2d');
let info = document.getElementById("info");
const music = new Audio("./sounds/music/cloud-nine.mp3");

export let currentPage = "render";

export function splashscreenP(){
    text(
        "click any key to start",
        units.xCenter, units.yCenter,
        {
            align: "center",
            style: "italic",
            font: "roboto slab",
            size: 30,
        }
    );
}

export function homescreenP(){
    text(
        `${player.score}`,
            units.xCenter, units.yCenter - 200,
            {
                size: 150,
                font: "Orbitron",
                color: "#eee",
            });
    text("Version: 0.0.FAILURE",
        25, canvas.height - 25,
        {
            font: "JetBrains Mono",
            baseline: "bottom",
            align: "left",
            size: "20"
        });
}


export function optionsP(){
    text("OPTIONS",
            units.xCenter, 100,
            {
                font: "Orbitron",
                size: 75,
                color: "#fff"
            });
        text(
            "Game",
            units.xCenter - 275, 200,
            {
                font: "Roboto Slab",
                size: 45,
                weight: 700
            });
        text(
            "LIMIT ONE ENERGY TYPE",
            units.xCenter - 275, 290,
            {
                size: 30,
            });
        text(
            "DIFFICULTY",
            units.xCenter - 275, 415,
            {
                size: 30,
            });
        text(
            "CONTROLS",
            units.xCenter - 275, 540,
            {
                size: 30,
            });
        text(
            "Visual",
            units.xCenter + 275, 200,
            {
                font: "Roboto Slab",
                size: 45,
                weight: 700
            });
        text(
            "EFFECTS",
            units.xCenter + 275, 290,
            {
                size: 30,
            });
        text(
            "THEME",
            units.xCenter + 275, 415,
            {
                size: 30,
            });
        c.fillStyle = colors.c(1);
        c.fillRect(units.xCenter + 100, 500, 350, 15)
        c.fillStyle = colors.c(2);
        c.fillRect(units.xCenter + 100, 515, 350, 15)
        c.fillStyle = colors.c(3);
        c.fillRect(units.xCenter + 100, 530, 350, 15)
        

}

export function gameP(){

}

export function homescreenBTN(){
    units.xCenter = canvas.width/2;
    info.style.maxHeight = "0px";
    game.reset();
    music.pause();
    currentPage = "homescreen";
    btns.clear();
    btns.add("Options", units.xCenter, units.yCenter +200, (btnI)=>{optionsBTN(); }, {fontSize: 50, fontColor: "#ccc", fill: "#222", stroke: "#555"})
    btns.add("Play", units.xCenter, units.yCenter +280, (btnI)=>{playBTN();}, {fontSize: 50})
}

function optionsBTN(){
    currentPage = "options";
    game.reset();
    btns.clear();
    btns.add("×", 60, 60, (btnI)=>{homescreenBTN(btnI);}, {weight: 800, font: "JetBrains Mono", fontSize: 60, square: true});
    btns.add(getEnergyTypes("label"), //toggle multiple energy types
        units.xCenter - 275, 340,
            toggleEnergyTypes,
        {
            fontSize: 35,
            opacity: getEnergyTypes("Opacity"),
            minWidth: 350
        });
    btns.add(getDifficulty(), //rotate difficulties
        units.xCenter - 275, 465,
        setDifficulty,
        {
            fontSize: 35,
            minWidth: 350
        });
    btns.add(getControls(), //rotate Controls
        units.xCenter - 275, 615,
        setControls,
        {
            fontSize: 35,
            minWidth: 350
        });
    btns.add(getEffects("label"), //toggle effects
        units.xCenter + 275, 340,
            setEffects,
        {
            fontSize: 35,
            minWidth: 350,
            opacity: getEffects("opacity")
        });
    btns.add(getTheme(), //rotate themes
        units.xCenter + 275, 465,
            setTheme,
        {
            fontSize: 35,
            minWidth: 350
        });
}
export function playBTN(btnI){
    //parses returned string "numPX" (width of info element) into a number then subracts it from the true center of the canvas to make the play area appear in the center of the visible area not obstructed by the info element
    units.xCenter = canvas.width/2 - parseInt(window.getComputedStyle(info).getPropertyValue('width'));
    music.play();
    music.loop = true;
    currentPage = "game";
    btns.clear();
    btns.add("back", units.xCenter - 225, canvas.height - 80, ()=>{homescreenBTN();});
    info.style.maxHeight = "600px";
}

function getEnergyTypes(p){
    if (p === "label") {
        if(game.multipleEnergyTypes === true){ return "On";}
        if(game.multipleEnergyTypes === false){ return "Off";}
    } else {
        if(game.multipleEnergyTypes === true){ return 1;}
        if(game.multipleEnergyTypes === false){ return .5;}
    }
   
}
function toggleEnergyTypes(i){
    if(btns.label[i] === "On"){
        btns.label[i] = "Off";
        btns.style[i].opacity = .5;
        game.multipleEnergyTypes = false;
    } else {
        btns.label[i] = "On";
        btns.style[i].opacity = 1;
        game.multipleEnergyTypes = true;
    }
}

function getDifficulty(){
    if(game.difficulty === 1){ return "Easy";}
    if(game.difficulty === 2){ return "Normal";}
    if(game.difficulty === 3){ return "Hard";}
    if(game.difficulty === 4){ return "Extreme";}
}
function setDifficulty(i){
    if(btns.label[i] === "Easy"){
        btns.label[i] = "Normal";
        game.difficulty = 2;
    } else if (btns.label[i] === "Normal") {
        btns.label[i] = "Hard";
        game.difficulty = 3;
    } else if (btns.label[i] === "Hard") {
        btns.label[i] = "Extreme";
        game.difficulty = 4;
    } else {
        btns.label[i] = "Easy";
        game.difficulty = 1;
    }
}

function getTheme(){
    if(game.theme === 1){ return "Classic";}
    if(game.theme === 2){ return "Cool";}
    if(game.theme === 3){ return "Warm";}
    if(game.theme === 4){ return "Greyscale";}
}
function setTheme(i){
    if(btns.label[i] === "Classic"){
        btns.label[i] = "Cool";
        game.theme = 2;
    } else if (btns.label[i] === "Cool") {
        btns.label[i] = "Warm";
        game.theme = 3;
    } else if (btns.label[i] === "Warm") {
        btns.label[i] = "Grayscale";
        game.theme = 4;
    } else {
        btns.label[i] = "Classic";
        game.theme = 1;
    }
}

function getEffects(p){
    if (p === "label") {
        if(game.effects === true){ return "On";}
        if(game.effects === false){ return "Off";}
    } else {
        if(game.effects === true){ return 1;}
        if(game.effects === false){ return .5;}
    }
   
}
function setEffects(i){
    if(btns.label[i] === "On"){
        btns.label[i] = "Off";
        btns.style[i].opacity = .5;
        game.effects = false;
    } else {
        btns.label[i] = "On";
        btns.style[i].opacity = 1;
        game.effects = true;
    }
}


function getControls(){
    if(game.controls === 1){ return "Arrow Keys + Space";}
    if(game.controls === 2){ return "W,A,S,D + Q/Space";}
    if(game.controls === 3){ return "Mouse";}
}

function setControls(i){
    if (btns.label[i] === "Mouse") {
        btns.label[i] = "Arrow Keys + Space";
        game.controls = 1;
    } else if (btns.label[i] === "Arrow Keys + Space") {
        btns.label[i] = "W,A,S,D + Q/Space";
        game.controls = 2;
    } else {
        btns.label[i] = "Mouse";
        game.controls = 3;
    }
}