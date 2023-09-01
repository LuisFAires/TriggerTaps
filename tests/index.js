import puppeteer from 'puppeteer';
import createFolder from './modules/createFolder.js';
import getCanvasCoordinates from './modules/getCanvasCoordinates.js';
import getTextsMainPage from './modules/getTextsMainPage.js';
import screenshotMenuAndArticle from './modules/screenshotMenuAndArticle.js';
import mainShare from './modules/mainShare.js';
import freezeTest from './modules/freezeTest.js';
import levels from './modules/levels.js';
import generateAchievement from './modules/generateAchievement.js';
import getTextsAchievement from './modules/getTextsAchievement.js';
import achievementShare from './modules/achievementShare.js';
import achievementPlay from './modules/achievementPlay.js';
import achievementScreenshot from './modules/achievementscreenshot.js';
import unavailable from './modules/unavailable.js';
import testLangSwitcher from './modules/testLangSwitcher.js';
import testTexts from './modules/testTexts.js';
(async () => {
    console.time('Runing time');
    const url = 'https://dev.triggertaps.top/';
    const languagesToTest = ['en', 'es', 'pt'];
    const userName = 'Automated Tester';
    const deviceWidth = 1024;
    const deviceHeight = 768;

    const browser = await puppeteer.launch({ headless: "new", args: ['--mute-audio'] });
    const page = await browser.newPage();

    const client = await page.target().createCDPSession();
    await client.send('Network.enable');
    await client.send('Network.setBypassServiceWorker', { bypass: true });

    await page.setRequestInterception(true);
    page.on('request', (interceptedRequest) => {
        if (interceptedRequest.url().includes('google')) {
            interceptedRequest.abort();
        } else {
            interceptedRequest.continue();
        }
    });

    await page.setViewport({ width: deviceWidth, height: deviceHeight });

    let folderCreated = await createFolder('./', 'reports')
    if (!folderCreated) return

    for (let testingLanguage of languagesToTest) {
        console.log('Current testing language:', testingLanguage)

        await createFolder('./reports/', testingLanguage)

        let coordinates = await getCanvasCoordinates(page, url, testingLanguage)

        let texts = await getTextsMainPage(page)

        await screenshotMenuAndArticle(page, coordinates, false, testingLanguage);
        await screenshotMenuAndArticle(page, coordinates, true, testingLanguage);

        await mainShare(
            page,
            coordinates,
            {
                title: texts.lang.name,
                text: texts.lang.description,
                url: url + "?lang=" + testingLanguage
            }
        )

        await freezeTest(page, coordinates, testingLanguage, 'single')
        await freezeTest(page, coordinates, testingLanguage, 'multi')
        await freezeTest(page, coordinates, testingLanguage, 'multi', 'second')

        await levels(page, coordinates, testingLanguage)

        await generateAchievement(page, coordinates,
            {
                invalid: texts.lang.invalid,
                achievementPrompt: texts.lang.achievementPrompt
            },
            userName
        )
        
        texts.achievementPage = await getTextsAchievement(page, userName)

        await achievementShare(page, testingLanguage, {
            title: testingLanguage == 'en' ? userName + texts.lang.achievementTitle : texts.lang.achievementTitle + userName,
            text: userName + texts.lang.achievement,
            url: url
        })

        await achievementScreenshot(page, testingLanguage, deviceWidth, deviceHeight)

        await achievementPlay(page, url)

        await unavailable(page, url, testingLanguage, deviceWidth, deviceHeight, {
            noConnection: texts.lang.noConnection,
            tryAgain: texts.lang.tryAgain
        })

        await testLangSwitcher(page, coordinates, url, testingLanguage, languagesToTest)

        await testTexts(texts)
    }

    await browser.close();

    console.log('Everything done!!!')
    console.timeEnd('Runing time');
})();