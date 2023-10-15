<?php
    if (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] !== 'on' || str_contains($_SERVER['HTTP_HOST'], 'www.')) {
        if(!headers_sent()) {
            header('Location: https://'.str_replace('www.', '', $_SERVER['HTTP_HOST']).$_SERVER['REQUEST_URI'], true, 301);
            exit();
        }
    }