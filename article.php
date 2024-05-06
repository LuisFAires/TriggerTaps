<?php 
    echo <<<END
    <article id="article">
        <button id="backToGame" onclick="location.hash = '';location.hash = '#main'">{$lang['back']}</button>
        <h1>TriggerTaps</h1>
        <figure>
            <img id="logo" src="/img/CowBoyShoot.gif" alt="TriggerTaps character shooting">
            <figcaption>TriggerTaps character shooting</figcaption>
        </figure>
        <ul> 
            <li>
                <h2 id="lang">{$lang['lang']}</h2>
                <section>
                    <button class="langBtn" onclick="languageSwitcher('en')">English</button>
                    <button class="langBtn" onclick="languageSwitcher('es')">Español</button>
                    <button class="langBtn" onclick="languageSwitcher('pt')">Português</button>
                </section>
            </li>
            <li>
                <h2 id="howToPlay">{$lang['howToPlay']}</h2>
                <section>
                    <p class="articleParagraph">{$lang['howToPlayText']}</p>
                    <div id="keyboardMapping">
                        <br>
                        <p class="articleParagraph">{$lang['keyboardMapping']}</p>
                    </div>
                </section>
            </li>
            <li>
                <h2 id="modes">{$lang['modes']}</h2>
                <section>
                    <p class="articleParagraph">{$lang['modesText']}</p>
                </section>
            </li>
            <li>
                <h2 id="about">{$lang['about']}</h2>
                <section>
                    <p class="articleParagraph">{$lang['aboutText']}</p>
                </section>
            </li>
            <li>
                <h2 id="credits">{$lang['credits']}</h2>
                <section id="creditSection">
                    <a href="https://linkedin.com/in/luisfaires/" target="_blank">
                        <img src="/img/badges/Luis_Fillipe-Software_Developer.svg" alt="LinkedIn - Luis Fillipe Aires Souza" id="creditBadge" loading="lazy">
                    </a>
                    Assets:
                    <span class="creditSpan">Samuel Lee <a href="https://samuellee.itch.io/cow-boy-animated-pixel-art" target="_blank" class="anchor">Cowboy (Animated Pixel Art)</a></span>
                    <span class="creditSpan">CraftPix <a href="https://free-game-assets.itch.io/free-rpg-desert-tileset" target="_blank" class="anchor">RPG Desert Tileset</a></span>
                    <span class="creditSpan">KuraiWolf <a href="https://opengameart.org/content/light-machine-gun" target="_blank" class="anchor">Light Machine Gun</a></span>
                    <span class="creditSpan">MixKit <a href="https://mixkit.co/free-sound-effects/countdown/" target="_blank" class="anchor">Simple countdown</a></span>
                </section>
            </li>
            <li>
                <h2>{$lang['developedWith']}</h2>
                <section>
                    <img src="/img/badges/Visual_Studio_Code.svg" class="badges" alt="VS Code" loading="lazy">
                    <img src="/img/badges/PHP.svg" class="badges" alt="PHP" loading="lazy">
                    <img src="/img/badges/JavaScript.svg" class="badges" alt="JavaScript" loading="lazy">
                    <img src="/img/badges/HTML5.svg" class="badges" alt="HTML5" loading="lazy">
                    <img src="/img/badges/CSS3.svg" class="badges" alt="CSS3" loading="lazy">
                    <img src="/img/badges/gimp.svg" class="badges" alt="Gimp" loading="lazy">
                </section>
            </li>
            <li>
                <h2 id="contact">{$lang['contact']}</h2>
                <section>
                    <p  class="articleParagraph">E-mail: contact@triggertaps.top</span>
                </section>
            </li>
            <li>
                <h2 id="privacy">{$lang['privacy']}</h2>
                <section>
                    <p class="articleParagraph">{$lang['privacyText']}</p>
                </section>
            </li>
            <li>
                <h2 id="cookies">{$lang['cookiesPolicy']}</h2>
                <section>
                    <p class="articleParagraph">{$lang['cookiesPolicyText']}</p>
                </section>
            </li>
            <li>
                <h2 id="userCommitment">{$lang['userCommitment']}</h2>
                <section>
                    <p class="articleParagraph">{$lang['userCommitmentText']}</p>
                </section>
            </li>
        </ul>
    </article>
    END;
?>
<script>
    function languageSwitcher(language) {
        document.cookie = cookieExpires ? `lang=${language};expires=${cookieExpires};` : `lang=${language}`
        window.history.replaceState({}, document.title, `/?lang=${language}`);
        location.reload();
    }
</script>