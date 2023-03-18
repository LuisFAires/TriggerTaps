loadingOverlay.innerText = lang.loading
rotateOverlay.innerText = lang.rotate

const gameArea = document.querySelector("canvas")
const upper = document.getElementById("upper")
const bottom = document.getElementById("bottom")
const left = document.getElementById("left")
const right = document.getElementById("right")

let afterResizeTimeout
let lastWidth
let lastHeigth
let lastPrompt = 0
let lastAdUpdate = 0
let deferredPrompt

let showPromotion
let promotionString = 
`<div id="promotion">
    <span onclick="installPrompt()">${lang.install}</span>
    <img class="storeBagde" src="./img/play-${lang.lang}.png" onclick="promotionAction('Andorid', 'https://play.google.com')">
    <img class="storeBagde" src="./img/microsoft-${lang.lang}.png" onclick="promotionAction('Win', 'https://apps.microsoft.com')">
    <!--Coming soon-->
    <!--<img class="storeBagde" src="/img/apple-${lang.lang}.svg" onclick="promotionAction('IOS', 'https://www.apple.com/app-store/')">-->
</div>`

const touchDevice = navigator.maxTouchPoints > 0 ? true : false

let deviceOS
if(/iPad|iPhone|iPod/.test(window.navigator.userAgent)){
    deviceOS = "IOS"
}else if(/Macintosh|Mac|Mac OS|MacIntel|MacPPC|Mac68K/gi.test(window.navigator.userAgent)){
    deviceOS = "Mac"
}else if(/Win32|Win64|Windows|Windows NT|WinCE/gi.test(window.navigator.userAgent)){
    deviceOS = "Win"
}else if(/Android/gi.test(window.navigator.userAgent)){
    deviceOS = "Android"
}else if(/Linux/gi.test(window.navigator.userAgent)){
    deviceOS = "Linux"
}

function showRotateOverlay(){
    if(window.innerWidth > window.innerHeight || !touchDevice){
        document.querySelector("#rotateOverlay").style.display = "none"
        return
    }
    document.querySelector("#rotateOverlay").style.display = "flex"
}

function promotionAction(os, url){
    if(deviceOS == os && deferredPrompt != undefined){
        try{
            installPrompt()
        }catch{
            location.href = url
        }
        return
    }
    location.href = url
}

function fullscreenLock(){
    if(!touchDevice) return
    if(document.fullscreenElement === null){
        setTimeout(async () => {
            try{
                await document.documentElement.requestFullscreen()
                try{
                    await screen.orientation.lock("landscape")
                }catch{
                    console.log("unable to get orientation locked")
                }
            }catch{
                //console.log("unable to get fullscreen")
            }
            
        }, 200);
    }
    waitForUserInteraction(document, ["touchstart", "mousedown"], fullscreenLock, true)
}

async function installPrompt(){
    deferredPrompt.prompt()
    lastPrompt = new Date()
    const { outcome } = await deferredPrompt.userChoice
    if(outcome == "accepted"){
        //
    }else{
        //
    }
    return outcome === "accepted"
}

function waitForUserInteraction(element, interactions, callback = undefined, keyboard = false){
    return new Promise((resolve) => {
        function triggeredEvent(){
            for(interaction of interactions){
                element.removeEventListener(interaction, triggeredEvent)
            }
            if(keyboard) document.removeEventListener("keydown", triggeredEvent)
            if(callback) callback()
            resolve()
        }
        for(interaction of interactions){
            element.addEventListener(interaction, triggeredEvent)
        }
        if(keyboard) document.addEventListener("keydown", triggeredEvent)
    })
}

function calculateDivs(){
    //set external divs size
    if(window.getComputedStyle(document.getElementById("loadingOverlay")).display != "none") return
    if(window.getComputedStyle(document.getElementById("rotateOverlay")).display != "none") return
    if(lastHeigth === window.innerHeight && lastWidth === window.innerWidth) return
    if(touchDevice && document.fullscreenElement === null) return

    left.style.width = right.style.width = (window.innerWidth - gameArea.width) / 2 + "px" 

    if(window.innerHeight > gameArea.height + 50 && window.innerHeight <= gameArea.height + 100){
        upper.style.minHeight = bottom.style.minHeight = bottom.style.height = 0
        upper.style.height = window.innerHeight - gameArea.height + "px"
    }else if(window.innerHeight > gameArea.height + 100){
        upper.style.minHeight = "100px"
        upper.style.height = (window.innerHeight - gameArea.height) / 2 + "px"
        if(!touchDevice){
            bottom.style.height = (window.innerHeight - parseInt(window.getComputedStyle(upper).height) - gameArea.height) + "px"
        }
    }else{
        upper.style.minHeight = upper.style.height = bottom.style.minHeight = bottom.style.height = 0
    }

    left.style.height = right.style.height = window.innerHeight - parseInt(window.getComputedStyle(upper).height) - parseInt(window.getComputedStyle(bottom).height) + "px"
    lastWidth = window.innerWidth
    lastHeigth = window.innerHeight

    let promotion = document.getElementById("promotion")
    if(parseInt(window.getComputedStyle(upper).height) >= 100 && showPromotion == true && !promotion){
        upper.insertAdjacentHTML("beforeend", promotionString)
    }

    insertAds()

    setCanvasBoundings()
}

function insertAds(){
    lastAdUpdate = new Date()
    let containers = document.getElementsByClassName("adContainer")
    for(container of containers){
        let containerWidth = parseInt(window.getComputedStyle(container).width)
        let containerHeight = parseInt(window.getComputedStyle(container).height)
        if(containerWidth >= 120 && containerHeight >= 50) container.innerHTML = adString(containerHeight)
    }

    function adString(adHeight = 50){
        setTimeout(()=>{(adsbygoogle = window.adsbygoogle || []).push({});},100)
        return ` <ins class="adsbygoogle" style="display:block; height: ${adHeight}px;" data-ad-client="ca-pub-4327628330003063" data-ad-slot="1070652247" data-full-width-responsive="true"></ins>`
    }
}

function updateAds(){
    if(new Date() - lastAdUpdate > 60000 && currentScreen.name == "menu"){
        insertAds()
    }
    waitForUserInteraction(gameArea, ["mousedown", "touchstart"], updateAds, true)
}

window.addEventListener("load",()=>{
    let loadingInterval = setInterval(async ()=>{
        if(gameAssetsLoaded){
            clearInterval(loadingInterval)
            document.querySelector("#loadingOverlay").innerHTML = lang.ready
            await waitForUserInteraction(loadingOverlay, ["click"], undefined, true)
            loadingOverlay.style.display = "none"
            screen.orientation.addEventListener("change", showRotateOverlay)
            window.addEventListener("resize", showRotateOverlay)
            showRotateOverlay()
            fullscreenLock()
            initializeGame()
            setTimeout(async () => {
                showPromotion = window.matchMedia("(display-mode: standalone)").matches ? false : true
                await calculateDivs()
                updateAds()
            }, 500)
            window.addEventListener("resize", ()=>{
                clearTimeout(afterResizeTimeout)
                afterResizeTimeout = setTimeout(calculateDivs, 500)
            })
        }
    })
})

if("serviceWorker" in navigator){    
    window.addEventListener("beforeinstallprompt", (ev)=>{
        ev.preventDefault()
        deferredPrompt = ev
        waitForUserInteraction(gameArea, ["touchstart", "mousedown"], endScreenInstallPrompt)
    })
    
     function endScreenInstallPrompt(){
        setTimeout(async ()=>{
            let installed
            if(
                currentScreen.name == "end" &&
                ((mode == "single" && players.second.status == "dead" && currentLevel > 1) || mode == "multi") &&
                new Date() - lastPrompt > 60000
            ){
                installed = await installPrompt()   
            }
            if(!installed){
                waitForUserInteraction(gameArea, ["touchstart", "mousedown"], endScreenInstallPrompt)
            }
        }, 500)
    }
    
    window.addEventListener("appinstalled", () => {
        window.removeEventListener("beforeinstallprompt", definePrompt)
        deferredPrompt = null
    })
    navigator.serviceWorker.register("./serviceworker.js")
}
