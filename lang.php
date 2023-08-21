<?php
    $acceptableLanguages = ['pt', 'en', 'es'];
    if(isset($_GET['lang']) && in_array($_GET['lang'], $acceptableLanguages)){
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
    if($lang['currentLang'] == 'pt'){
        $lang['frozen'] = 'Congelado';
        $lang['you'] = 'Você';
        $lang['player'] = 'Jogador';
        $lang['players'] = 'Jogadores';
        $lang['enemy'] = 'Inimigo';
        $lang['gameCompleted1'] = 'Jogo concluído!!';
        $lang['gameCompleted2'] = 'Você é o atirador';
        $lang['gameCompleted3'] = 'mais rápido!!';
        $lang['taphere'] = 'Clique/Toque aqui para continuar';
        $lang['wasted'] = 'Você foi EXTERMINADO!!';
        $lang['lvl'] = 'Nível ';
        $lang['completed'] = ' concluído';
        $lang['won1'] = 'Jogador 1 venceu!!';
        $lang['won2'] = 'Jogador 2 venceu!!';
        $lang['frozenMsg'] = 'Tentativas durante a contagem regressiva congelam o atirador.';
        $lang['help1'] = 'Como jogar?';
        $lang['help2'] = 'Clique/toque no seu personagem para atirar.';
        $lang['help3'] = 'O tiro mais rápido depois da contagem regressiva vence.';
        $lang['help4'] = 'Disposição das teclas:';
        $lang['help5'] = '1 Jogador: Qualquer tecla';
        $lang['help6'] = '2 Jogadores Jogador 1: F';
        $lang['help7'] = '2 Jogadores Jogador 2: J';
        $lang['lang'] = 'Idioma:';
        $lang['about'] = 'Sobre:';
        $lang['developedWith'] = 'Desenvolvido com:';
        $lang['inspired'] = 'Inspirado por:';
        $lang['credits'] = 'Créditos:';
        $lang['wasFrozen'] = ' estava congelado';
        $lang['yourReaction'] = 'Seu tempo de reação: ';
        $lang['enemyReaction'] = 'Tempo de reação do Inimigo: ';
        $lang['reaction1'] = 'Tempo de reação do jogador 1: ';
        $lang['reaction2'] = 'Tempo de reação do jogador 2: ';
        $lang['shoot'] = 'Atire';
        $lang['install'] = 'Instale o app e jogue onde quiser';
        $lang['loading'] = 'Carregando...';
        $lang['ready'] = 'Jogo carregado!<br>Clique ou toque aqui para jogar';
        $lang['rotate'] = 'Vire seu dispositivo para jogar...🔄';
        $lang['description'] = 'Jogo de faroeste onde os personagens travam um duelo. O vencedor é quem puxar o gatilho mais rápido. Você pode jogar sozinho para alcançar a conquista de atirador mais rápido ou duelar com um amigo no modo 2 jogadores.';
        $lang['shareAchievement'] = 'Compartilhar conquista';
        $lang['achievementPrompt'] = 'Digite o nome/apelido que estará na sua conquista de atirador mais rápido:';
        $lang['invalid'] = 'Nome/apelido invalido, são aceitos no maximo 40 caracteres!';
        $lang['achievementTitle'] = 'Conquista de ';
        $lang['achievement'] = ' alcançou conquista de atirador mais rápido 🏆 jogue e demonstre que pode fazer o mesmo!';
        $lang['share'] = 'Compartilhar';
        $lang['play'] = 'Jogar';
        $lang['noConnection'] = 'Conecte-se à internet uma vez para poder jogar offline!!';
        $lang['tryAgain'] = 'Tentar novamente';
        $lang['press'] = 'Pressione';
    }elseif($lang['currentLang'] == 'es'){
        $lang['frozen'] = 'Congelado';
        $lang['you'] = 'Usted';
        $lang['player'] = 'Jugador';
        $lang['players'] = 'Jugadores';
        $lang['enemy'] = 'Enemigo';
        $lang['gameCompleted1'] = '¡Juego completado!';
        $lang['gameCompleted2'] = '¡Tu eres el tirador';
        $lang['gameCompleted3'] = 'mas rápido!';
        $lang['taphere'] = 'Clic/Toca aquí para continuar';
        $lang['wasted'] = '¡Fuiste EXTERMINADO!';
        $lang['lvl'] = 'Fase ';
        $lang['completed'] = ' completa';
        $lang['won1'] = '¡Jugador 1 ganaste!';
        $lang['won2'] = '¡Jugador 2 ganaste!';
        $lang['frozenMsg'] = 'Intentos durante la cuenta regresiva congelan al tirador.';
        $lang['help1'] = '¿Cómo jugar?';
        $lang['help2'] = 'Haz clic o toca en tu personaje para disparar.';
        $lang['help3'] = 'El disparo más rápido después de la cuenta regresiva gana.';
        $lang['help4'] = 'Disposición de teclas:';
        $lang['help5'] = '1 Jugador: Cualquier llave';
        $lang['help6'] = '2 Jugadores Jugador 1: F';
        $lang['help7'] = '2 Jugadores Jugador 2: J';
        $lang['lang'] = 'Language:';
        $lang['about'] = 'Sobre:';
        $lang['developedWith'] = 'Desarrollado con:';
        $lang['inspired'] = 'Inspirado por:';
        $lang['credits'] = 'Creditos:';
        $lang['wasFrozen'] = ' estaba congelado';
        $lang['yourReaction'] = 'Tu tiempo de reacción: ';
        $lang['enemyReaction'] = 'Tiempo de reacción del enemigo: ';
        $lang['reaction1'] = 'Tiempo de reacción del jugador 1: ';
        $lang['reaction2'] = 'Tiempo de reacción del jugador 2: ';
        $lang['shoot'] = 'Dispara';
        $lang['install'] = 'Instala la aplicación y juega donde quieras';
        $lang['loading'] = 'Cargando...';
        $lang['ready'] = '¡Juego cargado!<br>Haga clic o toque aquí para jugar';
        $lang['rotate'] = 'Gira tu dispositivo para jugar...🔄';
        $lang['description'] = 'Juego temático del lejano oeste donde los personajes se baten a duelo. El ganador es el más rápido en apretar el gatillo. Puedes jugar solo para obtener el logro del tirador más rápido o batirte en duelo con un amigo en el modo de 2 jugadores.';
        $lang['shareAchievement'] = 'Compartir logro';
        $lang['achievementPrompt'] = 'Escribe el nombre/apodo que estará en tu logro de tirador más rápido:';
        $lang['invalid'] = '¡Nombre/apellido no válido, se aceptan un máximo de 40 caracteres!';
        $lang['achievementTitle'] = 'Logro de ';
        $lang['achievement'] = ' ha conseguido el logro del tirador más rápido 🏆 ¡juega y demuestra que tú puedes hacer lo mismo!';
        $lang['share'] = 'Compartir';
        $lang['play'] = 'Jugar';
        $lang['noConnection'] = '¡Conéctate a Internet una vez para poder jugar sin conexión!';
        $lang['tryAgain'] = 'Intentar otra vez';
        $lang['press'] = 'Presione';
    }elseif($lang['currentLang'] == 'en'){
        $lang['frozen'] = 'Frozen';
        $lang['you'] = 'You';
        $lang['player'] = 'Player';
        $lang['players'] = 'Players';
        $lang['enemy'] = 'Enemy';
        $lang['gameCompleted1'] = 'Game completed!!';
        $lang['gameCompleted2'] = 'You are the';
        $lang['gameCompleted3'] = 'fastest shooter!!';
        $lang['taphere'] = 'Click/Tap here to continue';
        $lang['wasted'] = 'You are WASTED!!';
        $lang['lvl'] = 'Level ';
        $lang['completed'] = ' completed';
        $lang['won1'] = 'Player 1 won!!';
        $lang['won2'] = 'Player 2 won!!';
        $lang['frozenMsg'] = 'Attempts during the countdown freeze the shooter.';
        $lang['help1'] = 'How to play?';
        $lang['help2'] = 'Click or tap on your character to shoot.';
        $lang['help3'] = 'The fastest shoot after the countdown wins.';
        $lang['help4'] = 'Keyboard mapping:';
        $lang['help5'] = 'Singleplayer: Any key';
        $lang['help6'] = 'Multiplayer player1:F';
        $lang['help7'] = 'Multiplayer player2:J';
        $lang['lang'] = 'Language:';
        $lang['about'] = 'About:';
        $lang['developedWith'] = 'Developed with:';
        $lang['inspired'] = 'Inspired by:';
        $lang['credits'] = 'Credits:';
        $lang['wasFrozen'] = ' was frozen';
        $lang['yourReaction'] = 'Your reaction time: ';
        $lang['enemyReaction'] = 'Enemy\'s reaction time: ';
        $lang['reaction1'] = 'Player 1 reaction time: ';
        $lang['reaction2'] = 'Player 2 reaction time: ';
        $lang['shoot'] = 'Shoot';
        $lang['install'] = 'Install the app and play everywhere';
        $lang['loading'] = 'Loading...';
        $lang['ready'] = 'Game loaded!<br>Click or tap here to play';
        $lang['rotate'] = 'Rotate your device to play...🔄';
        $lang['description'] = 'Wild West themed game where the characters fight a duel. The winner is the fastest to pull the trigger. You can play alone to get the fastest shooter achievement or duel with a friend in 2 player mode.';
        $lang['shareAchievement'] = 'Share achievement';
        $lang['achievementPrompt'] = 'Type the name/nickname will be in your fastest shooter achievement:';
        $lang['invalid'] = 'Invalid name, maximum of 40 characters aceppted!!';
        $lang['achievementTitle'] = '\'s Achievement';
        $lang['achievement'] = ' has accomplished the fastest shooter achievement 🏆 play and prove that you can do the same!';
        $lang['share'] = 'Share';
        $lang['play'] = 'Play';
        $lang['noConnection'] = 'Connect to the internet once to be able to play offline!!';
        $lang['tryAgain'] = 'Try again';
        $lang['press'] = 'Press';
    }elseif($lang['currentLang'] == 'fr'){
        //
    }elseif($lang['currentLang'] == 'de'){
        //
    }
?>