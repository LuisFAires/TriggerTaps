const sprites = new Image();
sprites.src = "./img/sprites.png";

const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight - 100;
canvas.width = window.innerWidth;
const context = canvas.getContext("2d");

const screens = { 
    MENU:{
        update(){
            drawEveryFrameObjects();
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
        }, 
        userAction(){
            changeCurrenScreen(screens.GAME);
        }
    },
    GAME:{
        update(){
            context.clearRect(0,0, canvas.width, canvas.height);
            drawEveryFrameObjects();
            if(players.first.status == "standing"){
                players.doWithdraw(players.first);
            }else if(players.first.status == "shooting"){
                players.shoot(players.first);
                players.die(players.second);
            }
            if(players.second.status == "standing"){
                players.doWithdraw(players.second);
            }else if(players.second.status == "shooting"){
                players.shoot(players.second);
                players.die(players.first);
            }
        },
        userAction(player){
            players.shoot(player);
        }
    },
    END:{
        update(){
            context.clearRect(0,0, canvas.width, canvas.height);
        }
    }
}

const players = {
    first:{
        status: "standing",
        name: "First",
        sourceX: 0,
        sourceY: 1,
        sourceWidth: 48,
        sourceHeight: 48,
        positionX: window.innerWidth / 2 - 350,
        positionY: window.innerHeight / 2,
        sizeX: 96,
        sizeY: 96,
        draw(){
            players.first.positionX = window.innerWidth / 2 - 350;
            players.first.positionY = window.innerHeight / 2;
            context.drawImage(
                sprites,
                players.first.sourceX, players.first.sourceY, //Posição inicio
                players.first.sourceWidth, players.first.sourceHeight, //Tamanho recorte
                players.first.positionX, players.first.positionY - players.first.sizeY, //Posição impressão
                players.first.sizeX, players.first.sizeY //Tamanho da impressão
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
        sourceWidth: 48,
        sourceHeight: 48,
        positionX: window.innerWidth / 2 + 350,
        positionY: window.innerHeight / 2,
        sizeX: 96,
        sizeY: 96,
        draw(){
            players.second.positionX = window.innerWidth / 2 + 350;
            players.second.positionY = window.innerHeight / 2;
            context.drawImage(
                sprites,
                players.second.sourceX, players.second.sourceY, //Posição inicio
                players.second.sourceWidth, players.second.sourceHeight, //Tamanho recorte
                players.second.positionX - players.second.sizeX, players.second.positionY - players.second.sizeY, //Posição impressão
                players.second.sizeX, players.second.sizeY //Tamanho da impressão
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
    shoot(player){
        if(player.status == "withdraw"){
            player.status = "shooting";
            player.sourceX = 0;
            player.sourceY += 97;
        }else if(player.status == "shooting" && player.sourceX < 192){
            player.sourceX +=48;
        }else if(player.status == "shooting"){
            player.sourceX += 96;
            player.sourceY -= 97;
            player.status = "withdraw";
            players.undoWithdraw(player);
        }else{
            console.log(player.name+" player can't shoot.\nPlayer status: "+player.status);
        }
    },
    die(player){
        if(player.status == "withdraw"){
            player.status = "dead";
            player.sourceX = 0;
            player.sourceY += 193 
        }else if(player.sourceX < 192){
            player.sourceX += 48;
        }else{
            console.log(player.name+" player can't die.\nPlayer status: "+player.status);
        }
    }
}

function drawEveryFrameObjects(){
    context.clearRect(0,0, canvas.width, canvas.height);
    drawBackground();
    players.first.draw();
    players.second.draw();
}

var currentScreen;
function changeCurrenScreen(newScreen){
    currentScreen = newScreen;
}

function drawBackground(){
    context.drawImage(sprites, 0, 288, 700, 230,(canvas.width / 2 - 350), (canvas.height / 2 - 130), 700, 230)
}

function loop(){
    requestAnimationFrame(loop);
}

changeCurrenScreen(screens.MENU);
var updateInterval = setInterval(() => { 
    //console.log("player1\nX: "+players.first.sourceX+"\n"+"Y: "+players.first.sourceY+"\nplayer2\nX: "+players.second.sourceX+"\n"+"Y: "+players.second.sourceY);
    currentScreen.update();
}, 100);
loop();

document.addEventListener('keydown', function(event){
	if(event.key === " "){
        if(currentScreen.userAction){
		    currentScreen.userAction(players.first);
        }
    }else if(event.key === "Escape"){
        changeCurrenScreen(screens.MENU);
	}
});

document.addEventListener('click', function(event){
		    currentScreen.userAction(players.second);
});

window.addEventListener('resize', function(event) {
    canvas.height = window.innerHeight - 100;
    canvas.width = window.innerWidth;
}, true);