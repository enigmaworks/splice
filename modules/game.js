import { enemies } from "./enemies.js";
import {units} from "./units.js";

export let game = {
    wave: 0,
    subwave: 0,
    waveInfo: [],
    remainingSubWaves: 0,
    difficulty: 2,
    controls: 1,
    multipleEnergyTypes: true,
    energyType: units.randomNum(1,3),
    theme: 1,
    effects: true,
    
    reset: ()=>{
        game.wave = 0;
        game.subwave = 0;
        game.waveInfo = [];
        game.remainingSubWaves = 0;
        enemies.x = [];
        enemies.y = [];
        enemies.dir = [];
        enemies.energyType = [];
        enemies.type = [];
        enemies.power = [];
        enemies.spawnList = [];
    },
    nextWave: ()=>{
        game.wave++;
        game.subwave = 1;
        game.waveInfo = createWave();
    },
    subWave: ()=>{
        let powerLower = 1;
        let powerUpper = game.difficulty + 4;
        for (let c = 0; c < game.waveInfo[0].normal; c++){
            enemies.addToSpawnList(1, units.randomNum(powerLower, powerUpper), energyType());
        }
        for (let c = 0; c < game.waveInfo[0].join; c++){
            enemies.addToSpawnList(2, units.randomNum(powerLower, powerUpper), energyType());
        }
        for (let c = 0; c < game.waveInfo[0].droneLaunch; c++){
            enemies.addToSpawnList(3, units.randomNum(powerLower, powerUpper), energyType());
        }
        game.waveInfo.splice(0, 1);
        enemies.shuffleSpawnList();
        game.remainingSubWaves--;
    },
    addSubWave: ()=>{
        game.remainingSubWaves++;
    },
}

export function createWave(w = game.wave, d = game.difficulty){
    let waveArr = [];
    /*     Get total number in wave     */
    //easy(d=1):       (1.15^x)x + 1.8x + 1
    //normal(d=2):     (1.15^x)x + 1.0x + 2
    //hard(d=3):       (1.15^x)x + 1.2x + 3
    //extremem(d=4):   (1.15^x)x + 1.4x + 4
    let normal = ((1.15**w) * w) + (((.2 * d) + .6) * w) + d;
    //easy(d=1):        1.25^x + 0.9x 
    //normal(d=2):      1.25^x + 1.0x
    //hard(d=3):        1.25^x + 1.1x
    //extremem(d=4):    1.25^x + 1.2x
    let join = (1.25**w) + (((.1 * d) + .8) * w);
    //easy(d=1):       (1.3^x) + .20x - 1.25
    //normal(d=2):     (1.3^x) + .25x - 1.25
    //hard(d=3):       (1.3^x) + .30x - 1.25
    //extremem(d=4):   (1.3^x) + .35x - 1.25
    let droneLaunch =  (1.3**w) + ((.05 * d) + 0.15) - 1.25;
    
    /*      Round      */
    normal = Math.ceil(normal);
    join = Math.ceil(join);
    droneLaunch = Math.floor(droneLaunch);

    
     /*      Break into sub-waves(so not all spawn imediately)      */
     
     let normInSubWave = 5;
     let joinInSubWave = 3;
     let launchInSubWave = 1;
     do{
        let subWaveObj = {};

        if(normal <= normInSubWave){
            subWaveObj.normal = normal;
            normal = 0;
        } else {
            subWaveObj.normal = normInSubWave;
            normal -= normInSubWave;
        }
        if(join <= joinInSubWave){
            subWaveObj.join = join;
            join = 0;
        } else {
            subWaveObj.join = joinInSubWave;
            join -= joinInSubWave;
        }
        if(droneLaunch <= launchInSubWave){
            subWaveObj.droneLaunch = droneLaunch;
            droneLaunch = 0;
        } else {
            subWaveObj.droneLaunch = launchInSubWave;
            droneLaunch -= launchInSubWave;
        }
        waveArr.push(subWaveObj);

        normInSubWave *= 2;
        joinInSubWave *= 2;
        launchInSubWave *= 2;
    } while(normal >= normInSubWave || join >= joinInSubWave || droneLaunch >= launchInSubWave ||
            normal !== 0 || join !== 0 || droneLaunch !== 0);
    
    return waveArr;
}

function energyType(){
    if(game.multipleEnergyTypes){
        return units.randomNum(1,3);
    } else {
        return game.energyType;
    }
}