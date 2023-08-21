<!DOCTYPE html>
<?php
    require_once 'lang.php';
?>
<html lang="<?php echo $lang['currentLang']; ?>" translate="no">

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
    <meta property="og:image" content="https://triggertaps.top/img/CowBoyShoot.gif">
    <meta property="og:url" content="<?php echo "https://triggertaps.top{$_SERVER['REQUEST_URI']}"?>">
    <link rel="apple-touch-icon" href="https://triggertaps.top/img/ios/192.png">
    <link rel="icon" href="https://triggertaps.top/img/CowBoyShoot.gif">
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
    <?php require_once 'help.php'; ?>
    <canvas width="650" height="250">
        Browser unsupported
    </canvas>
    <script>
        <?php
            require_once 'game.js';
            //require_once 'main.js';
        ?>
        initializeGame()
    </script>
</body>

</html>