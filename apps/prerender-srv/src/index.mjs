
import http from 'http';
import Koa from 'koa';

import chromeLauncher from 'chrome-launcher';
import CDP from 'chrome-remote-interface';


async function launchChrome() {
  return await chromeLauncher.launch({
    chromeFlags: [
      '--disable-gpu',
      '--headless'
    ]
  });
}

function transform(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

(async function() {

  const app = new Koa();
  const server = http.createServer(app.callback());

  app.use(async (ctx) => {

    const chrome = await launchChrome();
    const protocol = await CDP({
      port: chrome.port
    });

    const { DOM, Page, Runtime } = protocol;

    await Promise.all([Page.enable(), Runtime.enable(), DOM.enable()]);

    Page.navigate({ url: 'https://магазиночков.рф' + ctx.request.url });

    ctx.body = await new Promise((resolve) => {

      Page.loadEventFired(async() => {

        const result = await Runtime.evaluate({
          expression: `new Promise((fulfill, reject) => setTimeout(() => fulfill(document.documentElement.outerHTML), 500))`,
          awaitPromise: true
        });

        protocol.close();
        chrome.kill();

        resolve(transform(result.result.value));
      });
    });
  });

  server.listen(5040, () => {
    console.log('server start');
  });
})();