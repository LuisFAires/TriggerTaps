<!DOCTYPE html>
<?php
    require_once 'lang.php';
?>
<html lang="<?php echo $lang['lang']; ?>" translate="no">

<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>TriggerTaps.Top</title>
    <script><?php echo 'lang = '.json_encode($lang)?></script>
    <meta name="description" content="<?php echo $lang['description']?>">
    <meta name="keywords" content="<?php echo $lang['description']?>">
    <meta name="application-name" content="TriggerTaps.Top">
    <meta name="creator" content="Luis Fillipe Aires Souza">
    <meta property="og:title" content="TriggerTaps.Top">
    <meta property="og:type" content="game">
    <meta property="og:description" content="<?php echo $lang['description']?>">
    <meta property="og:image" content="img/CowBoyShoot.gif">
    <meta property="og:url" content="<?php echo "https://triggertaps.top{$_SERVER['REQUEST_URI']}"?>">
    <link rel="apple-touch-icon" href="/img/ios/192.png">
    <link rel="icon" href="img/CowBoyShoot.gif">
    <meta name="theme-color" content="#deb887">
    <link rel="manifest" href="./manifest.json">
    <meta name="robots" content="noindex">
    <style>
        <?php require_once 'style.css'; ?>
    </style>
    <meta name="viewport" content="user-scalable=no, width=device-width">
    <!-- <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4327628330003063"crossorigin="anonymous"></script> -->
</head>

<body>
   <!--  <div id="rotateOverlay"></div>    
    <div id="loadingOverlay"></div>    --> 
    <div id="upper">
        <div class="adContainer"></div>
    </div>
    <div>
        <div id="left">
            <div class="adContainer"></div>
        </div>
        <div id="center">
        <div id="promotion" style="display: none;">
            <span onclick="installPrompt()"><?php echo $lang['install'];?></span>
            <img class="storeBagde" src="./img/play-<?php echo $lang['lang'];?>.png" onclick="promotionAction('Andorid', 'https://play.google.com')">
            <img class="storeBagde" src="./img/microsoft-<?php echo $lang['lang'];?>.png" onclick="promotionAction('Win', 'https://apps.microsoft.com')">
            <!--Coming soon-->
            <!--<img class="storeBagde" src="/img/apple-<?php echo $lang['lang'];?>.svg" onclick="promotionAction('IOS', 'https://www.apple.com/app-store/')">-->
        </div>
            <canvas width="650" height="250">
                Browser unsupported
            </canvas>
        </div>
        <div id="right">
            <div class="adContainer"></div>
        </div>
    </div>
    <script>
        <?php
            require_once 'game.js';
            //require_once 'main.js';
        ?>
        initializeGame()
    </script>
</body>

</html>