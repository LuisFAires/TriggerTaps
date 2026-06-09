acceptableLanguages = ['pt', 'en', 'es']
currentLang = null;

// Helper: get query parameter
function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// Helper: set cookie
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

// Helper: get cookie
function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, null);
}

// 1. Check URL parameter
const urlLang = getQueryParam('lang');
if (urlLang && acceptableLanguages.includes(urlLang)) {
    setCookie('lang', urlLang, 365);
    currentLang = urlLang;
}

// 2. Check cookie
if (!currentLang) {
    const cookieLang = getCookie('lang');
    if (cookieLang && acceptableLanguages.includes(cookieLang)) {
        currentLang = cookieLang;
    }
}

// 3. Check browser language
if (!currentLang) {
    const browserLang = navigator.language.slice(0, 2);
    if (acceptableLanguages.includes(browserLang)) {
        setCookie('lang', browserLang, 365);
        currentLang = browserLang;
    }
}

// 4. Default to 'en'
if (!currentLang) {
    setCookie('lang', 'en', 365);
    currentLang = 'en';
}

if (currentLang == 'en') {
    lang = {
        'about': 'About the game:',
        'aboutText': `
            TriggerTaps is a simple but fun game that will make you feel like a real wild west gunslinger. In this game, you have to face your opponents in deadly duels, testing your reflexes and your reaction ability to pull the trigger before them. The game is easy to play but hard to master, ideal for anyone who likes a challenge.
    
            The game has simple but well-made graphics, with pixel art characters reminiscent of 8-bit era games and a cartoon-style desert setting that creates a wild west atmosphere. The sound effects are immersive, with an impactful countdown and realistic gunfire sound.
    
            You can play TriggerTaps anytime and anywhere as it is compatible with most web browsers. You can also install the game as a PWA (Progressive web app) on multiple platforms or as a standalone app on major app stores for free. The game is rated free for all ages and supports Portuguese, English and Spanish languages. Plus, you can use your mouse, keyboard, or touchscreen to play the game the way you like.
            
            If you like western games and want to have fun alone or with your friends, don't waste your time and play TriggerTaps, the addictive duel game set in the Wild West!
            `,
        'back': ' Back to game',
        'cookiesPolicy': 'Cookie Policy',
        'cookiesPolicyText': `
            What are cookies?
            As is common practice with almost all professional websites, this website/app uses cookies, which are small files downloaded to your device, to improve your experience. This page describes what information they collect, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored, however this may downgrade or break certain elements of the website/app's functionality.
    
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
            `,
        'credits': 'Credits:',
        'description': 'Wild West themed game where the characters fight a duel. The winner is the fastest to pull the trigger. You can play alone to get the fastest shooter achievement or duel with a friend in 2 player mode.',
        'developedWith': 'Developed with:',
        'howToPlay': 'How to play?',
        'howToPlayText': `
            You need to be aware of the sound and visual signals that indicate when you can shoot. If you take too long, your opponent shoots you and you lose. If you shoot too soon, your character gets stuck and you lose too. You need to find the balance between speed and accuracy to press on your character and shoot at the right moment to hit your opponents before they hit you.
            `,
        'inspired': 'Inspired by:',
        'install': 'Download the app and play whenever you want',
        'keyboardMapping': `
            Keyboard mapping:
            Singleplayer: Any key`,
        'keyboardMappingP1': `Multiplayer player1: `,
        'keyboardMappingP2': `Multiplayer player2: `,
        'lang': 'Language settings:',
        'modes': 'Game modes:',
        'modesText': `
            The game has two modes: one player and two players.

            In single player mode, you play alone against increasingly faster opponents in each level and try to achieve the fastest shooter achievement. After completing all levels, you can share your achievement with your friends and challenge them.

            In two player mode, you can duel a friend on the same device using split screen. Each player has their own half of the screen and their own virtual trigger. The winner is whoever pulls the trigger the fastest after the countdown.
            `,
        'privacy': 'Privacy policy',
        'privacyText': `
            Your privacy is important. It is TriggerTaps's policy to respect your privacy regarding any information we may collect from you on the TriggerTaps website/app

            We only ask for personal information when we really need it to provide you with a service. We do this by fair and lawful means, with your knowledge and consent. We also let you know why we are collecting it and how it will be used.

            We only retain collected information for as long as necessary to provide the requested service. When we store data, we protect it within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.

            We do not share personally identifiable information publicly or with third parties, except as required by law.

            Our website/app may have links to external websites that are not operated by us. Please be aware that we have no control over the content and practices of these sites and cannot accept responsibility for their respective privacy policies and content.

            You are free to decline our request for personal information, understanding that we may not be able to provide you with some of your desired services.

            Your continued use of our website/app will be deemed acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, please contact us.
            `,
        'userCommitment': 'User Commitment',
        'userCommitmentText': `
            The user undertakes to make proper use of the contents and information that TriggerTaps offers on the website/app and with an enunciative, but not limiting, character:

            A) Not to engage in activities that are illegal or contrary to good faith and public order;

            B) Not to disseminate propaganda or content of a racist, xenophobic nature, or online betting, games of chance, any type of illegal pornography, apology for terrorism or against human rights;

            C) Not to cause damage to the physical (hardware) and logical (software) systems of TriggerTaps, its suppliers or third parties, to introduce or disseminate malware or any other hardware or software systems that are capable of causing damage mentioned above.
            `,
        'achievementPrompt': 'Type the name/nickname will be in your fastest shooter achievement:',
        'completed': ' completed',
        'currentLang': 'en',
        'enemy': 'Enemy',
        'enemyReaction': 'Enemy\'s reaction time: ',
        'stuck': 'Stuck',
        'stuckMsg': 'Attempts during the countdown stuck the shooter.',
        'gameCompleted1': 'Game completed!!',
        'gameCompleted2': 'You are the',
        'gameCompleted3': 'fastest shooter!!',
        'invalid': 'Invalid name, maximum of 40 characters aceppted!!',
        'loading': 'Loading...',
        'lvl': 'Level ',
        'player': 'Player',
        'players': 'Players',
        'press': 'Press',
        'reaction1': 'Player 1 reaction time: ',
        'reaction2': 'Player 2 reaction time: ',
        'rotate': 'Rotate your device to play...🔄',
        'shareAchievement': 'Share achievement',
        'shoot': 'Shoot',
        'taphere': 'Click/Tap here to continue',
        'wasted': 'You are WASTED!!',
        'wasStuck': ' was stuck',
        'won1': 'Player 1 won!!',
        'won2': 'Player 2 won!!',
        'you': 'You',
        'yourReaction': 'Your reaction time: ',
        'noConnection': 'Connect to the internet once to be able to play offline!!',
        'tryAgain': 'Try again',
        'achievement': ' has accomplished the fastest shooter achievement 🏆 play and prove that you can do the same!',
        'achievementTitle': 'Achievement of ',
        'play': 'Play',
        'share': 'Share'
    }
} else if (currentLang == 'es') {
    lang = {
        'about': 'Sobre el juego:',
        'aboutText': `
            TriggerTaps es un juego simple pero divertido que te hará sentir como un auténtico pistolero del lejano oeste. En este juego tendrás que enfrentarte a tus oponentes en duelos mortales, poniendo a prueba tus reflejos y tu capacidad de reacción para apretar el gatillo antes que ellos. El juego es fácil de jugar pero difícil de dominar, ideal para cualquiera a quien le gusten los desafíos.
    
            El juego tiene gráficos simples pero bien hechos, con personajes de estilo pixel art que recuerdan a los juegos de la era de los 8 bits y un escenario desértico al estilo de los dibujos animados que crea una atmósfera occidental. Los efectos de sonido son inmersivos, con una cuenta regresiva impactante y un sonido de disparo realista.
    
            Puedes jugar TriggerTaps en cualquier momento y en cualquier lugar, ya que es compatible con la mayoría de los navegadores web. También puedes instalar el juego como PWA (aplicación web progresiva) en múltiples plataformas o como una aplicación independiente en las principales tiendas de aplicaciones de forma gratuita. El juego tiene clasificación libre para todas las edades y admite los idiomas portugués, inglés y español. Además, puedes usar el mouse, el teclado o la pantalla táctil para jugar como quieras.
    
            Si te gustan los juegos occidentales y quieres divertirte solo o con tus amigos, no pierdas el tiempo y juega a TriggerTaps, ¡el adictivo juego de duelo ambientado en el Salvaje Oeste!
            `,
        'back': ' Volver al juego',
        'cookiesPolicy': 'Política de cookies',
        'cookiesPolicyText': `
            ¿Qué son las cookies?
            Como es práctica común en casi todos los sitios web profesionales, este sitio web/aplicación utiliza cookies, que son pequeños archivos que se descargan en su dispositivo, para mejorar su experiencia. Esta página describe qué información recopilan, cómo la usamos y por qué a veces necesitamos almacenar estas cookies. También compartiremos cómo puede evitar que se almacenen estas cookies, sin embargo, esto puede degradar o romper ciertos elementos de la funcionalidad del sitio web/aplicación.
    
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
            `,
        'credits': 'Creditos:',
        'description': 'Juego temático del lejano oeste donde los personajes se baten a duelo. El ganador es el más rápido en apretar el gatillo. Puedes jugar solo para obtener el logro del tirador más rápido o batirte en duelo con un amigo en el modo de 2 jugadores.',
        'developedWith': 'Desarrollado con:',
        'howToPlayText': `
            Debes estar atento a las señales sonoras y visuales que indican cuándo puedes disparar. Si tardas demasiado, tu oponente te dispara y pierdes. Si disparas demasiado pronto, tu personaje se atasca y tú también pierdes. Debes encontrar el equilibrio entre velocidad y precisión para presionar a tu personaje y disparar en el momento adecuado para golpear a tus oponentes antes de que ellos te golpeen a ti.
            `,
        'inspired': 'Inspirado por:',
        'install': 'Descarga la app y juega cuando quieras',
        'howToPlay': '¿Cómo jugar?',
        'keyboardMapping': `
            Disposición de teclas:
            1 Jugador: Cualquier llave`,
        'keyboardMappingP1': `2 Jugadores Jugador 1: `,
        'keyboardMappingP2': `2 Jugadores Jugador 2: `,
        'lang': 'Configuración de idioma:',
        'modes': 'Modos de juego:',
        'modesText': `
            El juego tiene dos modos: un jugador y dos jugadores.
    
            En el modo para un jugador, juegas solo contra oponentes cada vez más rápidos en cada nivel e intentas lograr el logro del tirador más rápido. Después de completar todos los niveles, puedes compartir tu logro con tus amigos y desafiarlos.
    
            En el modo de dos jugadores, puedes batirte en duelo con un amigo en el mismo dispositivo usando la pantalla dividida. Cada jugador tiene su propia mitad de la pantalla y su propio gatillo virtual. El ganador es quien aprieta el gatillo más rápido después de la cuenta regresiva.
            `,
        'privacy': 'Política de privacidad',
        'privacyText': `
            Su privacidad es importante. Es política de TriggerTaps respetar su privacidad con respecto a cualquier información que podamos recopilar de usted en el sitio web/aplicación de TriggerTaps.

            Solo solicitamos información personal cuando realmente la necesitamos para brindarle un servicio. Hacemos esto por medios justos y legales, con su conocimiento y consentimiento. También le informamos por qué lo recopilamos y cómo se utilizará.

            Solo conservamos la información recopilada durante el tiempo que sea necesario para proporcionar el servicio solicitado. Cuando almacenamos datos, los protegemos dentro de los medios comercialmente aceptables para evitar pérdidas y robos, así como acceso, divulgación, copia, uso o modificación no autorizados.

            No compartimos información de identificación personal públicamente o con terceros, excepto según lo exija la ley.

            Nuestro sitio web/aplicación puede tener enlaces a sitios web externos que no son operados por nosotros. Tenga en cuenta que no tenemos control sobre el contenido y las prácticas de estos sitios y no podemos aceptar responsabilidad por sus respectivas políticas de privacidad y contenido.

            Puede rechazar nuestra solicitud de información personal, entendiendo que es posible que no podamos brindarle algunos de los servicios que desea.

            Su uso continuado de nuestro sitio web/aplicación se considerará como la aceptación de nuestras prácticas en materia de privacidad e información personal. Si tiene alguna pregunta sobre cómo manejamos los datos de los usuarios y la información personal, comuníquese con nosotros.
            `,
        'userCommitment': 'Compromiso del usuario',
        'userCommitmentText': `
            El usuario se obliga a hacer un uso correcto de los contenidos e información que TriggerTaps ofrece en el sitio web/app y con carácter enunciativo, pero no limitativo:
    
            A) No realizar actividades ilegales o contrarias a la buena fe y al orden público;
        
            B) No difundir propaganda o contenidos de carácter racista, xenófobo, apuestas online, juegos de azar, cualquier tipo de pornografía ilegal, apología del terrorismo o atentatorio contra los derechos humanos;
        
            C) No provocar daños en los sistemas físicos (hardware) y lógicos (software) de TriggerTaps, de sus proveedores o de terceras personas, introducir o difundir virus informáticos o cualesquiera otros sistemas hardware o software que sean susceptibles de provocar los daños anteriormente mencionados .
            `,
        'achievementPrompt': 'Escribe el nombre/apodo que estará en tu logro de tirador más rápido:',
        'completed': ' completa',
        'currentLang': 'es',
        'enemy': 'Enemigo',
        'enemyReaction': 'Tiempo de reacción del enemigo: ',
        'stuck': 'Atascado',
        'stuckMsg': 'Intentos durante la cuenta regresiva atascaron al tirador.',
        'gameCompleted1': '¡Juego completado!',
        'gameCompleted2': '¡Tu eres el tirador',
        'gameCompleted3': 'mas rápido!',
        'invalid': '¡Nombre/apellido no válido, se aceptan un máximo de 40 caracteres!',
        'loading': 'Cargando...',
        'lvl': 'Fase ',
        'player': 'Jugador',
        'players': 'Jugadores',
        'press': 'Presione',
        'reaction1': 'Tiempo de reacción del jugador 1: ',
        'reaction2': 'Tiempo de reacción del jugador 2: ',
        'rotate': 'Gira tu dispositivo para jugar...🔄',
        'shareAchievement': 'Compartir logro',
        'shoot': 'Dispara',
        'taphere': 'Clic/Toca aquí para continuar',
        'wasStuck': ' estaba atascado',
        'wasted': '¡Fuiste EXTERMINADO!',
        'won1': '¡Jugador 1 ganaste!',
        'won2': '¡Jugador 2 ganaste!',
        'you': 'Usted',
        'yourReaction': 'Tu tiempo de reacción: ',
        'noConnection': '¡Conéctate a Internet una vez para poder jugar sin conexión!',
        'tryAgain': 'Intentar otra vez',
        'achievement': ' ha conseguido el logro del tirador más rápido 🏆 ¡juega y demuestra que tú puedes hacer lo mismo!',
        'achievementTitle': 'Logro de ',
        'play': 'Jugar',
        'share': 'Compartir'
    };
} else if (currentLang == 'pt') {
    lang = {
        'about': 'Sobre o jogo:',
        'aboutText': `
            TriggerTaps é um jogo simples, mas divertido, que vai te fazer sentir como um verdadeiro pistoleiro do velho oeste. Neste jogo, você precisa enfrentar seus adversários em duelos mortais, testando seus reflexos e sua habilidade de reação para puxar o gatilho antes deles. O jogo é fácil de jogar, mas difícil de dominar, ideal para quem gosta de um desafio.

            O jogo tem gráficos simples, mas bem feitos, com personagens em estilo pixel art que lembram os games da era 8-bits e um cenário desértico em estilo cartunesco que cria uma atmosfera de faroeste. Os efeitos sonoros são envolventes, com uma contagem regressiva impactante e som de tiros realistas.
            
            Você pode jogar TriggerTaps em qualquer hora e qualquer lugar, pois ele é compatível com a maioria dos navegadores web. Você também pode instalar o jogo como PWA (Progressive web app) em várias plataformas ou como aplicação independente nas principais lojas de aplicativos de forma gratuita. O jogo tem classificação livre para todas as idades e suporta os idiomas português, inglês e espanhol. Além disso, você pode usar mouse, teclado ou tela sensível ao toque para jogar da maneira que preferir.
            
            Se você gosta de jogos de faroeste e quer se divertir sozinho ou com seus amigos, não perca tempo e jogue TriggerTaps, o jogo viciante de duelo no Velho Oeste!        
            `,
        'back': ' Voltar ao jogo',
        'cookiesPolicy': 'Política de Cookies',
        'cookiesPolicyText': `
            O que são cookies?
            Como é prática comum em quase todos os sites profissionais, este site/app usa cookies, que são pequenos arquivos baixados no seu dispositivo, para melhorar sua experiência. Esta página descreve quais informações eles coletam, como as usamos e por que às vezes precisamos armazenar esses cookies. Também compartilharemos como você pode impedir que esses cookies sejam armazenados, no entanto, isso pode fazer um downgrade ou 'quebrar' certos elementos da funcionalidade do site/app.

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
            `,
        'credits': 'Créditos:',
        'description': 'Jogo de faroeste onde os personagens travam um duelo. O vencedor é quem puxar o gatilho mais rápido. Você pode jogar sozinho para alcançar a conquista de atirador mais rápido ou duelar com um amigo no modo 2 jogadores.',
        'developedWith': 'Desenvolvido com:',
        'howToPlay': 'Como jogar?',
        'howToPlayText': `
            Você precisa estar atento aos sinais sonoros e visuais que indicam quando você pode atirar. Se você demorar muito, seu adversário dispara contra você e você perde. Se você atirar antes da hora, seu personagem fica travado e você também perde. Você precisa encontrar o equilíbrio entre velocidade e precisão para pressionar no seu personagem e atirar no momento certo para acertar seus oponentes antes que eles acertem você.
            `,
        'inspired': 'Inspirado por:',
        'install': 'Baixe o app e jogue quando quiser',
        'keyboardMapping': `
            Disposição das teclas:
            1 Jogador: Qualquer tecla            `,
        'keyboardMappingP1': `2 Jogadores Jogador 1: `,
        'keyboardMappingP2': `2 Jogadores Jogador 2: `,
        'lang': 'Configuração de idioma:',
        'modes': 'Modos de jogo:',
        'modesText': `
            O jogo tem dois modos: um jogador e dois jogadores.
    
            No modo um jogador, você joga sozinho contra adversários cada vez mais rápidos em cada nível e tenta alcançar a conquista de atirador mais rápido. Depois de completar todos os níveis, você pode compartilhar a sua conquista com seus amigos e desafiá-los.
    
            No modo dois jogadores, você pode duelar com um amigo no mesmo dispositivo, usando a tela dividida. Cada jogador tem sua própria metade da tela e seu próprio gatilho virtual. O vencedor é quem puxar o gatilho mais rápido depois da contagem regressiva.
            `,
        'privacy': 'Política de privacidade',
        'privacyText': `
            A sua privacidade é importante. É política do TriggerTaps respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site/app TriggerTaps.
    
            Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
    
            Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
    
            Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
    
            O nosso site/app pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade e conteúdo.
    
            Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
    
            O uso continuado de nosso site/app será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato connosco.
            `,
        'userCommitment': 'Compromisso do Usuário',
        'userCommitmentText': `
            O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o TriggerTaps oferece no site/app e com caráter enunciativo, mas não limitativo:
    
            A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;
        
            B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou apostas online, jogos de sorte e azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;
        
            C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do TriggerTaps, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.
            `,
        'achievementPrompt': 'Digite o nome/apelido que estará na sua conquista de atirador mais rápido:',
        'completed': ' concluído',
        'currentLang': 'pt',
        'enemy': 'Inimigo',
        'enemyReaction': 'Tempo de reação do Inimigo: ',
        'stuck': 'Travado',
        'stuckMsg': 'Tentativas durante a contagem regressiva travam o atirador.',
        'gameCompleted1': 'Jogo concluído!!',
        'gameCompleted2': 'Você é o atirador',
        'gameCompleted3': 'mais rápido!!',
        'invalid': 'Nome/apelido invalido, são aceitos no maximo 40 caracteres!',
        'loading': 'Carregando...',
        'lvl': 'Nível ',
        'player': 'Jogador',
        'players': 'Jogadores',
        'press': 'Pressione',
        'reaction1': 'Tempo de reação do jogador 1: ',
        'reaction2': 'Tempo de reação do jogador 2: ',
        'rotate': 'Vire seu dispositivo para jogar...🔄',
        'shareAchievement': 'Compartilhar conquista',
        'shoot': 'Atire',
        'taphere': 'Clique/Toque aqui para continuar',
        'wasStuck': ' estava travado',
        'wasted': 'Você foi EXTERMINADO!!',
        'won1': 'Jogador 1 venceu!!',
        'won2': 'Jogador 2 venceu!!',
        'you': 'Você',
        'yourReaction': 'Seu tempo de reação: ',
        'noConnection': 'Conecte-se à internet uma vez para poder jogar offline!!',
        'tryAgain': 'Tentar novamente',
        'achievement': ' alcançou conquista de atirador mais rápido 🏆 jogue e demonstre que pode fazer o mesmo!',
        'achievementTitle': 'Conquista de ',
        'play': 'Jogar',
        'share': 'Compartilhar',
    };
}