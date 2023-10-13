<?php
    require_once '../setCurrentLang.php';
    if($lang['currentLang'] == 'en'){
        $lang['achievement'] = ' has accomplished the fastest shooter achievement 🏆 play and prove that you can do the same!';
        $lang['achievementTitle'] = 'Achievement of ';
        $lang['play'] = 'Play';
        $lang['share'] = 'Share';
    }elseif($lang['currentLang'] == 'es'){
        $lang['achievement'] = ' ha conseguido el logro del tirador más rápido 🏆 ¡juega y demuestra que tú puedes hacer lo mismo!';
        $lang['achievementTitle'] = 'Logro de ';
        $lang['play'] = 'Jugar';
        $lang['share'] = 'Compartir';
    }elseif($lang['currentLang'] == 'pt'){
        $lang['achievement'] = ' alcançou conquista de atirador mais rápido 🏆 jogue e demonstre que pode fazer o mesmo!';
        $lang['achievementTitle'] = 'Conquista de ';
        $lang['play'] = 'Jogar';
        $lang['share'] = 'Compartilhar';
    }