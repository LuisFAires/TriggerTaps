import puppeteer from 'puppeteer';
import createFolder from './modules/createFolder.js';
import getCanvasCoordinates from './modules/getCanvasCoordinates.js';
import getTextsMainPage from './modules/getTextsMainPage.js';
import screenshotMenuAndArticle from './modules/screenshotMenuAndArticle.js';
import mainShare from './modules/mainShare.js';
import stuckTest from './modules/stuckTest.js';
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
    const deviceWidth = 800;
    const deviceHeight = 600;

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

    let results = []

    results.push(await createFolder('./', 'reports'))


    for (let testingLanguage of languagesToTest) {
        console.log('Current testing language:', testingLanguage)

        results.push(await createFolder('./reports/', testingLanguage))

        let coordinates = await getCanvasCoordinates(page, url, testingLanguage)
        results.push(coordinates)
        coordinates = coordinates.coordinates


        let texts = await getTextsMainPage(page)

        results.push(await screenshotMenuAndArticle(page, coordinates, false, testingLanguage))
        results.push(await screenshotMenuAndArticle(page, coordinates, true, testingLanguage))

        results.push(await mainShare(
            page,
            coordinates,
            {
                title: texts.lang.name,
                text: texts.lang.description,
                url: url + "?lang=" + testingLanguage
            }
        ))

        results.push(await stuckTest(page, coordinates, testingLanguage, 'single'))
        results.push(await stuckTest(page, coordinates, testingLanguage, 'multi'))
        results.push(await stuckTest(page, coordinates, testingLanguage, 'multi', 'second'))

        results.push(await levels(page, coordinates, testingLanguage))

        results.push(await generateAchievement(page, coordinates,
            {
                invalid: texts.lang.invalid,
                achievementPrompt: texts.lang.achievementPrompt
            },
            userName
        ))
        
        texts.achievementPage = await getTextsAchievement(page, userName)

        results.push(await achievementShare(page, testingLanguage, {
            title: texts.lang.achievementTitle + userName,
            text: userName + texts.lang.achievement,
            url: "https://triggertaps.top/"
        }))

        results.push(await achievementScreenshot(page, testingLanguage, deviceWidth, deviceHeight))

        results.push(await achievementPlay(page, url))

        results.push(await unavailable(page, url, testingLanguage, deviceWidth, deviceHeight, {
            noConnection: texts.lang.noConnection,
            tryAgain: texts.lang.tryAgain
        }))

        results.push(await testLangSwitcher(page, coordinates, url, testingLanguage, languagesToTest))

        await testTexts(texts)
    }

    await browser.close();

    console.log(results)
    for(let result of results){
        if(result.result != true){
            console.log('something went wrong❌❌❌')
        }
    }

    console.log('Everything done!!!')
    console.timeEnd('Runing time');
})();