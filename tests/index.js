import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  console.time('Runing time')
  const urlOrigin = 'https://dev.gunbattle.com/';
  const urlPathname = 'noads.php';
  const acceptableLanguages = ['pt', 'en', 'es'];
  const userName = 'Automated Tester';
  const deviceWidth = 650;
  const deviceHeight = 250;
  let canvasX;
  let canvasY;
  let somethingWrong;
  let directory
  let logStream

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Set screen size
  await page.setViewport({ width: deviceWidth, height: deviceHeight });

  async function isPlayerfrozen(player) {
    let result = await page.evaluate((player) => {
      return players[player].frozen
    }, player)
    return result
  }

  function logForBoth(logStream, data) {
    console.log(data)
    logStream.write(data + '\n')
  }

  async function freezeTest(mode, playerTofreeze = 'first') {
    let playerToShootX;
    let playerTofreezeX;
    if (playerTofreeze == 'first') {
      playerTofreezeX = 60;
      playerToShootX = 585;
    } else {
      playerTofreezeX = 585;
      playerToShootX = 60;
    }
    if (mode == 'single') {
      await page.mouse.click(canvasX + 225, canvasY + 125);
    } else {
      await page.mouse.click(canvasX + 425, canvasY + 125);
    }
    await page.waitForFunction('remainingTimer < 150');
    await page.mouse.click(canvasX + playerTofreezeX, canvasY + 125);
    await page.screenshot({ path: directory + `countdown frozen ${mode} ${playerTofreeze}.png` });
    logForBoth(logStream, `Screenshot countdown  ${mode} ${playerTofreeze}✅`);
    await page.waitForFunction('remainingTimer < 0');
    await page.mouse.click(canvasX + playerToShootX, canvasY + 125);
    await page.waitForFunction('!players.first.moving && !players.second.moving && currentScreen.name == "end"')
    let frozenResult = await isPlayerfrozen('first')
    if (frozenResult) {
      logForBoth(logStream, `${playerTofreeze} player in mode ${mode} is frozen as expected✅`);
    } else {
      somethingWrong = true
      logForBoth(logStream, `${playerTofreeze} player in mode ${mode} is not frozen❌`);
    }
    await page.screenshot({ path: directory + `end frozen ${mode} ${playerTofreeze}.png` });
    logForBoth(logStream, `Screenshot end frozen ${mode} ${playerTofreeze}✅`);
    await page.mouse.click(canvasX + 225, canvasY + 125);
  }

  async function screenshotMenuAndHelp(keyboard) {
    await page.evaluate((keyboard) => {
      physicalKeyboard = keyboard;
      currentScreen.update()
    }, keyboard)
    await page.screenshot({ path: directory + `menu keyboard ${keyboard.toString()}.png` });
    logForBoth(logStream, `Screenshot menu keyboard ${keyboard.toString()}✅`);
    await page.mouse.click(canvasX + 5, canvasY + 5);
    await page.screenshot({ path: directory + `help keyboard ${keyboard.toString()}.png` });
    logForBoth(logStream, `Screenshot help keyboard ${keyboard.toString()}✅`);
    await page.mouse.click(canvasX + 5, canvasY + 5);
  }

  //reports directory
  if (fs.existsSync('./reports/')) {
    console.log("Reports folder already exists✅")
  } else {
    console.log("creating reports folder")
    await fs.mkdir('./reports/', (err) => {
      if (err) {
        throw err
      }
    });
    console.log('Reports folder created✅');
  }

  for (let language of acceptableLanguages) {

    somethingWrong = false;
    let testableTexts = {};

    //language directory
    console.log('Language: ' + language)
    directory = `./reports/${language}/`
    if (fs.existsSync(directory)) {
      console.log(`${language} folder already exists✅`)
    } else {
      console.log(`Creating ${language} folder`)
      await fs.mkdir(directory, (err) => {
        if (err) {
          throw err
        }
      });
      console.log(`${language} folder created✅`);
    }

    //log
    logStream = fs.createWriteStream(directory + 'log.txt');
    console.log('Log stream started✅');

    //page load
    logForBoth(logStream, 'Loading page');
    await page.goto(urlOrigin + urlPathname + '?lang=' + language);
    await page.waitForNetworkIdle();
    await page.waitForSelector('canvas');
    logForBoth(logStream, 'Page loaded✅');

    //coordinates
    logForBoth(logStream, 'Getting canvas coordinates')
    canvasX = await page.evaluate(() => {
      return canvas.positionX
    })
    canvasY = await page.evaluate(() => {
      return canvas.positionY
    })
    logForBoth(logStream, `Canvas coordinates: X: ${canvasX} Y: ${canvasY} ✅`);

    //getting lang obj from page
    let langObj = await page.evaluate(() => {
      return lang
    })

    //getting texts
    testableTexts.install = langObj.install
    testableTexts.loading = langObj.loading
    testableTexts.ready = langObj.ready
    testableTexts.rotate = langObj.rotate

    testableTexts.title = await page.evaluate(() => {
      return document.title
    })
    testableTexts.name = await page.evaluate(() => {
      return document.querySelector('head > meta[name="application-name"]').content
    })
    testableTexts.ogtitle = await page.evaluate(() => {
      return document.querySelector('head > meta[property="og:title"]').content
    })

    testableTexts.description = await page.evaluate(() => {
      return document.querySelector('head > meta[name="description"]').content
    })
    testableTexts.keywords = await page.evaluate(() => {
      return document.querySelector('head > meta[name="keywords"]').content
    })
    testableTexts.ogdescription = await page.evaluate(() => {
      return document.querySelector('head > meta[property="og:description"]').content
    })

    //skip tutorial
    await page.evaluate(() => {
      document.cookie = "tutorial=done;";
    })
    logForBoth(logStream, 'tutorial skiped✅');

    //mene help screenshots
    await screenshotMenuAndHelp(false);
    await screenshotMenuAndHelp(true);

    //test if players are getting frozen 
    await freezeTest('single');
    await freezeTest('multi');
    await freezeTest('multi', 'second');

    //countdown
    await page.mouse.click(canvasX + 225, canvasY + 125);
    await page.waitForFunction('remainingTimer == 3000');
    await page.screenshot({ path: directory + 'countdown 3.png' });
    logForBoth(logStream, 'Screenshot countdown 3✅');
    await page.waitForFunction('remainingTimer == 2000');
    await page.screenshot({ path: directory + 'countdown 2.png' });
    logForBoth(logStream, 'Screenshot countdown 2✅');
    await page.waitForFunction('remainingTimer == 1000');
    await page.screenshot({ path: directory + 'countdown 1.png' });
    logForBoth(logStream, 'Screenshot countdown 1✅');
    await page.waitForFunction('remainingTimer < 0');
    await page.screenshot({ path: directory + 'countdown 0 shoot.png' });
    logForBoth(logStream, 'Screenshot countdown shoot✅');

    //levels
    await page.mouse.click(canvasX + 60, canvasY + 125);
    let lvl = 1;
    await page.waitForFunction('!players.first.moving && !players.second.moving && currentScreen.name == "end"')
    let isPlayerDead = await page.evaluate(() => {
      return players.second.status == 'dead';
    })
    if (isPlayerDead) {
      logForBoth(logStream, 'Player 2 is dead as expected✅');
    } else {
      somethingWrong = true;
      logForBoth(logStream, 'Players 2 is alive he must dead❌');
    }
    do {
      await page.screenshot({ path: directory + `end level ${lvl}.png` });
      logForBoth(logStream, `Screenshot end level ${lvl}✅`);
      await page.evaluate(() => {
        currentLevel++;
        currentScreen.update();
      })
      lvl++
    } while (lvl != 10)

    //game completed
    await page.screenshot({ path: directory + 'end level 10 game completed.png' });
    logForBoth(logStream, 'Screenshot end level 10 game completed✅');

    //geting achievement
    let invalidAchievementTested = false
    page.on('dialog', async (dialog) => {
      if (!invalidAchievementTested) {
        if (dialog.message() == langObj.invalid) {
          testableTexts.invalid = dialog.message();
          invalidAchievementTested = true;
        }
        await dialog.dismiss()
      } else {
        testableTexts.achievementPrompt = dialog.message();
        await dialog.accept(userName);
      }
      return
    });
    logForBoth(logStream, 'Dialog listener setted✅')
    await page.mouse.click(canvasX + 325, canvasY + 225);
    await new Promise((r) => {
      let interval = setInterval(() => {
        if (invalidAchievementTested) {
          clearInterval(interval)
          r()
        }
      })
    })
    await page.mouse.click(canvasX + 325, canvasY + 225);
    await page.waitForNavigation()
    logForBoth(logStream, 'Achievement loaded✅')
    await page.off('dialog')
    logForBoth(logStream, 'Dialog listener removed✅')

    //test achievement name
    let nameInsideAchievement = await page.evaluate(() => {
      return document.getElementById("name").innerHTML;
    })
    if (nameInsideAchievement == userName) {
      logForBoth(logStream, 'Achievement matches with user name✅');
    } else {
      somethingWrong = true;
      logForBoth(logStream, "Achievement doesn't match with user name❌");
    }

    //gets achievement text
    testableTexts.achievement = await page.evaluate(() => {
      return document.getElementById("text").innerHTML
    })

    testableTexts.achievementName = await page.evaluate(() => {
      return document.querySelector('head > meta[name="application-name"]').content
    })

    testableTexts.achievementTitle = await page.evaluate(() => {
      return document.title
    })
    testableTexts.achievementogtitle = await page.evaluate(() => {
      return document.querySelector('head > meta[property="og:title"]').content
    })

    testableTexts.achievementdescription = await page.evaluate(() => {
      return document.querySelector('head > meta[name="description"]').content
    })
    testableTexts.achievementogdescription = await page.evaluate(() => {
      return document.querySelector('head > meta[property="og:description"]').content
    })

    testableTexts.play = await page.evaluate(() => {
      return document.getElementById('play').innerHTML
    })

    testableTexts.share = await page.evaluate(() => {
      return document.getElementById('share').innerHTML
    })


    //screenshot achievement in both orientations
    await page.screenshot({ path: directory + 'achievement landscape.png' });
    logForBoth(logStream, 'Screenshot achievement landscape✅')
    await page.setViewport({ width: deviceHeight, height: deviceWidth });
    await page.screenshot({ path: directory + 'achievement portrait.png' });
    logForBoth(logStream, 'Screenshot achievement portrait✅')
    await page.setViewport({ width: deviceWidth, height: deviceHeight });

    //checks achievement play button
    await page.click("#play");
    let href = await page.evaluate(() => {
      return location.href;
    })
    if (href == page.url()) {
      logForBoth(logStream, 'Play to button returns to home page✅');
    } else {
      somethingWrong = true;
      logForBoth(logStream, "Check play button in achievement❌");
      logForBoth(logStream, 'href:', href);
      logForBoth(logStream, 'currenturl:', page.url());
    }

    //test language switch


    async function testLangSwitcher(keyboard) {
      await page.goto(urlOrigin + urlPathname + '?lang=' + language);
      await page.waitForNetworkIdle()
      await page.waitForSelector('canvas')
      let positionX = keyboard ? 500 : 325
      let langs = [{
        lang: 'en',
        position: 135
      }, {
        lang: 'es',
        position: 180
      }, {
        lang: 'pt',
        position: 225
      }]
      for (let lang of langs) {
        await page.evaluate((keyboard) => {
          physicalKeyboard = keyboard
        }, keyboard)
        await page.mouse.click(canvasX + 5, canvasY + 5)
        await page.mouse.click(positionX, lang.position)
        await page.waitForNetworkIdle()
        await page.waitForSelector('canvas')
        if (page.url())
          await page.screenshot({ path: directory + `lang switcher keyboard ${keyboard} ${lang.lang}.png` });
        logForBoth(logStream, `Screenshot lang switcher keyboard ${keyboard} ${lang.lang}✅`)
        if (page.url().endsWith('?lang=' + lang.lang)) {
          logForBoth(logStream, `Lang switcher keyboard ${keyboard} ${lang.lang}✅`)
        } else {
          logForBoth(logStream, `Lang switcher keyboard ${keyboard} ${lang.lang}❌`)
        }
      }
    }
    await testLangSwitcher(true)
    await testLangSwitcher(false)

    //test unavailable page
    await page.goto(urlOrigin + "/unavailable.php" + '?lang=' + language);
    await page.waitForNetworkIdle()
    await page.screenshot({ path: directory + `unavailable landscape.png` });
    logForBoth(logStream, `Screenshot unavailable landscape`);
    await page.setViewport({ width: deviceHeight, height: deviceWidth });
    await page.screenshot({ path: directory + `unavailable portrait.png` });
    logForBoth(logStream, `Screenshot unavailable portrait✅`);
    await page.setViewport({ width: deviceWidth, height: deviceHeight });

    testableTexts.noConnection = await page.evaluate(() => {
      return document.getElementById("noConnection").innerHTML
    })
    testableTexts.tryAgain = await page.evaluate(() => {
      return document.getElementById("tryAgain").innerHTML
    })

    await page.click("#tryAgain");
    href = await page.evaluate(() => {
      return location.href;
    })
    if (href == page.url()) {
      logForBoth(logStream, 'Try again button works✅');
    } else {
      somethingWrong = true;
      logForBoth(logStream, "Try again button isn't working❌");
      logForBoth(logStream, 'href:', href);
      logForBoth(logStream, 'currenturl:', page.url());
    }


    logForBoth(logStream, `\nTestable texts:\n`);
    logForBoth(logStream, JSON.stringify(testableTexts, null, 2));

    //compare texts
    function compareArray(reference, arr) {
      logForBoth(logStream, 'Comparing texts');
      logForBoth(logStream, 'Reference: ');
      logForBoth(logStream, reference);
      logForBoth(logStream, 'Values: ');
      logForBoth(logStream, arr);
      let equal = true
      for (let i = 0; i < arr.length; i++) {
        if (reference != arr[i]) equal = false
      }
      return equal
    }

    let whereShouldBeName = [
      testableTexts.title,
      testableTexts.name,
      testableTexts.ogtitle,
      testableTexts.achievementName
    ]

    let whereShouldBeDescription = [
      testableTexts.description,
      testableTexts.keywords,
      testableTexts.ogdescription
    ]

    let whereShouldBeAchievement = [
      testableTexts.achievementdescription,
      testableTexts.achievementogdescription
    ]

    if (compareArray(langObj.name, whereShouldBeName)) {
      logForBoth(logStream, 'lang.name✅')
    } else {
      somethingWrong = true
      logForBoth(logStream, 'lang.name needs manual verification❌')
    }

    if (compareArray(langObj.description, whereShouldBeDescription)) {
      logForBoth(logStream, 'lang.description✅')
    } else {
      somethingWrong = true
      logForBoth(logStream, 'lang.description needs manual verification❌')
    }

    if (compareArray(userName + langObj.achievement, whereShouldBeAchievement)) {
      logForBoth(logStream, 'achievement ✅')
    } else {
      somethingWrong = true
      logForBoth(logStream, 'achievement needs manual verification❌')
    }

    if (
      (testableTexts.achievementTitle == testableTexts.achievementogtitle) &&
      (
        (langObj.achievementTitle == userName + testableTexts.achievementTitle) ||
        (langObj.achievementTitle == testableTexts.achievementTitle + userName)
      )
    ) {
      logForBoth(logStream, 'achievement title✅')
    } else {
      somethingWrong = true
      logForBoth(logStream, 'achievement title needs manual verification❌')
    }

    function compareTextFromKeys(keys) {
      for (let key of keys) {
        if (langObj[key] == testableTexts[key]) {
          logForBoth(logStream, key + '✅')
        } else {
          somethingWrong = true
          logForBoth(logStream, key + '❌')
        }
      }
    }

    compareTextFromKeys([
      'install',
      'loading',
      'ready',
      'rotate',
      'invalid',
      'achievementPrompt',
      'achievement',
      'play',
      'share',
      'tryAgain',
      'noConnection'
    ])

    logForBoth(logStream, `Language ${language} done ${somethingWrong ? "❌❌❌" : "✅✅✅"}`);
  }

  await browser.close();

  console.log('Everything done!!!')
  console.timeEnd('Runing time');
})();