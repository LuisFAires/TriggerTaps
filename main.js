/*
This file is responsible for everything that happens out side of canvas tag

Every time that the canvas is moved the X and Y cordinates must be refreshed by calling setCanvasBoundings()
*/

loadingOverlay.innerText = lang.loading
rotateOverlay.innerText = lang.rotate

const gameArea = document.querySelector("canvas")
const upper = document.getElementById("upper")
const left = document.getElementById("left")
const center = document.getElementById("center")
const right = document.getElementById("right")
const promotion = document.getElementById("promotion")

let afterResizeTimeout
let lastWidth
let lastHeigth
let lastPrompt = 0
let lastAdUpdate = 0
let deferredPrompt

let showPromotion

const touchDevice = navigator.maxTouchPoints > 0 ? true : false

let deviceOS
if (/iPad|iPhone|iPod/.test(window.navigator.userAgent)) {
    deviceOS = "IOS"
} else if (/Macintosh|Mac|Mac OS|MacIntel|MacPPC|Mac68K/gi.test(window.navigator.userAgent)) {
    deviceOS = "Mac"
} else if (/Win32|Win64|Windows|Windows NT|WinCE/gi.test(window.navigator.userAgent)) {
    deviceOS = "Win"
} else if (/Android/gi.test(window.navigator.userAgent)) {
    deviceOS = "Android"
} else if (/Linux/gi.test(window.navigator.userAgent)) {
    deviceOS = "Linux"
}

function showRotateOverlay() {
    rotateOverlay.style.display = (window.innerWidth > window.innerHeight || !touchDevice) ? "none" : "flex"
}

async function promotionAction(os, url, openStore) {
    if (deviceOS === os) {
        location.href = openStore
    }
    if (deferredPrompt != undefined) {
        let outcome = await installPrompt()
        if (outcome) return
    }
    location.href = url
}

async function fullscreenLock() {
    if (!touchDevice) return
    if (document.fullscreenElement === null) {
        await waitForInteractionLeave()
        try {
            await document.documentElement.requestFullscreen()
            try {
                await screen.orientation.lock("landscape")
            } catch {
                console.log("unable to get orientation locked")
            }
        } catch {
            //console.log("unable to get fullscreen")
        }
    }
    waitForUserInteraction(document, ["touchstart", "mousedown"], fullscreenLock, true)
}

async function installPrompt() {
    await waitForInteractionLeave()
    deferredPrompt.prompt()
    lastPrompt = new Date()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome == "accepted") {
        try {
            gtag('event', 'install')
        } catch { }
    }
    return outcome === "accepted"
}

function waitForUserInteraction(element, interactions, callback = undefined, keyboard = false) {
    return new Promise((resolve) => {
        function triggeredEvent() {
            for (interaction of interactions) {
                element.removeEventListener(interaction, triggeredEvent)
            }
            if (keyboard) document.removeEventListener("keydown", triggeredEvent)
            if (callback) callback()
            resolve()
        }
        for (interaction of interactions) {
            element.addEventListener(interaction, triggeredEvent)
        }
        if (keyboard) document.addEventListener("keydown", triggeredEvent)
    })
}

function calculateDivs() {
    //set external divs size
    if (loadingOverlay.style.display != "none") return
    if (rotateOverlay.style.display != "none") return
    if (lastHeigth === window.innerHeight && lastWidth === window.innerWidth) return
    if (touchDevice && document.fullscreenElement === null) return

    let sideDivWidth = (bottom.clientWidth - center.clientWidth) / 2
    left.style.width = right.style.width = (sideDivWidth >= 0 ? sideDivWidth : 0) + "px"

    promotion.style.display = (window.innerHeight >= gameArea.height + 50 && showPromotion) ? "flex" : "none"

    //Bottom row divs must have zero height so the upper div height can be evaluated without intervention when screen is downsized
    left.style.height = center.style.height = right.style.height = 0

    if (window.innerHeight >= (showPromotion ? 350 : 300)) {
        upper.style.height = (window.innerHeight - (showPromotion ? 300 : 250)) + "px"
    } else {
        upper.style.height = 0
    }

    left.style.height = center.style.height = right.style.height = window.innerHeight - upper.clientHeight + "px"

    lastWidth = window.innerWidth
    lastHeigth = window.innerHeight


    insertAds()

    setCanvasBoundings()
}

function insertAds() {
    lastAdUpdate = new Date()
    let containers = document.getElementsByClassName("adContainer")
    for (container of containers) {
        let containerWidth = container.clientWidth
        let containerHeight = container.clientHeight
        container.innerHTML = containerWidth >= 135 && containerHeight >= 50 ? adString(containerHeight) : ""
    }

    function adString(adHeight = 50) {
        console.log("Ad placed")
        //setTimeout(()=>{(adsbygoogle = window.adsbygoogle || []).push({});},100)
        return ""//`<ins class="adsbygoogle" style="display:block; height: ${adHeight}px;" data-ad-client="ca-pub-4327628330003063" data-ad-slot="1070652247" data-full-width-responsive="true" data-adtest="on"></ins>`
    }
}

function updateAds() {
    if (new Date() - lastAdUpdate > 60000 && currentScreen.name == "menu") {
        insertAds()
    }
    waitForUserInteraction(gameArea, ["mousedown", "touchstart"], updateAds, true)
}

window.addEventListener("load", () => {
    let loadingInterval = setInterval(async () => {
        if (gameAssetsLoaded) {
            clearInterval(loadingInterval)
            window.scrollTo(0, 0)
            document.querySelector("#loadingOverlay").innerHTML = lang.ready
            initializeGame()
            showPromotion = window.matchMedia("(display-mode: standalone)").matches ? false : true
            await waitForUserInteraction(loadingOverlay, ["click"], undefined, true)
            keyboardMapping.style.display = physicalKeyboard ? "block" : "none"
            document.getElementsByTagName('body')[0].style.overflow = 'unset'
            loadingOverlay.style.display = "none"
            await fullscreenLock()
            await showRotateOverlay()
            await calculateDivs()
            updateAds()
            screen.orientation.addEventListener("change", showRotateOverlay)
            window.addEventListener("resize", showRotateOverlay)
            window.addEventListener("resize", () => {
                clearTimeout(afterResizeTimeout)
                afterResizeTimeout = setTimeout(calculateDivs, 500)
            })
        }
    })
})

backToGame.style.opacity = 0
window.addEventListener("scroll", () => {
    if(scrollY < 50){
        backToGame.style.display = "none"
        backToGame.style.opacity  = 0
    }else if(scrollY < 150){
        backToGame.style.display = "block"
        backToGame.style.opacity = ((scrollY - 50) / 150);
    }else{
        backToGame.style.display = "block"
        backToGame.style.opacity = 1
    }
})

if ("serviceWorker" in navigator) {
    window.addEventListener("beforeinstallprompt", definePrompt = (ev) => {
        ev.preventDefault()
        deferredPrompt = ev
        waitForUserInteraction(gameArea, ["touchstart", "mousedown"], endScreenInstallPrompt, true)
    })

    function endScreenInstallPrompt() {
        setTimeout(async () => {
            let installed
            if (
                currentScreen.name == "end" &&
                ((mode == "single" && players.second.status == "dead" && currentLevel > 1) || mode == "multi") &&
                new Date() - lastPrompt > 180000
            ) {
                installed = await installPrompt()
            }
            if (!installed) {
                waitForUserInteraction(gameArea, ["touchstart", "mousedown"], endScreenInstallPrompt, true)
            }
        }, 500)
    }

    window.addEventListener("appinstalled", () => {
        window.removeEventListener("beforeinstallprompt", definePrompt)
        deferredPrompt = null
    })
    navigator.serviceWorker.register("./serviceworker.js")
}

