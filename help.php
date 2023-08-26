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
            <button class="langBtn" onclick="window.history.replaceState({}, document.title, window.location.pathname); document.cookie = cookieExpires ? `lang=en;expires=\${cookieExpires};` : 'lang=en'; location.reload()">English</button>
            <button class="langBtn" onclick="window.history.replaceState({}, document.title, window.location.pathname); document.cookie = cookieExpires ? `lang=es;expires=\${cookieExpires};` : 'lang=es'; location.reload()">Español</button>
            <button class="langBtn" onclick="window.history.replaceState({}, document.title, window.location.pathname); document.cookie = cookieExpires ? `lang=pt;expires=\${cookieExpires};` : 'lang=pt'; location.reload()">Português</button>
            <h2>
                <li>{$lang['help4']}</li>
            </h2>
            <span class="helpSpan">{$lang['help5']}</span>
            <span class="helpSpan">{$lang['help6']}</span>
            <span class="helpSpan">{$lang['help7']}</span>
            <h2>
                <li>{$lang['about']}</li>
            </h2>
            <span class="helpSpan">{$lang['description']}</span>
            <h2>
                <li>{$lang['developedWith']}</li>
            </h2>
            <img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" alt="VS Code" loading="lazy">
            <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP" loading="lazy">
            <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript" loading="lazy">
            <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" loading="lazy">
            <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" loading="lazy">
            <img src="https://img.shields.io/badge/gimp-5C5543?style=for-the-badge&logo=gimp&logoColor=white" alt="Gimp" loading="lazy">
            <h2>
                <li>{$lang['inspired']}</li>
            </h2>
            <a href="https://www.youtube.com/playlist?list=PLTcmLKdIkOWmeNferJ292VYKBXydGeDej" target="_blank">
                <img src="https://img.shields.io/badge/Playlist_Flappy_bird_--_Dev_Soutinho-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Playlist Flappy bird - Dev Soutinho - YouTube" loading="lazy">
            </a>
            <h2>
                <li>{$lang['credits']}</li>
            </h2>
            <a href="https://linkedin.com/in/luisfaires/" target="_blank">
                <img src="https://img.shields.io/badge/Luis_Fillipe-Software_Developer_-0077B5?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" alt="LinkedIn - Luis Fillipe Aires Souza" style="height: 40px;" loading="lazy">
            </a><br>
            <span class="creditSpan">Samuel Lee </span><a href="https://samuellee.itch.io/cow-boy-animated-pixel-art" target="_blank" class="creditAnchor">Cowboy (Animated Pixel Art)</a><br>
            <span class="creditSpan">CraftPix </span><a href="https://free-game-assets.itch.io/free-rpg-desert-tileset" target="_blank" class="creditAnchor">RPG Desert Tileset</a><br>
            <span class="creditSpan">KuraiWolf </span><a href="https://opengameart.org/content/light-machine-gun" target="_blank" class="creditAnchor">Light Machine Gun</a><br>
            <span class="creditSpan">MixKit </span><a href="https://mixkit.co/free-sound-effects/countdown/" target="_blank" class="creditAnchor">Simple countdown</a><br>
            <h2>
                <li>{$lang['contact']}</li>
            </h2>
            <span class="helpSpan">E-mail: contact@triggertaps.top</span>
            <h2>
                <li><a href="#privacy" class="creditAnchor" onclick="privacy.style.display = 'block';">{$lang['privacy']}</a></li>
            </h2>
        END;
        if($lang['currentLang'] == 'en'){
            echo <<<END
            <div id="privacy" style="display: none;" class="helpSpan">
            Privacy Policy 

            Your privacy is important. It is TriggerTaps.Top's policy to respect your privacy regarding any information we may collect from you on the TriggerTaps.Top website/app.

            We only ask for personal information when we really need it to provide you with a service. We do this by fair and lawful means, with your knowledge and consent. We also let you know why we are collecting it and how it will be used.

            We only retain collected information for as long as necessary to provide the requested service. When we store data, we protect it within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.

            We do not share personally identifiable information publicly or with third parties, except as required by law.

            Our website/app may have links to external websites that are not operated by us. Please be aware that we have no control over the content and practices of these sites and cannot accept responsibility for their respective privacy policies and content.

            You are free to decline our request for personal information, understanding that we may not be able to provide you with some of your desired services.

            Your continued use of our website/app will be deemed acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, please contact us.

            Cookie Policy TriggerTaps.Top

            What are cookies?
            As is common practice with almost all professional websites, this website/app uses cookies, which are small files downloaded to your computer, to improve your experience. This page describes what information they collect, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored, however this may downgrade or break certain elements of the website/app's functionality.

            How do we use cookies?
            We use cookies for a variety of reasons, detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this website/app. It is recommended that you leave cookies enabled if you are unsure whether or not you need them and in case that they are used to provide a service you use.

            Disable cookies
            You can prevent the use of cookies by adjusting your browser settings (see your browser Help for how to do this). Please be aware that disabling cookies will affect the functionality of this and many other websites you visit. Disabling cookies will generally result in disabling certain functionality and features of this website/app. Therefore, it is recommended that you do not disable cookies.

            Cookies usage:

            Form related cookies
            When you submit data via a form, cookies may be set to remember user details for future correspondence.

            Website/App settings cookies
            In order to provide you with an optimal experience on this website/app, we provide functionality to set your preferences for how this website/app performs when you use it. In order to remember your preferences, we need to set cookies so that this information can be called whenever you interact with a page that is affected by your preferences.

            Third Party Cookies
            In some special cases, we also use cookies provided by trusted third parties. The following section details which third-party cookies you may encounter through this website/app.

            This website/app uses Google Analytics, which is one of the most widespread and trusted analytics solutions on the web, to help us understand how you use the website/app and how we can improve your experience. These cookies may track things like how long you spend on the website/app and which pages you visit so that we can continue to produce engaging content.
            For more information about Google Analytics cookies, see the official Google Analytics page.

            Third party analytics are used to track and measure usage of this site so that we can continue to produce engaging content. These cookies may track things like how long you spend on the website/app or pages you visit, which helps us understand how we can improve the website/app for you.
            Periodically, we test new features and make subtle changes to the way the website/app looks. When we are still testing new features, these cookies may be used to ensure you receive a consistent experience while on the site and to understand which optimizations our users appreciate most.

            The Google AdSense service that we use to serve you advertising uses a DoubleClick cookie to serve you more relevant ads across the web and to limit the number of times a particular ad is shown to you.
            For more information about AdSense, see the official AdSense Privacy FAQ.
            We use advertisements to conpensate the costs of running this website/app and to provide funding for future developments. The behavioral advertising cookies used by this website/app are designed to ensure that we provide you with the most relevant advertisements where possible, anonymously tracking your interests and presenting you with similar things that may be of interest to you.


            User Commitment

            The user undertakes to make proper use of the contents and information that TriggerTaps.Top offers on the website/app and with an enunciative, but not limiting, character:

            A) Not to engage in activities that are illegal or contrary to good faith and public order;

            B) Not to disseminate propaganda or content of a racist, xenophobic nature, or online betting, games of chance, any type of illegal pornography, apology for terrorism or against human rights;

            C) Not to cause damage to the physical (hardware) and logical (software) systems of TriggerTaps.Top, its suppliers or third parties, to introduce or disseminate computer viruses or any other hardware or software systems that are capable of causing damage mentioned above.
            </div>
            END;
        }elseif($lang['currentLang'] == 'es'){        
            echo <<<END
            <div id="privacy" style="display: none;" class="helpSpan">
            política de privacidad

            Su privacidad es importante. Es política de TriggerTaps.Top respetar su privacidad con respecto a cualquier información que podamos recopilar de usted en el sitio web/aplicación de TriggerTaps.Top.

            Solo solicitamos información personal cuando realmente la necesitamos para brindarle un servicio. Hacemos esto por medios justos y legales, con su conocimiento y consentimiento. También le informamos por qué lo recopilamos y cómo se utilizará.

            Solo conservamos la información recopilada durante el tiempo que sea necesario para proporcionar el servicio solicitado. Cuando almacenamos datos, los protegemos dentro de los medios comercialmente aceptables para evitar pérdidas y robos, así como acceso, divulgación, copia, uso o modificación no autorizados.

            No compartimos información de identificación personal públicamente o con terceros, excepto según lo exija la ley.

            Nuestro sitio web/aplicación puede tener enlaces a sitios web externos que no son operados por nosotros. Tenga en cuenta que no tenemos control sobre el contenido y las prácticas de estos sitios y no podemos aceptar responsabilidad por sus respectivas políticas de privacidad y contenido.

            Puede rechazar nuestra solicitud de información personal, entendiendo que es posible que no podamos brindarle algunos de los servicios que desea.

            Su uso continuado de nuestro sitio web/aplicación se considerará como la aceptación de nuestras prácticas en materia de privacidad e información personal. Si tiene alguna pregunta sobre cómo manejamos los datos de los usuarios y la información personal, comuníquese con nosotros.


            Política de cookies TriggerTaps.Top

            ¿Qué son las cookies?
            Como es práctica común en casi todos los sitios web profesionales, este sitio web/aplicación utiliza cookies, que son pequeños archivos que se descargan en su computadora, para mejorar su experiencia. Esta página describe qué información recopilan, cómo la usamos y por qué a veces necesitamos almacenar estas cookies. También compartiremos cómo puede evitar que se almacenen estas cookies, sin embargo, esto puede degradar o romper ciertos elementos de la funcionalidad del sitio web/aplicación.

            Cómo usamos las cookies?
            Usamos cookies por una variedad de razones, que se detallan a continuación. Desafortunadamente, en la mayoría de los casos, no existen opciones estándar de la industria para deshabilitar las cookies sin deshabilitar por completo la funcionalidad y las características que agregan a este sitio web/aplicación. Se recomienda que permita todas las cookies si no está seguro de si las necesita o no y si se utilizan para proporcionar un servicio que utiliza.

            deshabilitar las cookies
            Puede evitar el uso de cookies ajustando la configuración de su navegador (consulte la Ayuda de su navegador para saber cómo hacerlo). Tenga en cuenta que deshabilitar las cookies afectará la funcionalidad de este y muchos otros sitios web que visite. Deshabilitar las cookies generalmente resultará en la deshabilitación de ciertas funciones y características de este sitio web/aplicación. Por lo tanto, se recomienda que no deshabilite las cookies.

            Cookies que configuramos:

            Cookies relacionadas con formularios
            Cuando envía datos a través de un formulario, las cookies pueden configurarse para recordar los detalles del usuario para correspondencia futura.

            Cookies de preferencia de sitio
            Con el fin de brindarle una gran experiencia en este sitio web, proporcionamos la funcionalidad para establecer sus preferencias sobre cómo funciona este sitio web/aplicación cuando lo usa. Para recordar sus preferencias, necesitamos establecer cookies para que esta información pueda ser llamada cada vez que interactúe con una página que se ve afectada por sus preferencias.

            Cookies de terceros
            En algunos casos especiales, también utilizamos cookies proporcionadas por terceros de confianza. La siguiente sección detalla qué cookies de terceros puede encontrar a través de este sitio web/aplicación.

            Este sitio web/aplicación utiliza Google Analytics, que es una de las soluciones de análisis más extendidas y confiables en la web, para ayudarnos a comprender cómo usa el sitio web/aplicación y cómo podemos mejorar su experiencia. Estas cookies pueden rastrear cosas como cuánto tiempo pasa en el sitio web/aplicación y qué páginas visita para que podamos continuar produciendo contenido atractivo.
            Para obtener más información sobre las cookies de Google Analytics, consulte la página oficial de Google Analytics.

            Los análisis de terceros se utilizan para rastrear y medir el uso de este sitio para que podamos continuar produciendo contenido atractivo. Estas cookies pueden rastrear cosas como cuánto tiempo pasa en el sitio web/aplicación o las páginas que visita, lo que nos ayuda a comprender cómo podemos mejorar el sitio web/aplicación para usted.
            Periódicamente, probamos nuevas funciones y hacemos cambios sutiles en la apariencia del sitio web/aplicación. Cuando todavía estamos probando nuevas funciones, estas cookies pueden usarse para garantizar que reciba una experiencia consistente mientras está en el sitio y para comprender qué optimizaciones aprecian más nuestros usuarios.

            El servicio Google AdSense que utilizamos para brindarle publicidad utiliza una cookie de DoubleClick para brindarle anuncios más relevantes en la web y para limitar la cantidad de veces que se le muestra un anuncio en particular.
            Para obtener más información sobre AdSense, consulte las preguntas frecuentes oficiales sobre la privacidad de AdSense.
            Usamos anuncios para compensar los costos de funcionamiento de este sitio web/aplicación y para proporcionar fondos para desarrollos futuros. Las cookies de publicidad conductual utilizadas por este sitio web/aplicación están diseñadas para garantizar que le proporcionemos los anuncios más relevantes siempre que sea posible, rastreando de forma anónima sus intereses y presentándole cosas similares que pueden ser de su interés.


            Compromiso del usuario
            El usuario se obliga a hacer un uso correcto de los contenidos e información que TriggerTaps.Top ofrece en el sitio web/app y con carácter enunciativo, pero no limitativo:

            a) No realizar actividades ilegales o contrarias a la buena fe y al orden público;

            B) No difundir propaganda o contenidos de carácter racista, xenófobo, apuestas online, juegos de azar, cualquier tipo de pornografía ilegal, apología del terrorismo o atentatorio contra los derechos humanos;

            C) No provocar daños en los sistemas físicos (hardware) y lógicos (software) de TriggerTaps.Top, de sus proveedores o de terceras personas, introducir o difundir virus informáticos o cualesquiera otros sistemas hardware o software que sean susceptibles de provocar los daños anteriormente mencionados .
            </div>
            END;
        }elseif($lang['currentLang'] == 'pt'){
            echo <<<END
            <div id="privacy" style="display: none;" class="helpSpan">
            Política Privacidade

            A sua privacidade é importante. É política do TriggerTaps.Top respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site/app TriggerTaps.Top.

            Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.

            Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.

            Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.

            O nosso site/app pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade e conteúdo.

            Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.

            O uso continuado de nosso site/app será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato connosco.


            Política de Cookies TriggerTaps.Top

            O que são cookies?
            Como é prática comum em quase todos os sites profissionais, este site/app usa cookies, que são pequenos arquivos baixados no seu computador, para melhorar sua experiência. Esta página descreve quais informações eles coletam, como as usamos e por que às vezes precisamos armazenar esses cookies. Também compartilharemos como você pode impedir que esses cookies sejam armazenados, no entanto, isso pode fazer um downgrade ou 'quebrar' certos elementos da funcionalidade do site/app.

            Como usamos os cookies?
            Utilizamos cookies por vários motivos, detalhados abaixo. Infelizmente, na maioria dos casos, não existem opções padrão do setor para desativar os cookies sem desativar completamente a funcionalidade e os recursos que eles adicionam a este site/app. É recomendável que você deixe todos os cookies se não tiver certeza se precisa ou não deles e caso sejam usados ​​para fornecer um serviço que você usa.

            Desativar cookies
            Você pode impedir o uso de cookies ajustando as configurações do seu navegador (consulte a Ajuda do navegador para saber como fazer isso). Esteja ciente de que a desativação de cookies afetará a funcionalidade deste e de muitos outros sites que você visita. A desativação de cookies geralmente resultará na desativação de determinadas funcionalidades e recursos deste site/app. Portanto, é recomendável que você não desative os cookies.

            Cookies que definimos:

            Cookies relacionados a formulários
            Quando você envia dados por meio de um formulário, os cookies podem ser configurados para lembrar os detalhes do usuário para correspondência futura.

            Cookies de preferências do site
            Para proporcionar uma ótima experiência neste site, fornecemos a funcionalidade para definir suas preferências de como esse site/app é executado quando você o usa. Para lembrar suas preferências, precisamos definir cookies para que essas informações possam ser chamadas sempre que você interagir com uma página for afetada por suas preferências.

            Cookies de Terceiros
            Em alguns casos especiais, também usamos cookies fornecidos por terceiros confiáveis. A seção a seguir detalha quais cookies de terceiros você pode encontrar através deste site/app.

            Este site/app usa o Google Analytics, que é uma das soluções de análise mais difundidas e confiáveis ​​da Web, para nos ajudar a entender como você usa o site/app e como podemos melhorar sua experiência. Esses cookies podem rastrear itens como quanto tempo você gasta no site/app e as páginas visitadas, para que possamos continuar produzindo conteúdo atraente.
            Para mais informações sobre cookies do Google Analytics, consulte a página oficial do Google Analytics.

            As análises de terceiros são usadas para rastrear e medir o uso deste site, para que possamos continuar produzindo conteúdo atrativo. Esses cookies podem rastrear itens como o tempo que você passa no site/app ou as páginas visitadas, o que nos ajuda a entender como podemos melhorar o site/app para você.
            Periodicamente, testamos novos recursos e fazemos alterações subtis na maneira como o site/app se apresenta. Quando ainda estamos testando novos recursos, esses cookies podem ser usados ​​para garantir que você receba uma experiência consistente enquanto estiver no site e entender quais otimizações os nossos usuários mais apreciam.

            O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.
            Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.
            Utilizamos anúncios para compensar os custos de funcionamento deste site/app e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados ​​por este site/app foram projetados para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.


            Compromisso do Usuário
            O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o TriggerTaps.Top oferece no site/app e com caráter enunciativo, mas não limitativo:

            A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;

            B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou apostas online, jogos de sorte e azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;

            C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do TriggerTaps.Top, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.
            </div>
            END;
        }
        echo '</ul>';
    ?>
</div>