<?php
    $acceptableLanguages = ['pt', 'en', 'es'];
    if(isset($_GET['lang']) && in_array($_GET['lang'], $acceptableLanguages)){
        setcookie('lang', $_GET['lang'], time()+60*60*24*365, '/');
        $lang['currentLang'] = $_GET['lang'];
    }
    if(!isset($lang['currentLang']) && isset($_COOKIE['lang']) && in_array($_COOKIE['lang'], $acceptableLanguages)){
        $lang['currentLang'] = $_COOKIE['lang'];
    }
    if(!isset($lang['currentLang'])){
        $browserLanguage = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
        if(in_array($browserLanguage, $acceptableLanguages)){
            $lang['currentLang'] = $browserLanguage;
        }
    }
    if(!isset($lang['currentLang'])){
        $lang['currentLang'] = 'en';
    }
    $lang['name'] = 'TriggerTaps.Top';