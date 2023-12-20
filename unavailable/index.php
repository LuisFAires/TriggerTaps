<?php
    require_once '../redirect.php';
    require_once 'lang.php';
?>
<!DOCTYPE html>
<html lang="<?= $lang['currentLang']; ?>" translate="no">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="application-name" content="TriggerTaps">
    <meta name="creator" content="Luis Fillipe Aires Souza">
    <meta property="og:title" content="Unavailable">
    <meta property="og:type" content="game">
    <meta property="og:description" content="Unavailable">
    <meta property="og:image" content="https://triggertaps.top/img/CowBoyShoot.gif">
    <meta property="og:url" content="<?= "https://triggertaps.top{$_SERVER['REQUEST_URI']}"?>">
    <link rel="icon" href="https://triggertaps.top/img/CowBoyShoot.gif">
    <meta name="robots" content="noindex">
    <title>Unavailable</title>
    <style>
        @font-face {
            font-family: game;
            src: url(../PixelOperator-Bold.ttf);
        }
        html{
            height: 100%;
        }
        body{ 
            font-family: game;
            background-color: #deb887;
            color: #000000;
            margin: 0;
            padding: 0 2%;
            height:100%;
        }
        #outterContainer{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
        }
        #textContainer{
            text-align: center;
        }
        button{
            font-family: game;
            margin: 5px 5px 0 5px;
            font-size: 25px;
            background-color: #5e4700;
            color: #fff;
            border: 5px solid #fff;
        }

        #noConnection{
            font-size: 30px;
        }
        @media (max-width: 600px){/*vertical*/
            #outterContainer{
                flex-direction: column;
            }
            img{
                max-width: 48vw;
                max-height: 80vh;
            }
            #textContainer{
                padding-top: 35px;
            }
        }
        @media (min-width: 599px){/*horizontal*/
            #outterContainer{
                flex-direction: row;
            }
            img{
                max-width: 80vh;
                max-height: 48vw;
            }
        }
    </style>
</head>
<body>
    <div id="outterContainer">
        <img src="../img/CowBoyShoot.gif">
        <div id="textContainer" class="side">
            <span id="noConnection" class="side"></span>
            <div>
                <button id="tryAgain" onclick="location.href = location.origin"></button>
            </div>
        <div>
    </div>
    <script>
        <?= 'lang = '.json_encode($lang).';'; ?>
        noConnection.innerText = lang.noConnection
        tryAgain.innerText =  lang.tryAgain
    </script>
</body>
</html>