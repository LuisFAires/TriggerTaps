<!DOCTYPE html>
<?php
    if(substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2) == "pt"){
        $lang['lang'] = "pt";
    }elseif(substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2) == "es"){
        $lang['lang'] = "es";
    }else{
        $lang['lang'] = "en";
    }
?>
<html lang="<?php echo $lang['lang']; ?>" translate="no">

<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Wild West Gun Battle</title>
    <!--JSON LD-->
    <script><?php include 'lang.php'; ?></script>
    <meta id="description" name="description" content="Wild West Gun Battle, <?php echo $lang['description']?>">
    <meta name="keywords" content="Wild West Gun Battle, <?php echo $lang['description']?>">
    <meta name="application-name" content="Wild West Gun Battle">
    <meta name="creator" content="Luis Fillipe Aires Souza">
    <meta property="og:title" content="Wild West Gun Battle ">
    <meta property="og:type" content="game">
    <meta property="og:description" content="Wild West Gun Battle, <?php echo $lang['description']?>">
    <meta property="og:image" content="img/CowBoyShoot.gif">
    <link rel="apple-touch-icon" href="/img/ios/192.png">
    <link rel="icon" href="img/CowBoyShoot.gif">
    <meta name="theme-color" content="#deb887">
    <link rel="manifest" href="./manifest.json">
    <style>
        <?php include 'style.css'; ?>
    </style>
    <meta name="viewport" content="user-scalable=no, width=device-width">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4327628330003063"crossorigin="anonymous"></script>
</head>

<body>
    <div id="rotateOverlay"></div>    
    <div id="loadingOverlay"></div>    
    <div id="upper">
        <div class="adContainer"></div>
    </div>
    <div>
        <div id="left">
            <div class="adContainer"></div>
        </div>
        <canvas width="650" height="250">
            Browser unsupported
        </canvas>
        <div id="right">
            <div class="adContainer"></div>
        </div>
    </div>
    <div id="bottom">
        <div class="adContainer"></div>
    </div>
    <script>
        <?php
            include 'game.js';
            include 'index.js';
        ?>
    </script>
</body>

</html>