<?php
    require_once('env.php');
    if(isset($_POST['encrypt'])){
        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($method));
        $encrypted = openssl_encrypt(htmlspecialchars($_POST['encrypt']), $method, $key, 0, $iv);
        $combination = base64_encode($iv.$encrypted);
       
        $result['result'] = $combination;
        echo json_encode($result);

        //$result['iv'] = $iv;
        //$result['encrypted'] = $encrypted;
        //var_dump($result);
        
    }
    if(isset($_GET['name'])){
        $toDecrypt = base64_decode(htmlspecialchars($_GET['name']));
        
        $ivlen = openssl_cipher_iv_length($method);
        $iv = substr($toDecrypt, 0, $ivlen);
        $encrypted = substr($toDecrypt, $ivlen);
        
        $result['result'] = openssl_decrypt($encrypted, $method, $key, 0, $iv);
        //echo json_encode($result);

        //$result['toDecrypt'] = $toDecrypt;
        //$result['iv'] = $iv;
        //$result['encrypted'] = $encrypted;
        //var_dump($result);
    }
    
?>