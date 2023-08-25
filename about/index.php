<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About TriggerTaps.top</title>
    <link rel="icon" href="https://triggertaps.top/img/CowBoyShoot.gif">
    <style>
        @font-face {
            font-family: game;
            src: url(../PixelOperator-Bold.ttf);
        }
        <?php require_once '../style.css'; ?>
    </style>
</head>
<body>
    <?php 
        require_once '../lang.php';
        require_once '../help.php'; 
    ?>
    <script>
        let cookieExpires
        helpOverlay.style.display = "block"
        privacy.style.display = "block"
        document.getElementById("closeHelp").setAttribute("onclick","location.href = location.origin")

    </script>
</body>
</html>