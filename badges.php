<img class="storeBadge" src="/img/play-<?= $lang['currentLang']; ?>.png" alt="Google Play" onclick="promotionAction('Andorid', 'https://play.google.com/store/apps/details?id=triggertaps.twa', undefined)" loading="lazy">

<img class="storeBadge" src="/img/microsoft-<?= $lang['currentLang']; ?>.png" alt="Microsoft Store" onclick="promotionAction('Win', 'https://www.microsoft.com/store/apps/9NWKWXKQW468', 'ms-windows-store://pdp/?productid=9NWKWXKQW468')" loading="lazy">

<!--

Coming soon

<img class="storeBadge" src="/img/apple-<?= $lang['currentLang']; ?>.svg" alt="App Store" onclick="promotionAction('IOS', 'https://www.apple.com/app-store/', undefined)" loading="lazy">

-->

<script>
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
</script>