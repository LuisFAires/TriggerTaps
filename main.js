const sprites = new Image();
sprites.src = "./img/sprites.png";

const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight - 100;
canvas.width = window.innerWidth;
const context = canvas.getContext("2d");

const player1 = {
    sourceX: 0,
    sourceY: 0,
    sourceWidth: 48,
    sourceHeight: 48,
    positionX: window.innerWidth / 2 - 350,
    positionY: window.innerHeight / 2,
    sizeX: 96,
    sizeY: 96,
    draw(){
        context.drawImage(
            sprites,
            player1.sourceX, player1.sourceY, //Posição inicio
            player1.sourceWidth, player1.sourceHeight, //Tamanho recorte
            player1.positionX, player1.positionY - player1.sizeY, //Posição impressão
            player1.sizeX, player1.sizeY //Tamanho da impressão
        );
    }
}

const player2 = {
    sourceX: 0,
    sourceY: 48,
    sourceWidth: 48,
    sourceHeight: 48,
    positionX: window.innerWidth / 2 + 350,
    positionY: window.innerHeight / 2,
    sizeX: 96,
    sizeY: 96,
    draw(){
        context.drawImage(
            sprites,
            player2.sourceX, player2.sourceY, //Posição inicio
            player2.sourceWidth, player2.sourceHeight, //Tamanho recorte
            player2.positionX - player2.sizeX, player2.positionY - player2.sizeY, //Posição impressão
            player2.sizeX, player2.sizeY //Tamanho da impressão
        );
    }
}

function loop(){
    player1.draw();
    player2.draw();

    requestAnimationFrame(loop);
}

loop();