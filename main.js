const sprites = new Image();
sprites.src = "./img/sprites.png";

const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight - 100;
canvas.width = window.innerWidth;
const context = canvas.getContext("2d");

const players = {
    first:{
        status: "standing",
        name: "First",
        sourceX: 0,
        sourceY: 1,
        positionX: window.innerWidth / 2 - 350,
        positionY: window.innerHeight / 2 - 96,
        draw(){
            players.first.positionX = window.innerWidth / 2 - 350;
            players.first.positionY = window.innerHeight / 2 - 96;
            context.drawImage(
                sprites,
                players.first.sourceX, players.first.sourceY, //Posição inicio
                48, 48, //Tamanho recorte
                players.first.positionX, players.first.positionY, //Posição impressão
                96, 96 //Tamanho da impressão
            );
        },
        reset(){
            players.first.status = "standing";
            players.first.sourceX = 0;
            players.first.sourceY = 1;
        }
    },
    second:{
        status: "standing",
        name: "Second",
        sourceX: 0,
        sourceY: 49,
        positionX: window.innerWidth / 2 + 350,
        positionY: window.innerHeight / 2,
        draw(){
            players.second.positionX = window.innerWidth / 2 + 254;
            players.second.positionY = window.innerHeight / 2 - 96;
            context.drawImage(
                sprites,
                players.second.sourceX, players.second.sourceY, //Posição inicio
                48, 48, //Tamanho recorte
                players.second.positionX , players.second.positionY, //Posição impressão
                96, 96 //Tamanho da impressão
            );
        },
        reset(){
            players.second.status = "standing";
            players.second.sourceX = 0;
            players.second.sourceY = 49;
        }
    },
    doWithdraw(player){
        if(player.status == "standing"){
            if(player.sourceX < 240){
                player.sourceX += 48;
            }else{
                player.status = "withdraw";
            }
        }else{
            console.log(player.name+" player can't withdraw.\nPlayer status: "+player.status);
        }
    },
    undoWithdraw(player){
        if(player.status == "withdraw"){
            if(player.sourceX > 0){
                player.sourceX -= 48;
            }else{
                player.reset();
            }
        }else{
            console.log(player.name+" player can't undo withdraw.\nPlayer status: "+player.status);
        }
    },
    shoot(shooter){
        if(remaingTimer > 0){
            return;
        }else if(shooter.status == "withdraw"){
            shooter.status = "shooting";
            shooter.sourceX = 0;
            shooter.sourceY += 97;
        }else if(shooter.status == "shooting" && shooter.sourceX < 192){
            shooter.sourceX +=48;
        }else if(shooter.status == "shooting"){
            shooter.sourceX += 48;
            shooter.sourceY -= 97;
            shooter.status = "withdraw";
        }else{
            console.log(shooter.name+" player can't shoot.\nPlayer status: "+shooter.status);
        }
    },
    die(dead){
        if(remaingTimer > 0){
            return;
        }else if(dead.status == "withdraw"){
            dead.status = "dead";
            changeCurrenScreen(screens.end);
            dead.sourceX = 0;
            dead.sourceY += 193 
        }else if(dead.sourceX < 192){
            dead.sourceX += 48;
        }else{
            console.log(dead.name+" player can't die.\nPlayer status: "+dead.status);
        }
    },
    action(shooter, dead){
        this.shoot(shooter);
        this.die(dead);
    }
}

const screens = { 
    menu:{
        name: "menu",
        update(){
            drawEveryFrameObjects();
            //draw buttons and put both players to standing status
            context.drawImage(sprites, 289, 0, 144, 48,(canvas.width / 2 - 144), (canvas.height / 2 -48),288,96)
            if(players.first.status == "withdraw"){
                players.undoWithdraw(players.first)
            }else{
                players.first.reset()
            }
            if(players.second.status == "withdraw"){
                players.undoWithdraw(players.second)
            }else{
                players.second.reset();
            }
        }
    },
    game:{
        name: "game",
        update(){
            drawEveryFrameObjects();
            drawEveryGameUpdate();
        },
    },
    end:{
        name: "end",
        update(){
            drawEveryFrameObjects();
            drawEveryGameUpdate();
            if(mode == "single"){
                if(players.first.status == "dead"){
                    context.drawImage(sprites, 433, 96, 144, 48,(canvas.width / 2 - 144), (canvas.height / 2 -48),288,96)
                }else if(players.second.status == "dead"){
                    context.drawImage(sprites, 289, 96, 144, 48,(canvas.width / 2 - 144), (canvas.height / 2 -48),288,96)
                }
            }else if(mode == "multi"){
                if(players.first.status == "dead"){
                    context.drawImage(sprites, 433, 48, 144, 48,(canvas.width / 2 - 144), (canvas.height / 2 -48),288,96)
                }else if(players.second.status == "dead"){
                    context.drawImage(sprites, 289, 48, 144, 48,(canvas.width / 2 - 144), (canvas.height / 2 -48),288,96)
                }  
            }
        }
    }
}

var currentScreen;
changeCurrenScreen(screens.menu);
var mode;
var then;
var now;
var remaingTimer;
var player2Time;

function drawEveryFrameObjects(){
    context.clearRect(0,0, canvas.width, canvas.height);
    //background
    context.drawImage(sprites, 0, 288, 700, 230,(canvas.width / 2 - 350), (canvas.height / 2 - 130), 700, 230);
    players.first.draw();
    players.second.draw();
}

function drawEveryGameUpdate(){
    if(players.first.status == "standing"){
        players.doWithdraw(players.first);
    }
    if(players.second.status == "standing"){
        players.doWithdraw(players.second);
    }
    if(players.first.status == "shooting"){
        players.action(players.first, players.second);
    }else if(players.second.status == "shooting"){
        players.action(players.second, players.first);
    }
    drawTimer();
}

function drawTimer(){
    now = Date.now()
    remaingTimer = then - now;
    if(remaingTimer > 2000){
        context.drawImage(sprites, 289, 144, 48, 48,(canvas.width / 2 - 24), (canvas.height / 2 - 24), 48, 48)
    }else if(remaingTimer > 1000){
        context.drawImage(sprites, 337, 144, 48, 48,(canvas.width / 2 - 24), (canvas.height / 2 - 24), 48, 48)
    }else if(remaingTimer > 0){
        context.drawImage(sprites, 385, 144, 48, 48,(canvas.width / 2 - 24), (canvas.height / 2 - 24), 48, 48)
    }else if(remaingTimer > -500){
        context.drawImage(sprites, 433, 144, 48, 48,(canvas.width / 2 - 24), (canvas.height / 2 - 24), 48, 48)
    }
    if(remaingTimer > -500){
        //console.log(remaingTimer);
    }
}

function changeCurrenScreen(newScreen){
    currentScreen = newScreen;
    if(currentScreen.name == "game"){
        then = Date.now()+3000;
        if(mode == "single"){
            player2Time = randomIntFromInterval(-500, -100)
            setTimeout(() => {
                if(players.second.status != "dead"){
                    players.action(players.second, players.first);
                }
            }, 3000 - (player2Time));
        }
    }else if(currentScreen.name == "menu"){
        mode = null;
    }
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

var updateInterval = setInterval(() => { 
    //console.log("player1\nX: "+players.first.sourceX+"\n"+"Y: "+players.first.sourceY+"\nplayer2\nX: "+players.second.sourceX+"\n"+"Y: "+players.second.sourceY);
    //console.log(currentScreen.name);
    //console.log("first: "+players.first.status+"\nsecond: "+players.second.status);
    currentScreen.update();
}, 100);

document.addEventListener('keydown', function(event){
	if(currentScreen.name == "game"){
        if(mode == "single"){
            if(event.key == " "){
                players.action(players.first, players.second);
            }
        }else if(mode == "multi"){
            if(event.key == "f"){
                console.log(event.key);
                players.action(players.first, players.second);
            }else if(event.key == "j"){
                console.log(event.key);
                players.action(players.second, players.first);
            }
        }
    }
    if(event.key == "Escape"){
        changeCurrenScreen(screens.menu);
	}
});

document.addEventListener('mousedown', function(event){
    if(currentScreen.name == "menu"){
        if(event.clientX < window.innerWidth / 2){
            console.log("1 player");
            mode = "single";
            changeCurrenScreen(screens.game);
        }else{
            console.log("2 players");
            mode = "multi";
            changeCurrenScreen(screens.game);
        }
    }else if(currentScreen.name == "game"){
        if(mode == "single"){
            players.action(players.first, players.second);
        }else if(mode == "multi"){
            if(event.clientX < window.innerWidth / 2){
                players.action(players.first, players.second);
            }else{
                players.action(players.second, players.first);
            }
        }
    }if(currentScreen.name == "end"){
        //changeCurrenScreen(screens.menu);
    }
});

window.addEventListener('resize', function(event) {
    canvas.height = window.innerHeight - 100;
    canvas.width = window.innerWidth;
}, true);