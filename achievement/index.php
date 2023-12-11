<?php
require_once '../redirect.php';
require_once 'lang.php';
require_once 'read.php';

$title =  $lang['achievementTitle'] . $result;
?>
<!DOCTYPE html>
<html lang="<?= $lang['currentLang']; ?>" translate="no">

<head>
    <meta charset="UTF-8">
    <title><?= $title ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="application-name" content="TriggerTaps.Top">
    <meta name="creator" content="Luis Fillipe Aires Souza">
    <meta name="description" content="<?= $result . $lang['achievement']; ?>">
    <meta name="twitter:card" content="summary">
    <meta property="og:title" content="<?= $title ?>">
    <meta property="og:type" content="game">
    <meta property="og:description" content="<?= $result . $lang['achievement']; ?>">
    <meta property="og:image" content="https://triggertaps.top/img/CowBoyShoot.gif">
    <meta property="og:url" content="https://triggertaps.top/achievement/?name=<?= $achievementValue . '&lang=' . $lang['currentLang'] ?>">
    <link rel="apple-touch-icon" href="https://triggertaps.top/img/ios/192.png">
    <link rel="icon" href="https://triggertaps.top/img/CowBoyShoot.gif">
    <meta name="theme-color" content="#deb887">
    <meta name="robots" content="noindex">
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-CH7HL7GPTR"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-CH7HL7GPTR');
    </script>
    <style>
        @font-face {
            font-family: game;
            src: url(../PixelOperator-Bold.ttf);
        }

        html {
            height: 100%;
        }

        body {
            font-family: game;
            background-color: #deb887;
            color: #000000;
            margin: 0;
            padding: 0 2%;
            height: 100%;
        }

        #outterContainer {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #textContainer {
            text-align: center;
        }

        button {
            font-family: game;
            margin: 5px;
            font-size: 25px;
            background-color: #5e4700;
            color: #fff;
            border: 5px solid #fff;
        }

        #text,
        #name {
            font-size: 30px;
        }

        #name {
            color: #fff;
        }

        .storeBadge {
            height: 40px;
            padding: 5px;
        }

        @media (max-width: 600px) {

            /*vertical*/
            #outterContainer {
                flex-direction: column;
            }

            #gif {
                max-width: 48vw;
                max-height: 80vh;
            }

            #textContainer {
                padding-top: 35px;
            }
        }

        @media (min-width: 599px) {

            /*horizontal*/
            #outterContainer {
                flex-direction: row;
            }

            #gif {
                max-width: 80vh;
                max-height: 48vw;
            }
        }
    </style>
</head>

<body>
    <div id="outterContainer">
        <img id="gif" src="../img/CowBoyShoot.gif">
        <div id="textContainer">
            <span id="name"><?= $result; ?></span>
            <span id="text"><?= $lang['achievement']; ?></span>
            <div>
                <button id="share" onclick="share()"><?= $lang['share']; ?></button>
                <button id="play" onclick="playButtonClick()"><?= $lang['play']; ?></button>
            </div>
            <div>
                <?php require_once '../badges.php' ?>
            </div>
        </div>
    </div>
    <script>
        function playButtonClick() {
            if (location.href.includes("?name=")) {
                try {
                    gtag('event', 'playFromAchievement')
                } catch {}
            }
            location.href = location.origin
        }

        function getCookie(cname) {
            let name = cname + "=";
            let ca = document.cookie.split(';');
            for (c of ca) {
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        function share() {
            try {
                gtag('event', 'shareFromAchievement')
            } catch {}
            let dataToShare = {
                title: document.title,
                text: "<?= $result; ?>" + text.innerHTML,
                url: "https://triggertaps.top/achievement/?name=<?= $achievementValue . '&lang=' . $lang['currentLang'] ?>"
            }
            if (navigator.canShare(dataToShare)) {
                navigator.share(dataToShare)
            } else {
                window.open(dataToShare.url, '_blank')
            }
        }
        //play blinking
        let playButton = document.getElementById("play")
        setInterval(() => {
            playButton.style.color = "#5e4700"
            playButton.style.transform = "scale(1.3)"
            setTimeout(() => {
                playButton.style.color = "#fff"
            }, 75);
            setTimeout(() => {
                playButton.style.color = "#5e4700"
            }, 150);
            setTimeout(() => {
                playButton.style.color = "#fff"
            }, 225);
            setTimeout(() => {
                playButton.style.color = "#5e4700"
            }, 300);
            setTimeout(() => {
                playButton.style.color = "#fff"
            }, 375);
            setTimeout(() => {
                playButton.style.color = "#5e4700"
            }, 450);
            setTimeout(() => {
                playButton.style.color = "#fff"
                playButton.style.transform = "scale(1)"
            }, 525);
        }, 1000);
    </script>
</body>
</html>