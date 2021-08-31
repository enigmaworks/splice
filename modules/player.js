import {colors} from "./effects.js"

let c = document.getElementById('canvas').getContext('2d');

export let player = {
    xPos: 0,
	yPos: 0,
	health: 20,
    score: 0,
    spinSpeed: 8,
    spin: 0,
    rotation: 180,
    laserChangeSpeed: 12,
    laserChange: 0,
    laser: 0,
    shootSpeed: 10,
    shootTimer: 0,
}

export function drawPlayer(x,y){
    player.xPos = x;
    player.yPos = y;
    c.save();
    c.translate(x,y);
    c.rotate(player.rotation * Math.PI / 180);
    c.fillStyle = colors.c(player.laser);
    c.beginPath();
    c.moveTo(-26.67,0);
    c.quadraticCurveTo(-10,28.33 ,-10,58.33);
    c.lineTo(10,58.33);
    c.quadraticCurveTo(10,28.33 ,26.67,0);
    c.fill();
    c.fillStyle = colors.c(4);  
    c.beginPath();
    c.arc(0,0,26.67,0,2*Math.PI);
    c.fill(); 

    c.beginPath();
    c.strokeStyle = colors.c(player.laser);
    c.lineWidth = "3.33"
    c.moveTo(-10,20);
    c.lineTo(-10,58.33);
    c.quadraticCurveTo(0,66.67,10,58.33);
    c.lineTo(10,20);
    c.fill();  

    c.beginPath();
    c.fillStyle = colors.c(4);
    c.moveTo(-16.67,-6.67);
    c.quadraticCurveTo(-3.33,0,-5,41.67);
    c.lineTo(-1.67,41.67);
    c.lineTo(-1.67,-6.67);
    c.stroke();
    c.fill();

    c.beginPath();
    c.moveTo(16.67,-6.67);
    c.quadraticCurveTo(3.33,0,5,41.67);
    c.lineTo(1.67,41.67);
    c.lineTo(1.67,-6.67);
    c.stroke();
    c.fill();

    c.beginPath();
    c.fillStyle = colors.c(player.laser);
    c.arc(0,50,6.67,Math.PI * -.2,Math.PI *1.2);
    c.fill(); 

    c.beginPath();
    c.fillStyle = colors.c(player.laser);
    c.rect(-1.67,-6.67,3.33,48.33);
    c.stroke();
    c.fill();
    c.restore();
}
