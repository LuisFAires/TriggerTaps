<?php
    if (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] !== 'on') {
        if(!headers_sent()) {
        header('Status: 301 Moved Permanently');
        header(sprintf(
        'Location: https://%s%s',
        $_SERVER['HTTP_HOST'],
        $_SERVER['REQUEST_URI']
        ));
        exit();
        }
    }
?>
<!DOCTYPE html>
<?php
    require_once 'lang.php';
?>
<html lang="<?php echo $lang['currentLang']; ?>" translate="no">

<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>TriggerTaps.Top</title>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        "name": "TriggerTaps.Top",
        "description": "<?php echo $lang['description']?>",
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
        "softwareVersion": "1.0.0",
        "datePublished": "2023-08-18",
    }
    </script>
    <meta id="description" name="description" content="<?php echo $lang['description']?>">
    <meta name="keywords" content="<?php echo $lang['description']?>">
    <meta name="application-name" content="TriggerTaps.Top">
    <meta name="creator" content="Luis Fillipe Aires Souza">
    <meta property="og:title" content="TriggerTaps.Top ">
    <meta property="og:type" content="game">
    <meta property="og:description" content="<?php echo $lang['description']?>">
    <meta property="og:image" content="https://triggertaps.top/img/CowBoyShoot.gif">
    <meta property="og:url" content="<?php echo "https://triggertaps.top{$_SERVER['REQUEST_URI']}"?>">
    <link rel="apple-touch-icon" href="https://triggertaps.top/img/ios/192.png">
    <link rel="icon" href="https://triggertaps.top/img/CowBoyShoot.gif">
    <meta name="theme-color" content="#deb887">
    <link rel="manifest" href="./manifest.json">
    <style>
        <?php require_once 'style.css'; ?>
    </style>
    <meta name="viewport" content="user-scalable=no, width=device-width">
    <link rel="preload" href="PixelOperator-Bold.ttf" as="font">
    <link rel="preload" href="sound/gunfire.mp3" as="audio">
    <link rel="preload" href="sound/countdown.mp3" as="audio">
    <link rel="preload" href="img/sprites.webp" as="image">
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
</head>

<body>
    <div id="rotateOverlay"></div>
    <div id="loadingOverlay"></div>
    <?php require_once 'help.php'; ?>
    <div id="upper">
        <div class="adContainer"></div>
    </div>
    <div>
        <div id="left">
            <div class="adContainer"></div>
        </div>
        <div id="center">
            <canvas width="650" height="250">
                Browser unsupported
            </canvas>
            <div id="promotion" style="display: none;">
                <span id="promotionSpan"onclick="installPrompt()"><?php echo $lang['install'];?></span>
                <img class="storeBagde" src="./img/microsoft-<?php echo $lang['currentLang'];?>.png" onclick="promotionAction('Win', 'https://www.microsoft.com/store/apps/9NWKWXKQW468', 'ms-windows-store://pdp/?productid=9NWKWXKQW468')" loading="lazy">
                <!--Coming soon-->
                <!--<img class="storeBagde" src="./img/play-<?php echo $lang['currentLang'];?>.png" onclick="promotionAction('Andorid', 'https://play.google.com')" loading="lazy">
                <img class="storeBagde" src="/img/apple-<?php echo $lang['currentLang'];?>.svg" onclick="promotionAction('IOS', 'https://www.apple.com/app-store/')" loading="lazy">-->
            </div>
        </div>
        <div id="right">
            <div class="adContainer"></div>
        </div>
    </div>
    <script>
        <?php
            echo 'lang = '.json_encode($lang);
            require_once 'game.js';
            require_once 'main.js';
        ?>
    </script>
</body>

</html>