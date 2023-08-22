<div id="helpOverlay">
    <button id="closeHelp" onclick="helpOverlay.style.display = 'none'">X</button>
    <?php 
        echo <<<END
        <h1>{$lang['name']}</h1>
        <ul>
            <h2>
                <li>{$lang['help1']}</li>
            </h2>
            <span class="helpSpan">{$lang['help2']}</span>
            <span class="helpSpan">{$lang['help3']}</span>
            <span class="helpSpan">{$lang['frozenMsg']}</span>
            <h2>
                <li>{$lang['lang']}</li>
            </h2>
            <button class="langBtn" onclick="window.history.replaceState({}, document.title, window.location.pathname); document.cookie = `lang=en;expires=\${cookieExpires};`; location.reload()">English</button>
            <button class="langBtn" onclick="window.history.replaceState({}, document.title, window.location.pathname); document.cookie = `lang=es;expires=\${cookieExpires};`; location.reload()">Español</button>
            <button class="langBtn" onclick="window.history.replaceState({}, document.title, window.location.pathname); document.cookie = `lang=pt;expires=\${cookieExpires};`; location.reload()">Português</button>
            <div id="keyboardMapping">
            <h2>
                <li>{$lang['help4']}</li>
            </h2>
            <span class="helpSpan">{$lang['help5']}</span>
            <span class="helpSpan">{$lang['help6']}</span>
            <span class="helpSpan">{$lang['help7']}</span>
            </div>
            <h2>
                <li>{$lang['about']}</li>
            </h2>
            <span class="helpSpan">{$lang['description']}</span>
            <h2>
                <li>{$lang['developedWith']}</li>
            </h2>
            <img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white">
            <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white">
            <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
            <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
            <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
            <img src="https://img.shields.io/badge/gimp-5C5543?style=for-the-badge&logo=gimp&logoColor=white">
            <h2>
                <li>{$lang['inspired']}</li>
            </h2>
            <a href="https://www.youtube.com/playlist?list=PLTcmLKdIkOWmeNferJ292VYKBXydGeDej" target="_blank">
                <img src="https://img.shields.io/badge/Playlist_Flappy_bird_--_Dev_Soutinho-FF0000?style=for-the-badge&logo=youtube&logoColor=white">
            </a>
            <h2>
                <li>{$lang['credits']}</li>
            </h2>
            <a href="https://linkedin.com/in/luisfaires/" target="_blank">
                <img src="https://img.shields.io/badge/Luis_Fillipe-Software_Developer_-0077B5?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" alt="LinkedIn" style="height: 40px;">
            </a><br>
            <span class="creditSpan">Samuel Lee </span><a href="https://samuellee.itch.io/cow-boy-animated-pixel-art" target="_blank" class="creditAnchor">Cowboy (Animated Pixel Art)</a><br>
            <span class="creditSpan">CraftPix </span><a href="https://free-game-assets.itch.io/free-rpg-desert-tileset" target="_blank" class="creditAnchor">RPG Desert Tileset</a><br>
            <span class="creditSpan">KuraiWolf </span><a href="https://opengameart.org/content/light-machine-gun" target="_blank" class="creditAnchor">Light Machine Gun</a><br>
            <span class="creditSpan">MixKit </span><a href="https://mixkit.co/free-sound-effects/countdown/" target="_blank" class="creditAnchor">Simple countdown</a><br>
            <h2>
                <li>{$lang['contact']}</li>
            </h2>
            <span class="helpSpan">E-mail: contact@triggertaps.top</span>
        </ul>
        END;
    ?>
</div>