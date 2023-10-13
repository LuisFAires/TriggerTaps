import puppeteer from 'puppeteer';
(async () => {
    const url = 'https://dev.triggertaps.top/';
    const browser = await puppeteer.launch({ headless: false, args: ['--mute-audio'], defaultViewport: null });
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

    await page.goto(url);
})();