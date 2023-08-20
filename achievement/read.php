<?php
    require_once('../env.php');
    if(isset($_GET['name'])){
        $toDecrypt = base64_decode(htmlspecialchars($_GET['name']));
    }elseif(isset($_COOKIE['achievement'])){
        $toDecrypt = base64_decode(htmlspecialchars($_COOKIE['achievement']));
    }
    if(isset($toDecrypt)){
        
        $ivlen = openssl_cipher_iv_length($method);
        $iv = substr($toDecrypt, 0, $ivlen);
        $encrypted = substr($toDecrypt, $ivlen);
        
        $result['result'] = openssl_decrypt($encrypted, $method, $key, 0, $iv);
        //echo json_encode($result);

        //$result['toDecrypt'] = $toDecrypt;
        //$result['iv'] = $iv;
        //$result['encrypted'] = $encrypted;
        //var_dump($result);
    }else{
        header("Location: https://triggertaps.top");
    }