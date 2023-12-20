<?php
    require_once '../redirect.php';
    require_once '../lang.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About TriggerTaps</title>
    <link rel="icon" href="https://triggertaps.top/img/CowBoyShoot.gif">
    <style>
        <?php require_once '../style.css'; ?>
    </style>
</head>
<body>
    <?php 
        require_once '../article.php'; 
    ?>
    <script>
        let cookieExpires
        document.getElementById("backToGame").setAttribute("onclick","location.href = location.origin")
        document.getElementsByTagName('body')[0].style.overflow = 'unset'
        backToGame.style.display = "block"
    </script>
</body>
</html>