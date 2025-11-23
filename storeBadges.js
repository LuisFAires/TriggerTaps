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

async function promotionAction(os, url, openStore) {
    if (deviceOS == os && openStore != undefined) {
        location.href = openStore
    } else {
        window.open(url, '_blank')
    }
}

let badges = document.getElementsByClassName('storeBadge')
for (let badge of badges) {
    badge.setAttribute('src', badge.src.replace('badgeLang', lang.currentLang))
}