<?php
    require_once 'redirect.php';
    require_once 'lang.php';
?>
<!DOCTYPE html>
<html lang="<?php echo $lang['currentLang']; ?>" translate="no">

<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>TriggerTaps.Top🔫🔥💥🤠🌵🏜️</title>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        "name": "TriggerTaps.Top",
        "description": "<?php echo $lang['description']?>",
        "inLanguage": ["English", "Spanish", "Portuguese"],
        "genre": ["Action", "Adventure", "Shooting", "Challenge"],
        "operatingSystem": "Any",
        "applicationCategory": "Game",
        "url": "https://triggertaps.top",
        "image": "https://triggertaps.top/img/CowBoyShoot.gif",
        "screenshot": [
            "https://triggertaps.top/img/CowBoyShoot.gif",
            "https://triggertaps.top/img/screenshots/0.png",
            "https://triggertaps.top/img/screenshots/1.png",
            "https://triggertaps.top/img/screenshots/2.png",
            "https://triggertaps.top/img/screenshots/3.png",
            "https://triggertaps.top/img/screenshots/4.png",
            "https://triggertaps.top/img/screenshots/5.png",
            "https://triggertaps.top/img/screenshots/6.png",
            "https://triggertaps.top/img/screenshots/7.png",
            "https://triggertaps.top/img/screenshots/8.png",
            "https://triggertaps.top/img/screenshots/9.png",
            "https://triggertaps.top/img/screenshots/10.png",
            "https://triggertaps.top/img/screenshots/11.png",
            "https://triggertaps.top/img/screenshots/12.png",
            "https://triggertaps.top/img/screenshots/13.png",
            "https://triggertaps.top/img/screenshots/14.png"
        ],
        "numberOfPlayers": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2
        },
        "author": {
            "@type": "Person",
            "name": "Luis Fillipe Aires Souza",
            "url": "https://linkedin.com/in/luisfaires/"
        },
        "softwareVersion": "1.0.0",
        "datePublished": "2023-08-18"
    }
    </script>
    <meta id="description" name="description" content="<?php echo $lang['description']?>">
    <meta name="keywords" content="<?php echo $lang['description']?>">
    <meta name="application-name" content="TriggerTaps.Top">
    <meta name="creator" content="Luis Fillipe Aires Souza">
    <meta name="twitter:card" content="summary">
    <meta property="og:title" content="TriggerTaps.Top">
    <meta property="og:type" content="game">
    <meta property="og:description" content="<?php echo $lang['description']?>">
    <meta property="og:image" content="/img/CowBoyShoot.gif">
    <meta property="og:url" content="<?php echo "https://triggertaps.top{$_SERVER['REQUEST_URI']}"?>">
    <link rel="apple-touch-icon" href="/img/ios/192.png">
    <link rel="icon" href="/img/CowBoyShoot.gif">
    <meta name="robots" content="max-image-preview:large">
    <meta name="theme-color" content="#deb887">
    <link rel="manifest" href="./manifest.json">
    <link rel="prefetch" href="/PixelOperator-Bold.ttf" as="font">
    <link rel="prefetch" href="/sound/gunfire.mp3" as="audio">
    <link rel="prefetch" href="/sound/countdown.mp3" as="audio">
    <link rel="prefetch" href="/img/sprites.webp" as="image">
    <style>
        <?php require_once 'style.css'; ?>
    </style>
    <meta name="viewport" content="user-scalable=no, width=device-width">
</head>

<body>
    <div id="rotateOverlay"></div>
    <div id="loadingOverlay"></div>
    <div id="main">
        <div id="upper">
            <div class="adContainer"></div>
        </div>
        <div id="bottom">
            <div id="left">
                <div class="adContainer"></div>
            </div>
            <div id="center">
                <canvas width="650" height="250">
                    Browser unsupported
                </canvas>
                <div id="promotion" style="display: none;" onclick="installPrompt()">
                    <span><?php echo $lang['install'];?></span>
                    <img class="storeBagde" src="/img/microsoft-<?php echo $lang['currentLang'];?>.png" alt="Microsoft Store" onclick="promotionAction('Win', 'https://www.microsoft.com/store/apps/9NWKWXKQW468', 'ms-windows-store://pdp/?productid=9NWKWXKQW468')" loading="lazy">
                    <!--Coming soon-->
                    <!--<img class="storeBagde" src="/img/play-<?php echo $lang['currentLang'];?>.png" alt="Google Play" onclick="promotionAction('Andorid', 'https://play.google.com')" loading="lazy">
                    <img class="storeBagde" src="/img/apple-<?php echo $lang['currentLang'];?>.svg" alt="App Store" onclick="promotionAction('IOS', 'https://www.apple.com/app-store/')" loading="lazy">-->
                </div>
            </div>
            <div id="right">
                <div class="adContainer"></div>
            </div>
        </div>
    </div>
    <?php require_once 'article.php'; ?>
    <script>
        <?php
            echo 'lang = '.json_encode($lang['dinamic']);
            require_once 'game.js';
            require_once 'main.js';
            require_once 'article.js';
        ?>
    </script>
    <!-- adsense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4327628330003063"
    crossorigin="anonymous"></script>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-CH7HL7GPTR"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-CH7HL7GPTR');
    </script>
    <!-- adblock msg -->
    <script async src="https://fundingchoicesmessages.google.com/i/pub-4327628330003063?ers=1" nonce="KD_ZOof8y929rPIo-PJDiw"></script><script nonce="KD_ZOof8y929rPIo-PJDiw">(function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();</script>
</body>

</html>