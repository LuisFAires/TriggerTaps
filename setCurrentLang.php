<?php
    $acceptableLanguages = ['pt', 'en', 'es'];
    if(isset($_GET['lang']) && in_array($_GET['lang'], $acceptableLanguages)){
        setcookie('lang', $_GET['lang'], time()+60*60*24*365, '/');
        $lang['currentLang'] = $_GET['lang'];
        return;
    }
    if(!isset($lang['currentLang']) && isset($_COOKIE['lang']) && in_array($_COOKIE['lang'], $acceptableLanguages)){
        $lang['currentLang'] = $_COOKIE['lang'];
        return;
    }
    $browserLanguage = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
    if(!isset($lang['currentLang']) && in_array($browserLanguage, $acceptableLanguages)){
        setcookie('lang', $browserLanguage, time()+60*60*24*365, '/');
        $lang['currentLang'] = $browserLanguage;
        return;
    }
    if(!isset($lang['currentLang'])){
        setcookie('lang', 'en', time()+60*60*24*365, '/');
        $lang['currentLang'] = 'en';
        return;
    }