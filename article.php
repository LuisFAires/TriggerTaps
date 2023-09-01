<?php 
    echo <<<END
    <article id="articleContainer">
        <button id="backToMain" onclick="location.hash = '#main'">X</button>
        <h1>{$lang['name']}</h1>
        <figure>
            <img id="logo" src="/img/CowBoyShoot.gif" alt="TriggerTaps.Top character shooting">
            <figcaption>TriggerTaps.Top character shooting</figcaption>
        </figure>
        <ul>
            <section>
                <li>
                    <h2>{$lang['help1']}</h2>
                </li>
                <p class="helpParagraph">{$lang['help2']}</p>
                <p class="helpParagraph">{$lang['help3']}</p>
                <p class="helpParagraph">{$lang['frozenMsg']}</p>
            </section>
            <section>
                <li>
                    <h2>{$lang['lang']}</h2>
                </li>
                <button class="langBtn" onclick="window.history.replaceState({}, document.title, window.location.pathname); document.cookie = cookieExpires ? `lang=en;expires=\${cookieExpires};` : 'lang=en'; location.reload()">English</button>
                <button class="langBtn" onclick="window.history.replaceState({}, document.title, window.location.pathname); document.cookie = cookieExpires ? `lang=es;expires=\${cookieExpires};` : 'lang=es'; location.reload()">Español</button>
                <button class="langBtn" onclick="window.history.replaceState({}, document.title, window.location.pathname); document.cookie = cookieExpires ? `lang=pt;expires=\${cookieExpires};` : 'lang=pt'; location.reload()">Português</button>
            </section>
            <section id="keyboardMapping">
                <li>
                    <h2>{$lang['help4']}</h2>
                </li>
                <p class="helpParagraph">{$lang['help5']}</p>
                <p class="helpParagraph">{$lang['help6']}</p>
                <p class="helpParagraph">{$lang['help7']}</p>
            </section>
            <section>
                <li>
                    <h2>{$lang['about']}</h2>
                </li>
                <p class="helpParagraph">{$lang['description']}</p>
            </section>
            <section>
                <li>
                    <h2>{$lang['developedWith']}</h2>
                </li>
                <img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" alt="VS Code" loading="lazy">
                <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP" loading="lazy">
                <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript" loading="lazy">
                <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" loading="lazy">
                <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" loading="lazy">
                <img src="https://img.shields.io/badge/gimp-5C5543?style=for-the-badge&logo=gimp&logoColor=white" alt="Gimp" loading="lazy">
            </section>
            <section>
                <li>
                    <h2>{$lang['inspired']}</h2>
                </li>
                <a href="https://www.youtube.com/playlist?list=PLTcmLKdIkOWmeNferJ292VYKBXydGeDej" target="_blank">
                    <img src="https://img.shields.io/badge/Playlist_Flappy_bird_--_Dev_Soutinho-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Playlist Flappy bird - Dev Soutinho - YouTube" loading="lazy">
                </a>
            </section>
            <section>
                <li>
                    <h2>{$lang['credits']}</h2>
                </li>
                <a href="https://linkedin.com/in/luisfaires/" target="_blank">
                    <img src="https://img.shields.io/badge/Luis_Fillipe-Software_Developer_-0077B5?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" alt="LinkedIn - Luis Fillipe Aires Souza" style="height: 40px; max-width: 100%; object-fit: contain;" loading="lazy">
                </a>
                <p class="helpParagraph">Samuel Lee <a href="https://samuellee.itch.io/cow-boy-animated-pixel-art" target="_blank" class="anchor">Cowboy (Animated Pixel Art)</a></p>
                <p class="helpParagraph">CraftPix <a href="https://free-game-assets.itch.io/free-rpg-desert-tileset" target="_blank" class="anchor">RPG Desert Tileset</a></p>
                <p class="helpParagraph">KuraiWolf <a href="https://opengameart.org/content/light-machine-gun" target="_blank" class="anchor">Light Machine Gun</a></p>
                <p class="helpParagraph">MixKit <a href="https://mixkit.co/free-sound-effects/countdown/" target="_blank" class="anchor">Simple countdown</a></p>
            </section>
            <section>
                <li>
                    <h2>{$lang['contact']}</h2>
                </li>
                <p  class="helpParagraph">E-mail: contact@triggertaps.top</span>
            </section>
            <section>
                <li>
                    <h2 id="privacy">{$lang['privacy']}</h2>
                </li>
                <p id="privacyText" class="helpParagraph">{$lang['privacyText']}</p>
            </section>
        </ul>
    </article>
    END;