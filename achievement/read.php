<?php
    require_once('../env.php');
    if(isset($_GET['name'])){
        $toDecrypt = base64_decode(htmlspecialchars($_GET['name']));
        $achievementValue = urlencode($_GET['name']);
    }elseif(isset($_COOKIE['achievement'])){
        $toDecrypt = base64_decode(htmlspecialchars($_COOKIE['achievement']));
        $achievementValue = urlencode($_COOKIE['achievement']);
    }
    if(isset($toDecrypt)){
        
        $ivlen = openssl_cipher_iv_length($method);
        $iv = substr($toDecrypt, 0, $ivlen);
        $encrypted = substr($toDecrypt, $ivlen);
        
        $result = openssl_decrypt($encrypted, $method, $key, 0, $iv);
    }else{
        header("Location: https://triggertaps.top");
    }