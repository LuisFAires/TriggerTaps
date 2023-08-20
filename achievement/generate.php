<?php
    require_once('../env.php');
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
?>