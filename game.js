//This file is responsible for everything that happens inside of the canvas tag

const sprites = new Image()
sprites.src = "./img/sprites.webp"

const gunfire = new Audio()
gunfire.src = "./sound/gunfire.mp3"

const countdown = new Audio()
countdown.src = "./sound/countdown.mp3"

const gameFont = new FontFace("game", "url(PixelOperator-Bold.ttf)");
document.fonts.add(gameFont);
gameFont.load()
let fontLoaded = false
document.fonts.onloadingdone = () => {
    fontLoaded = true
}

const canvas = document.querySelector('canvas')
const context = canvas.getContext("2d")
context.textAlign = "center"

let currentScreen
let mode
let remainingTimer
let currentLevel = 0
let timerUpdateInterval
let frameUpdateInterval
let playersUpdateInterval
let canvasBoudingsTimeout
let physicalKeyboard
let touchPressed = false
let touchEventHasBeenTriggered = false
let cookieExpires = new Date()
cookieExpires.setFullYear(cookieExpires.getFullYear() + 1)
cookieExpires = cookieExpires.toUTCString()

let gameAssetsLoaded
let checkAssetsInterval = setInterval(() => {
    if (gunfire.readyState === 4 && countdown.readyState === 4 && sprites.complete === true && fontLoaded === true) {
        gameAssetsLoaded = true
        clearInterval(checkAssetsInterval)
    }
})

async function initializeGame() {
    if (gameAssetsLoaded) {

        let keyboard = {}
        try {
            keyboard = await navigator.keyboard.getLayoutMap()
        } catch {
            keyboard.size = 1
        }
        physicalKeyboard = keyboard.size == 0 ? false : true

        changeCurrentScreen(screens.menu)

        canvas.addEventListener('touchstart', function (event) {
            touchPressed = true
            userInput(event.targetTouches[event.targetTouches.length - 1].clientX, event.targetTouches[event.targetTouches.length - 1].clientY)
        });
        canvas.addEventListener('touchend', function () {
            touchPressed = false
            touchEventHasBeenTriggered = true
        });
        canvas.addEventListener('mousedown', function (event) {
            if (touchEventHasBeenTriggered) {
                touchEventHasBeenTriggered = false
                return
            }
            userInput(event.clientX, event.clientY)
        });
        window.addEventListener('keydown', function (event) {
            userInput(undefined, undefined, event.key)
        });
        return
    }
    setTimeout(initializeGame)
}

async function userInput(X, Y, key = undefined) {
    let boundingClientRect = canvas.getBoundingClientRect()
    X -= boundingClientRect.x
    Y -= boundingClientRect.y
    let leftSideinput
    let rightSideinput
    if (X < 125 || (mode == "single" && key != undefined) || ((mode == "multi") && (key == "f" || key == "F"))) leftSideinput = true
    if (mode == "multi" && (X > 525 || key == "j" || key == "J")) rightSideinput = true
    if (currentScreen.name == "game") {
        if (leftSideinput && !isPlayerAlreadyStuck(players.first) && remainingTimer <= 0 && players.first.status != "dead") {
            players.first.reactionTime = -remainingTimer
            players.action(players.first, players.second)
            changeCurrentScreen(screens.end)
            return
        }
        if (rightSideinput && !isPlayerAlreadyStuck(players.second) && remainingTimer <= 0 && players.second.status != "dead") {
            players.second.reactionTime = -remainingTimer
            players.action(players.second, players.first)
            changeCurrentScreen(screens.end)
            return
        }
        return
    }
    if (currentScreen.name == "end") {
        if (leftSideinput && !players.first.reactionTime && !players.first.stuck) {
            players.first.reactionTime = -remainingTimer
            currentScreen.update()
            return
        }
        if (rightSideinput && !players.second.reactionTime && !players.second.stuck) {
            players.second.reactionTime = -remainingTimer
            currentScreen.update()
            return
        }
        if (remainingTimer >= -500) return
        if ((X > 125 && X < 525 && Y > 50 && Y < 200) || key != undefined) {
            if (players.first.status == "dead" && mode == "single") {
                try {
                    gtag('event', 'wasted')
                } catch { }
            }
            if (players.second.status == "dead" && currentLevel == 9) {
                try {
                    gtag('event', `lvl10completed`)
                } catch { }
            }
            if (mode == "multi") {
                if (players.first.status == "dead") {
                    try {
                        gtag('event', 'player2won')
                    } catch { }
                } else {
                    try {
                        gtag('event', 'player1won')
                    } catch { }
                }
            }
            if (players.first.status == "dead" || mode == "multi" || currentLevel == 9) {
                changeCurrentScreen(screens.menu)
                return
            }
            currentLevel++
            try {
                gtag('event', `lvl${currentLevel}completed`)
            } catch { }
            changeCurrentScreen(screens.game)
            return
        }
        if ((X > 125 && X < 525 && Y > 205 && Y < 245) && currentLevel == 9 && players.first.status != "dead") {
            let name = window.prompt(lang.achievementPrompt)
            try {
                gtag('event', 'achievementGenerated')
            } catch { }
            if (name != null && name != "" && name.length < 40) {
                let data = new FormData()
                data.append('encrypt', name)
                let response = await fetch(location.origin + "/achievement/generate.php", { method: 'POST', body: data })
                response = await response.json()
                result = encodeURIComponent(response.result)
                document.cookie = `achievement=${result};expires=${cookieExpires};`
                location.href = "/achievement"
                return
            }
            window.alert(lang.invalid)
        }
        return
    }
    if (currentScreen.name == "menu") {
        if ((X > 125 && X < 325 && Y > 50 && Y < 200) || (key == "f" || key == "F")) {
            mode = "single"
            await waitForInteractionLeave()
            changeCurrentScreen(screens.game)
            return
        }
        if ((X > 325 && X < 525 && Y > 50 && Y < 200) || (key == "j" || key == "J")) {
            mode = "multi"
            await waitForInteractionLeave()
            changeCurrentScreen(screens.game)
            return
        }
        if ((X > 0 && X < 100 && Y > 0 && Y < 80) || (key == "h" || key == "H")) {
            location.hash = ""
            location.hash = "#article"
            return
        }
        if (X > 550 && X < 650 && Y > 0 && Y < 80) {
            await waitForInteractionLeave()
            try {
                gtag('event', 'shareFromMenu')
            } catch { }
            let dataToShare = {
                title: document.title,
                text: lang.description,
                url: location.origin + "/?lang=" + lang.currentLang
            }
            if (navigator.canShare(dataToShare)) {
                navigator.share(dataToShare)
            } else {
                window.open(location.origin, '_blank')
            }
            return
        }
        if ((X > 125 && X < 525 && Y > 205 && Y < 245) && getCookie("achievement") != '') {
            location.href = "/achievement"
        }
        return
    }
    changeCurrentScreen(screens.menu)
}

const players = {
    first: {
        status: "standing",
        sourceX: 0,
        sourceY: 0,
        positionX: 25,
        initialsourceY: 0,
        moving: false,
        stuck: false,
        unstuckTimeout: undefined,
        reactionTime: undefined
    },
    second: {
        status: "standing",
        sourceX: 0,
        sourceY: 100,
        positionX: 525,
        initialsourceY: 100,
        moving: false,
        stuck: false,
        unstuckTimeout: undefined,
        reactionTime: undefined
    },
    draw(player) {
        context.drawImage(
            sprites,
            player.sourceX, player.sourceY, //Sprite start position
            100, 100, //Sprite size
            player.positionX, 75, //On frame position
            100, 100 //On frame size
        )
    },
    reset(player) {
        player.status = "standing"
        player.sourceX = 0
        player.sourceY = player.initialsourceY
        player.moving = false
        player.stuck = false
        player.reactionTime = undefined
    },
    doWithdraw(player) {
        if (player.status == "standing") {
            if (player.sourceX != 500) {
                player.sourceX += 100
                player.moving = true
                return
            }
            player.status = "withdraw"
            player.moving = false
        }
    },
    undoWithdraw(player) {
        if (player.status == "withdraw") {
            if (player.sourceX != 0) {
                player.sourceX -= 100
                player.moving = true
                return
            }
            player.status = "standing"
            player.moving = false
        }
    },
    shoot(shooter) {
        if (shooter.status == "withdraw" || shooter.status == "standing") {
            shooter.status = "shooting"
            shooter.sourceX = 0
            shooter.sourceY += 200
            shooter.moving = true
            return
        } else if (shooter.status == "shooting" && shooter.moving) {
            shooter.sourceX += 100
            if (shooter.sourceX == 400) {
                shooter.sourceX += 100
                shooter.sourceY -= 200
                shooter.status = "withdraw"
                shooter.moving = false
            }
        }
    },
    die(dead) {
        if (dead.status == "withdraw" || dead.status == "standing") {
            dead.status = "dead"
            dead.sourceX = 0
            dead.sourceY += 400
            dead.moving = true
            return
        }
        if (dead.status == "dead" && dead.moving) {
            dead.sourceX += 100
            if (dead.sourceX == 400) dead.moving = false
        }
    },
    action(shooter, dead) {//Calls the shoot and die functions together so they do not conflict each other.
        players.shoot(shooter)
        players.die(dead)
    }
}

const levels = [
    { min: 270, max: 500 },//1
    { min: 225, max: 270 },//2
    { min: 185, max: 225 },//3
    { min: 150, max: 185 },//4
    { min: 120, max: 150 },//5
    { min: 95, max: 120 },//6
    { min: 75, max: 95 },//7
    { min: 60, max: 75 },//8
    { min: 50, max: 60 },//9
    { min: 40, max: 45 }//10
]

const screens = {
    game: {
        name: "game",
        update() {
            drawables.EveryFrameObjects()
            drawables.Timer()
            context.font = "24px game"
            context.fillStyle = "#5e4700"
            if (mode == "single"){
                context.fillText(lang.lvl + (currentLevel + 1), 325, 215)
            }
            if (players.first.stuck) {
                drawables.StuckMsg()
                context.fillText(lang.stuck, 75, 75)
            } else {
                context.fillStyle = "#000000"
                context.fillText((mode == "single" ? lang.you : lang.player + " 1"), 75, 75)
            }
            if (players.second.stuck) {
                drawables.StuckMsg()
                context.fillText(lang.stuck, 575, 75)
            } else {
                context.fillStyle = "#000000"
                context.fillText((mode == "single" ? lang.enemy : lang.player + " 2"), 575, 75)
            }
            if (mode == "single" && !players.first.stuck && remainingTimer <= 0 && parseInt(remainingTimer / 150) % 2 == 0) {
                context.drawImage(sprites, 500, 200, 100, 100, 40, 120, 80, 80)
            }
        },
        onchange() {
            clearInterval(timerUpdateInterval)
            clearInterval(frameUpdateInterval)
            clearInterval(playersUpdateInterval)
            players.reset(players.first)
            players.reset(players.second)
            countdown.currentTime = 0
            countdown.play()
            let timerEnd = Date.now() + 3000
            remainingTimer = 3000
            currentScreen.update()
            setTimeout(() => {
                remainingTimer = 2000
                currentScreen.update()
            }, 1000)
            setTimeout(() => {
                remainingTimer = 1000
                currentScreen.update()
            }, 2000)
            setTimeout(() => {
                timerUpdateInterval = setInterval(() => {
                    remainingTimer = timerEnd - Date.now()
                })
                frameUpdateInterval = setInterval(() => {
                    currentScreen.update()
                }, 16)
                playersUpdateInterval = setInterval(() => {
                    if (remainingTimer < 100) {
                        if (!players.first.stuck) players.doWithdraw(players.first)
                        if (!players.second.stuck) players.doWithdraw(players.second)
                    }
                }, 30)
            }, 2850)
            if (mode == "single" && (currentLevel != 0 || getCookie("tutorial") != "")) {
                let enemyTrigger = randomIntFromInterval(levels[currentLevel].min, levels[currentLevel].max)
                setTimeout(() => {
                    players.second.reactionTime = -remainingTimer
                    if (players.second.status != "dead") {
                        players.action(players.second, players.first)
                        changeCurrentScreen(screens.end)
                    }
                }, 3000 + enemyTrigger)
            }
            return
        }
    },
    end: {
        name: "end",
        update() {
            document.cookie = `tutorial=done;expires=${cookieExpires};`
            drawables.EveryFrameObjects()
            let stuckReaction = ((players.first.stuck && players.first.reactionTime == undefined) || (players.second.stuck && players.second.reactionTime == undefined))
            if (players.first.moving == false && players.second.moving == false) {
                clearInterval(frameUpdateInterval)
                clearInterval(playersUpdateInterval)
                clearInterval(timerUpdateInterval)
                if (stuckReaction) drawables.StuckMsg()
            }
            if (stuckReaction && parseInt(remainingTimer / 50) % 2 != 0) drawables.StuckMsg()
            context.fillStyle = "#fff"
            context.fillRect(125, 50, 400, 150)
            context.fillStyle = "#5e4700"
            context.fillRect(130, 55, 390, 140)
            context.fillStyle = "#fff"
            context.font = "25px game"
            if (mode == "single") {
                if (currentLevel != 9 || players.first.status == "dead") {
                    context.fillText((players.first.status == "dead" ? lang.wasted : lang.lvl + (currentLevel + 1) + lang.completed), 325, 95)
                    context.fillText(lang.taphere, 325, 125)
                } else {
                    context.font = "30px game"
                    context.fillText(lang.gameCompleted1, 325, 85)
                    context.fillText(lang.gameCompleted2, 325, 115)
                    context.fillText(lang.gameCompleted3, 325, 140)
                    let colorsSwitch = parseInt(remainingTimer / 50) % 2 == 0 ? true : false
                    context.fillStyle = (colorsSwitch ? "#fff" : "#5e4700")
                    context.fillRect(125, 205, 400, 40)
                    context.fillStyle = (colorsSwitch ? "#5e4700" : "#fff")
                    context.fillRect(130, 210, 390, 30)
                    context.fillStyle = (colorsSwitch ? "#fff" : "#5e4700")
                    context.fillText(lang.shareAchievement, 325, 233)
                }
                context.font = "16px game"
                context.fillStyle = "#fff"
                if (players.first.stuck && players.first.reactionTime == undefined) {
                    context.fillText(lang.you + lang.wasStuck, 325, 160)
                } else if (players.first.reactionTime >= 0) {
                    context.fillText(lang.yourReaction + players.first.reactionTime + "ms", 325, 160)
                }
                if (players.second.reactionTime >= 0) {
                    context.fillText(lang.enemyReaction + players.second.reactionTime + "ms", 325, 180)
                }
            } else {
                context.fillText((players.first.status == "dead" ? lang.won2 : lang.won1), 325, 95)
                context.fillText(lang.taphere, 325, 125)
                context.font = "16px game"
                if (players.first.stuck && players.first.reactionTime == undefined) {
                    context.fillText(lang.player + " 1" + lang.wasStuck, 325, 160)
                } else if (players.first.reactionTime >= 0) {
                    if (players.first.status == "dead" && players.first.reactionTime == players.second.reactionTime) {
                        players.first.reactionTime += randomIntFromInterval(0, 5);
                    }
                    context.fillText(lang.reaction1 + players.first.reactionTime + "ms", 325, 160)
                }
                if (players.second.stuck && players.second.reactionTime == undefined) {
                    context.fillText(lang.player + " 2 " + lang.wasStuck, 325, 180)
                } else if (players.second.reactionTime >= 0) {
                    if (players.second.status == "dead" && players.first.reactionTime == players.second.reactionTime) {
                        players.second.reactionTime += randomIntFromInterval(0, 5);
                    }
                    context.fillText(lang.reaction2 + players.second.reactionTime + "ms", 325, 180)
                }
            }
        },
        onchange() {
            clearInterval(playersUpdateInterval)
            playersUpdateInterval = setInterval(() => {
                if (players.first.status == "shooting") {
                    players.action(players.first, players.second)
                } else if (players.second.status == "shooting") {
                    players.action(players.second, players.first)
                }
                if (players.first.status == "withdraw") {
                    players.undoWithdraw(players.first)
                }
                if (players.second.status == "withdraw") {
                    players.undoWithdraw(players.second)
                }
            }, 80)
            if (players.first.stuck && players.first.reactionTime == undefined) clearTimeout(players.first.unstuckTimeout)
            if (players.second.stuck && players.second.reactionTime == undefined) clearTimeout(players.second.unstuckTimeout)
            gunfire.currentTime = 0
            gunfire.play()
            return
        }
    },
    menu: {
        name: "menu",
        update() {
            drawables.EveryFrameObjects()
            context.fillStyle = "#000000"
            context.drawImage(sprites, 500, 400, 100, 100, 35, 25, 45, 45)
            context.font = "50px game"
            context.fillText("?", 85, 63)
            context.drawImage(sprites, 500, 300, 100, 100, 565, 25, 55, 55)
            context.fillStyle = "#fff"
            context.fillRect(125, 50, 400, 150)
            context.fillStyle = "#5e4700"
            context.fillRect(130, 55, 190, 140)
            context.fillRect(330, 55, 190, 140)
            context.fillStyle = "#fff"
            context.font = "37px game"
            context.fillText("1", 225, 120)
            context.fillText("2", 425, 120)
            context.fillText(lang.player, 225, 150)
            context.fillText(lang.players, 425, 150)
            if (physicalKeyboard) {
                context.font = "16px  game"
                context.fillText(lang.press + " F", 225, 170)
                context.fillText(lang.press + " J", 425, 170)
                context.fillStyle = "#000000"
                context.fillText(lang.press + " H", 65, 75)
            }
            if (getCookie("achievement") != '') {
                context.font = "30px game"
                context.fillStyle = "#fff"
                context.fillRect(125, 205, 400, 40)
                context.fillStyle = "#5e4700"
                context.fillRect(130, 210, 390, 30)
                context.fillStyle = "#fff"
                context.fillText(lang.shareAchievement, 325, 233)
            }
        },
        onchange() {
            //both players need to be reseted
            //otherwise animations can break
            players.reset(players.first)
            players.reset(players.second)
            //intervals need to be cleared
            //otherwise it can generate unneeded CPU usage
            clearInterval(frameUpdateInterval)
            clearInterval(playersUpdateInterval)
            clearInterval(timerUpdateInterval)
            countdown.pause()
            gunfire.pause()
            currentScreen.update()
        }
    }
}

const drawables = {
    EveryFrameObjects() { //Backgorund and both characters.
        context.clearRect(0, 0, 650, 250)
        context.fillStyle = "#deb887"
        context.fillRect(0, 0, 650, 250)
        context.drawImage(sprites, 0, 600, 455, 229, 100, 10, 455, 229)
        players.draw(players.first)
        players.draw(players.second)
    },
    Timer() {
        if (remainingTimer <= -1000) return
        context.beginPath()
        context.arc(325, 125, 50, 0, Math.PI * 2)
        context.closePath()
        if (remainingTimer <= 0) {
            context.fillStyle = "#f00"
            context.fill()
            context.fillStyle = "#fff"
            context.font = "30px game"
            context.fillText(lang.shoot, 325, 135)
            return
        }
        context.fillStyle = "#000"
        context.fill()
        context.fillStyle = "#fff"
        context.font = "140px game"
        if (remainingTimer <= 1000) {
            context.fillText("1", 325, 163)
            return
        }
        if (remainingTimer <= 2000) {
            context.fillText("2", 325, 163)
            return
        }
        if (remainingTimer <= 3000) {
            context.fillText("3", 325, 163)
            return
        }
    },
    StuckMsg() {
        context.fillStyle = "#fff"
        context.font = "23px game"
        context.fillText(lang.stuckMsg, 325, 25)
    }
}

async function changeCurrentScreen(newScreen) {
    if (newScreen == currentScreen) return
    currentScreen = newScreen
    await newScreen.onchange()
    newScreen.update()
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function isPlayerAlreadyStuck(player) {
    if (player.stuck) {
        clearTimeout(player.unstuckTimeout)
        player.unstuckTimeout = setTimeout(unstuckPlayer, 1500, player)
        return true
    }
    player.stuck = true
    setTimeout(() => {
        currentScreen.update()
    }, 50);
    player.unstuckTimeout = setTimeout(unstuckPlayer, 1500, player)
    return false
}

function unstuckPlayer(player) {
    player.stuck = false
    if (currentScreen.name == "game") currentScreen.update()
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (c of ca) {
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function waitForInteractionLeave() {
    return new Promise(checkPress = (r) => {
        if (touchPressed) {
            setTimeout(() => {
                checkPress(r)
            })
        } else {
            r()
        }
    })
}