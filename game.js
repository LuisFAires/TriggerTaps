const sprites = new Image();
sprites.src = "./img/sprites.webp";

const gunfire = new Audio();
gunfire.src = "./sound/gunfire.mp3";

const countdown = new Audio();
countdown.src = "./sound/countdown.wav"

const audioCtx = new AudioContext();
const track = audioCtx.createMediaElementSource(gunfire);
const panner = new StereoPannerNode(audioCtx, {pan: 0});
track.connect(panner).connect(audioCtx.destination);

const canvas = document.querySelector('canvas');
const context = canvas.getContext("2d");
let blockInputLeft = false;
let blockInputRight = false;
let unblockInputLeftTimeout = false;
let unblockInputRightTimeout = false;
let currentScreen;
let mode;
let timerEnd;
let remainingTimer;
let currentLevel;

const players = {// Stores both players current sprites info, status and functions to draw, animate and reset them.
    first:{ //Stores first player info and draw and reset functions.
        status: "standing",
        name: "First",
        sourceX: 0,
        sourceY: 0,
        positionX: canvas.halfWidth - 350,
        positionY: canvas.halfHieght - 50,
        draw(){
            context.drawImage(
                sprites,
                players.first.sourceX, players.first.sourceY, //Start position
                100, 100, //Sprite size
                players.first.positionX, players.first.positionY, //On frame position
                100, 100 //On frame size
            );
        },
        reset(){
            players.first.status = "standing";
            players.first.sourceX = 0;
            players.first.sourceY = 0;
        }
    },
    second:{//Stores second player info and draw and reset functions.
        status: "standing",
        name: "Second",
        sourceX: 0,
        sourceY: 100,
        positionX: canvas.halfWidth + 250,
        positionY: canvas.halfHieght - 50,
        draw(){
            context.drawImage(
                sprites,
                players.second.sourceX, players.second.sourceY, //Start position
                100, 100, //Sprite size
                players.second.positionX , players.second.positionY, //On frame position
                100, 100 //On frame size
            );
        },
        reset(){
            players.second.status = "standing";
            players.second.sourceX = 0;
            players.second.sourceY = 100;
        }
    },
    doWithdraw(player){ //Makes the player withdraw the gun.
        if(player.status == "standing"){
            if(player.sourceX < 450){
                player.sourceX += 100;
            }else{
                player.status = "withdraw";
            }
        }else{
            console.log(player.name+" player can't withdraw.\nPlayer status: "+player.status);
        }
    },
    undoWithdraw(player){//Makes the player keep the gun.
        if(player.status == "withdraw"){
            if(player.sourceX > 0){
                player.sourceX -= 100;
            }else{
                player.reset();
            }
        }else{
            console.log(player.name+" player can't undo withdraw.\nPlayer status: "+player.status);
        }
    },
    shoot(shooter){//Makes the player shoot
        if(shooter.status == "withdraw"){
            shooter.status = "shooting";
            shooter.sourceX = 0;
            shooter.sourceY += 200;
        }else if(shooter.status == "shooting" && shooter.sourceX < 400){
            shooter.sourceX += 100;
        }else if(shooter.status == "shooting"){
            shooter.sourceX += 100;
            shooter.sourceY -= 200;
            shooter.status = "withdraw";
        }else{
            console.log(shooter.name+" player can't shoot.\nPlayer status: "+shooter.status);
        }
    },
    die(dead){//Makes the player die
        if(dead.status == "withdraw"){
            dead.status = "dead";
            dead.sourceX = 0;
            dead.sourceY += 400 
        }else if(dead.status == "dead" && dead.sourceX < 400){
            dead.sourceX += 100;
        }else if(dead.status != "dead"){
            console.log(dead.name+" player can't die.\nPlayer status: "+dead.status);
        }
    },
    action(shooter, dead){//Calls the shoot and die functions together so they do not conflict each other.
        this.shoot(shooter);
        this.die(dead);
    }
}

const levels = [
    { min: 280, max: 300, X: 85 },//1
    { min: 260, max: 280, X: 188 },//2
    { min: 240, max: 260, X: 291 },//3
    { min: 220, max: 240, X: 394 },//4
    { min: 200, max: 220, X: 497 },//5
    { min: 180, max: 200, X: 600 },//6
    { min: 160, max: 180, X: 703 },//7
    { min: 140, max: 160, X: 812 },//8
    { min: 120, max: 140, X: 915 },//9
    { min: 100, max: 120}//10
];

const screens = { 
    menu:{ //Draw buttons and put both players to standing status reseting them.
        name: "menu",
        update(){
            drawEveryFrameObjects();
            context.drawImage(sprites, 1311, 1636, 53, 69, (canvas.halfWidth - 340), (canvas.halfHieght - 105), 26, 35);
            context.drawImage(sprites, 600, 400, 400, 200, (canvas.halfWidth - 150), (canvas.halfHieght -75), 300, 150);
            if(players.first.status == "withdraw"){
                players.undoWithdraw(players.first);
            }else{
                players.first.reset();
            }
            if(players.second.status == "withdraw"){
                players.undoWithdraw(players.second);
            }else{
                players.second.reset();
            }
        }
    },
    game:{ //Just responsible to update on game frames.
        name: "game",
        update(){
            drawEveryFrameObjects();
            drawTimer();
            if(players.first.status == "standing"){
                players.doWithdraw(players.first);
            }
            if(players.second.status == "standing"){
                players.doWithdraw(players.second);
            }
            if(mode == "single"){
                if(blockInputLeft){
                    context.drawImage(sprites, 47, 1848, 1297, 63, canvas.halfWidth - 315, canvas.halfHieght - 120, 630, 31);
                    context.drawImage(sprites, 525, 1920, 350, 80, players.first.positionX, players.first.positionY - 24, 105, 24);
                }else{
                    context.drawImage(sprites, 809, 1636, 192, 80, (players.first.positionX + 25), players.first.positionY - 24, 58, 24);
                }
                context.drawImage(sprites, 1010, 1636, 259, 80, (players.second.positionX + 10), players.second.positionY - 24, 77, 24);
            }else if(mode == "multi"){
                if(blockInputLeft){
                    context.drawImage(sprites, 47, 1848, 1297, 63, canvas.halfWidth - 315, canvas.halfHieght - 120, 630, 31);
                    context.drawImage(sprites, 525, 1920, 350, 80, players.first.positionX, players.first.positionY - 24, 105, 24);
                }else{
                    context.drawImage(sprites, 25, 1636, 350, 80, players.first.positionX, players.first.positionY - 24, 105, 24);
                }
                if(blockInputRight){
                    context.drawImage(sprites, 47, 1848, 1297, 63, canvas.halfWidth - 315, canvas.halfHieght - 120, 630, 31);
                    context.drawImage(sprites, 525, 1920, 350, 80, players.second.positionX, players.second.positionY - 24, 105, 24);
                }else{
                    context.drawImage(sprites, 417, 1636, 350, 80, players.second.positionX, players.second.positionY - 24, 105, 24);
                }   
            }
        },
    },
    end:{ //Updates frames and gives the user the result
        name: "end",
        update(){
            drawEveryFrameObjects();
            if(players.first.status == "shooting"){
                players.action(players.first, players.second);
            }else if(players.second.status == "shooting"){
                players.action(players.second, players.first);
            }
            if(mode == "single"){
                if(players.first.status == "dead"){
                    context.drawImage(sprites, 600, 200, 400, 200, (canvas.halfWidth - 150), (canvas.halfHieght -75), 300, 150);
                }else if(players.second.status == "dead"){
                    if(currentLevel < 9){
                        context.drawImage(sprites, 1000, 0, 400, 200, (canvas.halfWidth - 150), (canvas.halfHieght -75), 300, 150);
                        context.drawImage(sprites, levels[currentLevel].X, 1738, 75, 75,(canvas.halfWidth - 35), (canvas.halfHieght - 37), 20, 20);
                    }else{
                        context.drawImage(sprites, 1000, 200, 400, 200, (canvas.halfWidth - 150), (canvas.halfHieght -75), 300, 150);
                    }
                }
            }else if(mode == "multi"){
                if(players.first.status == "dead"){
                    context.drawImage(sprites, 600, 0, 400, 200, (canvas.halfWidth - 150), (canvas.halfHieght -75), 300, 150);
                    context.drawImage(sprites, 188, 1738, 75, 75,(canvas.halfWidth + 2), (canvas.halfHieght - 37), 25, 25);
                }else if(players.second.status == "dead"){
                    context.drawImage(sprites, 600, 0, 400, 200, (canvas.halfWidth - 150), (canvas.halfHieght -75), 300, 150);
                    context.drawImage(sprites, 85, 1738, 75, 75,(canvas.halfWidth + 2), (canvas.halfHieght - 37), 25, 25);
                }  
            }
        }
    },
    help:{//Show the instructions
        name: "help",
        update(){
            context.clearRect(0,0, canvas.width, canvas.height);
            context.drawImage(sprites, 0, 1099, 1400, 500,(canvas.halfWidth - 350), (canvas.halfHieght - 125), 700, 250);
        }
    }
}

function drawEveryFrameObjects(){ //Clears the frame, draws the backgorund and characters.
    context.clearRect(0,0, canvas.width, canvas.height);
    //background
    context.drawImage(sprites, 0, 600, 1400, 499,(canvas.halfWidth - 350), (canvas.halfHieght - 125), 700, 250);
    players.first.draw();
    players.second.draw();
}

function drawTimer(){ //Draws the timer when the game start
    let now = Date.now()
    remainingTimer = timerEnd - now;
    if(remainingTimer > 2000 && remainingTimer < 3000){
        context.drawImage(sprites, 1001, 400, 200, 200,(canvas.halfWidth - 50), (canvas.halfHieght - 50), 100, 100);
        context.drawImage(sprites, 291, 1738, 75, 75,(canvas.halfWidth - 26), (canvas.halfHieght - 40), 75, 75);
    }else if(remainingTimer > 1000 && remainingTimer <= 2000){
        context.drawImage(sprites, 1001, 400, 200, 200,(canvas.halfWidth - 50), (canvas.halfHieght - 50), 100, 100);
        context.drawImage(sprites, 188, 1738, 75, 75,(canvas.halfWidth - 26), (canvas.halfHieght - 40), 75, 75);
    }else if(remainingTimer > 0 && remainingTimer <= 1000){
        context.drawImage(sprites, 1001, 400, 200, 200,(canvas.halfWidth - 50), (canvas.halfHieght - 50), 100, 100);
        context.drawImage(sprites, 85, 1738, 75, 75,(canvas.halfWidth - 26), (canvas.halfHieght - 40), 75, 75);
    }else if(remainingTimer > -500 && remainingTimer <= 0){
        context.drawImage(sprites, 1200, 400, 200, 200,(canvas.halfWidth - 50), (canvas.halfHieght - 50), 100, 100);
        context.drawImage(sprites, 1018, 1738, 286, 75,(canvas.halfWidth - 47), (canvas.halfHieght - 11), 95, 25);
    }
}

function changeCurrentScreen(newScreen){ //Changes the current screen, sets the timer and set when the second player will shoot on singleplayer mode.
    audioCtx.resume()
    //prevents gunfire to be double played when the user use two fingers to tap repeatedly
    if(newScreen == currentScreen){
        return
    };
    remainingTimer = null;
    if(newScreen.name == "game"){
        timerEnd = Date.now()+3500;
        //delays the screen change to prevent "autoplay" issue
        setTimeout(() =>{
            countdown.currentTime = 0;
            countdown.play();
            if(mode == "single"){
                let enemyTime = randomIntFromInterval(levels[currentLevel].min, levels[currentLevel].max);
                setTimeout(() => {
                    if(players.second.status != "dead"){
                        players.action(players.second, players.first);
                        setTimeout(changeCurrentScreen, 500, screens.end)
                        //changeCurrentScreen(screens.end);
                    }
                }, 3000 + enemyTime);
            }
        }, 500)       
    }else if(newScreen.name == "end"){
        gunfire.currentTime = 0;
        if(players.first.status == "shooting"){
            panner.pan.value = -0.75;
        }else{
            panner.pan.value = 0.75;
        }
        gunfire.play();
    } else if(newScreen.name == "menu"){
        countdown.pause();
        gunfire.pause();
    }
    currentScreen = newScreen;
}

function randomIntFromInterval(min, max) { //Generates random unmber (min and max included).
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function userInput(X, Y, key){//Receives mouse and touch inputs
    Y -= canvas.offsetTop;
    X -= canvas.offsetLeft;
    if(currentScreen.name == "game"){
        if(mode == "single"){
            if(!sideToBLock(0)) return;
            if(!sideToBLock(canvas.width)) return;
            if(remainingTimer < 0){
                players.action(players.first, players.second);
                changeCurrentScreen(screens.end);
            }
        }else if(mode == "multi"){
            if((X < canvas.halfWidth - 150) || (key == "f" || key == "F")){
                if(!sideToBLock(0)) return;
                if(remainingTimer < 0){
                    players.action(players.first, players.second);
                    changeCurrentScreen(screens.end);
                }
            }else if((X > canvas.halfWidth + 150) || (key == "j" || key == "J")){
                if(!sideToBLock(canvas.width)) return;
                if(remainingTimer < 0){
                    players.action(players.second, players.first);
                    changeCurrentScreen(screens.end);
                }
            }
        }
    }else if(currentScreen.name == "menu"){
        if(X > canvas.halfWidth - 150 && X < canvas.halfWidth && Y > canvas.halfHieght - 75 && Y < canvas.halfHieght + 75){
            mode = "single";
            currentLevel = 0;
            changeCurrentScreen(screens.game);
        }else if(X > canvas.halfWidth && X < canvas.halfWidth + 150 && Y > canvas.halfHieght - 75 && Y < canvas.halfHieght + 75){
            mode = "multi";
            changeCurrentScreen(screens.game);
        }else if(X > canvas.halfWidth - 340 && X  < canvas.halfWidth - 314 && Y > canvas.halfHieght - 105 && Y < canvas.halfHieght - 70){
            changeCurrentScreen(screens.help);
        }
    }else if(currentScreen.name == "end"){
        if((X > canvas.halfWidth - 150 && X < canvas.halfWidth + 150 && Y > canvas.halfHieght - 75 && Y < canvas.halfHieght + 75)){
            if(players.first.status == "dead" || mode == "multi" || currentLevel == 9){
                changeCurrentScreen(screens.menu);
            }else{
                //both players need to be reseted otherwise animations can break when the screen changes before animation end
                players.first.reset();
                players.second.reset();
                currentLevel++;
                changeCurrentScreen(screens.game);
            }
        }
    }else if(currentScreen.name == "help"){
        changeCurrentScreen(screens.menu);
    }
}

function setCanvasSizing(){// Set canvas sizing on start and resize event
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - canvas.offsetTop;
    canvas.halfHieght = canvas.height / 2;
    canvas.halfWidth = canvas.width / 2;
    players.first.positionX = canvas.halfWidth - 350;
    players.first.positionY = players.second.positionY = canvas.height / 2 - 48;
    players.second.positionX = canvas.halfWidth + 254;
}

function unBlockInputLeft(){
    if(blockInputLeft) blockInputLeft = false;
}

function unBlockInputRight(){
    if(blockInputRight) blockInputRight = false;
}

function sideToBLock(X){
    if(X < canvas.halfWidth){
        if(blockInputLeft){
            clearTimeout(unblockInputLeftTimeout);
            unblockInputLeftTimeout = setTimeout(unBlockInputLeft, 500);
            return false
        }else{
            blockInputLeft = true;
            unblockInputLeftTimeout = setTimeout(unBlockInputLeft, 500);
        }
    }else if(X > canvas.halfWidth){
        if(blockInputRight){
            clearTimeout(unblockInputRightTimeout);
            unblockInputRightTimeout = setTimeout(unBlockInputRight, 500);
            return false
        }else{
            blockInputRight = true;
            unblockInputRightTimeout = setTimeout(unBlockInputRight, 500);
        }
    }
    return true
}

//Adds event listener for user inputs and blocks repeated taps
document.addEventListener('touchstart', function(event){
    userInput(event.targetTouches[event.targetTouches.length-1].clientX, event.targetTouches[event.targetTouches.length-1].clientY, null);
});
document.addEventListener('mousedown', function(event){
    userInput(event.clientX, event.clientY, undefined);
});
document.addEventListener('keydown', function (event) {
    userInput(undefined, undefined, event.key);
});
//prevents "ghost" mousedown event after touchstart and longish presses
document.addEventListener('gesturetap', (e) => {
    e.preventDefault();
});

window.addEventListener('resize', setCanvasSizing);

setCanvasSizing();
changeCurrentScreen(screens.menu);
setInterval(() => {//Updates the frames and sets the frame rate.
    currentScreen.update();
}, 100);