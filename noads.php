<!DOCTYPE html>
<?php
    require_once 'lang.php';
?>
<html lang="<?php echo $lang['lang']; ?>" translate="no">

<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Wild West Gun Battle</title>
    <!--JSON LD-->
    <meta id="description" name="description"
        content="Wild West Gun Battle, Western-themed game where the characters fight a duel">
    <meta name="keywords" content="Wild West Gun Battle, Western-themed game where the characters fight a duel">
    <meta name="application-name" content="Wild West Gun Battle">
    <meta name="creator" content="Luis Fillipe Aires Souza">
    <meta property="og:title" content="Wild West Gun Battle ">
    <meta property="og:type" content="game">
    <meta property="og:description"
        content="Wild West Gun Battle, Western-themed game where the characters fight a duel">
    <meta property="og:image" content="img\CowBoyShoot.gif">
    <link rel="apple-touch-icon" href="/img/ios/192.png">
    <link rel="icon" href="img\CowBoyShoot.gif">
    <meta name="theme-color" content="#deb887" />
    <link rel="manifest" href="./manifest.json">
    <style>
        body {
            overflow: hidden;
            margin: 0;
            background-color: #deb887;
            user-select: none;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }
    </style>
    <meta name="viewport" content="user-scalable=no, width=device-width">
</head>

<body>
    <canvas width="650" height="250">
        Browser unsupported
    </canvas>
    <script>
        <?php
            echo 'lang = '.json_encode($lang);
            require_once 'game.js';
        ?>
        initializeGame()
        addEventListener("resize", setCanvasBoundings)
    </script>
</body>

</html>