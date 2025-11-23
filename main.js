/*
This file is responsible for everything that happens into the main div
*/

loadingText.innerText = lang.loading
rotateOverlay.innerText = lang.rotate

const gameArea = document.querySelector("canvas")
const upper = document.getElementById("upper")
const bottom = document.getElementById("bottom")
const promotion = document.getElementById("promotion")
const touchDevice = navigator.maxTouchPoints > 0 ? true : false
const isInIframe = window.self !== window.top

let afterResizeTimeout
let lastWidth
let lastHeigth
let lastPrompt = 0
let lastAdUpdate = 0
let deferredPrompt
let showPromotion

window.addEventListener("load", () => {
    let loadingInterval = setInterval(async () => {
        if (gameAssetsLoaded) {
            clearInterval(loadingInterval)
            loadingText.innerHTML = lang.ready
            initializeGame()
            showPromotion = (window.matchMedia("(display-mode: standalone)").matches || window.matchMedia("(display-mode: fullscreen)").matches || window.navigator.standalone) ? false : true
            await waitForInteractionWithElement(loadingOverlay, ["click"], undefined, true)
            window.scrollTo(0, 0)
            loadingOverlay.style.display = "none"
            gameContainer.style.display = "block"
            await fullScreenOrientationLock()
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

//prevents scroll with space bar

window.onkeydown = function (e) {
    return !(e.keyCode == 32 && e.target == document.body);
};

if ("serviceWorker" in navigator) {
    window.addEventListener("beforeinstallprompt", definePrompt = (ev) => {
        ev.preventDefault()
        deferredPrompt = ev
        waitForInteractionWithElement(gameArea, ["touchstart", "mousedown"], endScreenInstallPrompt, true)
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
                waitForInteractionWithElement(gameArea, ["touchstart", "mousedown"], endScreenInstallPrompt, true)
            }
        }, 500)
    }

    window.addEventListener("appinstalled", () => {
        window.removeEventListener("beforeinstallprompt", definePrompt)
        deferredPrompt = null
    })
    navigator.serviceWorker.register("./serviceworker.js")
}

function waitForInteractionWithElement(element, interactions, callback = undefined, keyboard = false) {
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

function showRotateOverlay() {
    rotateOverlay.style.display = (window.innerWidth > window.innerHeight || !touchDevice) ? "none" : "flex"
}

async function fullScreenOrientationLock() {
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
            console.log("unable to get fullscreen")
        }
    }
    waitForInteractionWithElement(document, ["touchstart", "mousedown"], fullScreenOrientationLock, true)
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

function calculateDivs() {
    if (rotateOverlay.style.display != "none") return
    if (lastHeigth === window.innerHeight && lastWidth === window.innerWidth) return
    if (touchDevice && document.fullscreenElement === null && !isInIframe) return

    promotion.style.display = (window.innerHeight >= gameArea.height + 50 && showPromotion) ? "flex" : "none"

    upper.style.height =  window.innerHeight - bottom.clientHeight + "px"

    lastWidth = window.innerWidth
    lastHeigth = window.innerHeight


    insertAds()
}

function insertAds() {
    lastAdUpdate = new Date()
    let containers = document.getElementsByClassName("adContainer")
    for (container of containers) {
        let containerWidth = container.clientWidth
        let containerHeight = container.clientHeight
        container.innerHTML = containerWidth >= 135 && containerHeight >= 50 && !isInIframe ? adString(containerHeight) : ""
    }

    function adString(adHeight = 50) {
        //console.log("Ad placed")
        setTimeout(() => { (adsbygoogle = window.adsbygoogle || []).push({}); }, 100)
        return `<ins class="adsbygoogle" style="display:block; height: ${adHeight}px;" data-ad-client="ca-pub-4327628330003063" data-ad-slot="3752036653" data-full-width-responsive="true"></ins>`
    }
}

function updateAds() {
    if (new Date() - lastAdUpdate > 10000) {
        insertAds()
    }
    waitForInteractionWithElement(gameArea, ["mousedown", "touchstart"], updateAds, true)
}