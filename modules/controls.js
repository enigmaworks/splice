import{keys} from "./events.js"
import{lasers} from "./lasers.js"
import { player } from "./player.js";

let c = document.getElementById('canvas').getContext('2d');

export function playerControls(){
    if(keys.left){
        if(player.spin > 0){ player.spin = 0; }
        player.spin--;
        player.rotation--;
        if(player.spin < -7){
            player.rotation -= 2;
        }
        if(player.spin < -21){
            player.rotation -= 3;
        }
    } else if(keys.right){
        if(player.spin < 0){ player.spin = 0; }
        player.spin++;
        player.rotation ++;
        if(player.spin > 7){
            player.rotation+= 2
        }
        if(player.spin > 21){
            player.rotation += 3;
        }
    }  else {
        player.spin = 0;
    }
    if (Math.abs(player.rotation) > 360){
        player.rotation = Math.abs(player.rotation) - 360;
    }
  if (player.rotation < 0){
  	player.rotation = 360 - Math.abs(player.rotation);
  }
  
  if (player.laserChange > 0){
  	player.laserChange--
  } else {
      if(keys.up){
          player.laser++
          player.laserChange = player.laserChangeSpeed;
        } 
        if(keys.down){
            player.laser--
            player.laserChange = player.laserChangeSpeed;
    }
    if(player.laser > 3){
        player.laser = 1;
    } else if(player.laser < 1){
        player.laser = 3;
    }
}
if(keys.space){
    if(player.shootTimer > 0){
        player.shootTimer--
    } else {
        lasers.create(player.xPos, player.yPos, player.laser, player.rotation);
        player.shootTimer = player.shootSpeed;
    }
} else {
    if(player.shootTimer < 8){
        player.shootTimer = 0;
    }
  }
}