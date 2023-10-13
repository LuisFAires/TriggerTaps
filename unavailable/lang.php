<?php
    require_once '../setCurrentLang.php';
    if($lang['currentLang'] == 'en'){
        $lang['noConnection'] = 'Connect to the internet once to be able to play offline!!';
        $lang['tryAgain'] = 'Try again';
    }elseif($lang['currentLang'] == 'es'){
        $lang['noConnection'] = '¡Conéctate a Internet una vez para poder jugar sin conexión!';
        $lang['tryAgain'] = 'Intentar otra vez';
    }elseif($lang['currentLang'] == 'pt'){
        $lang['noConnection'] = 'Conecte-se à internet uma vez para poder jogar offline!!';
        $lang['tryAgain'] = 'Tentar novamente';
    }