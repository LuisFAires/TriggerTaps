<!DOCTYPE html>
<?php
    include '../generate.php';
    if(!isset($result['result']) || $result['result'] == ""){
        echo "<script>alert('Invalid achievement!!!'); location.href = location.origin;</script>";
        //header("Location: https://".$_SERVER['HTTP_HOST']);
        die();
    }
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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="application-name" content="Wild West Gun Battle">
    <meta name="creator" content="Luis Fillipe Aires Souza">
    <script>
        <?php 
            include '../lang.php';
            if($lang['lang'] == "en"){
                $title =  $result['result'].$lang['achievementTitle'];
            }else{
                $title =  $lang['achievementTitle'].$result['result'];
            }
        ?>
    </script>
    <meta property="og:title" content="<?php echo $title?>">
    <meta property="og:type" content="game">
    <meta property="og:description" content="<?php echo $result['result'].$lang['achievement'];?>">
    <meta property="og:image" content="../img/CowBoyShoot.gif">
    <link rel="icon" href="../img/CowBoyShoot.gif">
    <title><?php echo $title?></title>
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
            color: #4e463c;
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
        }
        #textContainer{
            text-align: center;
        }
        button{
            font-family: game;
            margin: 5px;
            font-size: 25px;
            background-color: #5e4700;
            color: #fff;
            border: 5px solid #fff;
        }

        #text, #name{
            font-size: 30px;
        }
        #name{
            color: #fff;
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
        <div id="textContainer">
            <span id="name"><?php echo $result['result']; ?></span>
            <span id="text"><?php echo $lang['achievement']; ?></span>
            <div>
                <button onclick="share()"><?php echo $lang['share'];?></button>
                <button id="play" onclick="location.href = location.origin"><?php echo $lang['play']; ?></button>
            </div>
        <div>
    </div>
    <script>
        function share(){
            navigator.share({
                title: document.title,
                text: "<?php echo $result['result'];?>"+lang.achievement,
                url: window.location.href
            })
        }
        //play blinking
        let playButton = document.getElementById("play")
        setInterval(() => {
            playButton.style.color = "#4e463c"
            playButton.style.transform = "scale(1.3)"
            setTimeout(() => {
                playButton.style.color = "#fff"
            }, 75);
            setTimeout(() => {
                playButton.style.color = "#4e463c"
            }, 150);
            setTimeout(() => {
                playButton.style.color = "#fff"
            }, 225);
            setTimeout(() => {
                playButton.style.color = "#4e463c"
            }, 300);
            setTimeout(() => {
                playButton.style.color = "#fff"
            }, 375);
            setTimeout(() => {
                playButton.style.color = "#4e463c"
            }, 450);
            setTimeout(() => {
                playButton.style.color = "#fff"
                playButton.style.transform = "scale(1)"
            }, 525);
        }, 1000);
    </script>
</body>
</html>