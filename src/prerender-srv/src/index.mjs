import chromeLauncher from 'chrome-launcher';
import CDP from 'chrome-remote-interface';
import file from 'fs';


(async function() {
  async function launchChrome() {
    return await chromeLauncher.launch({
      chromeFlags: [
        '--disable-gpu',
        '--headless'
      ]
    });
  }
  const chrome = await launchChrome();
  const protocol = await CDP({
    port: chrome.port
  });

  const {
    DOM,
    Page,
    Emulation,
    Runtime
  } = protocol;

  await Promise.all([Page.enable(), Runtime.enable(), DOM.enable()]);

  Page.navigate({
    url: 'https://магазиночков.рф/products'
  });

  Page.loadEventFired(async() => {
    const result = await Runtime.evaluate({
      expression: `new Promise((fulfill, reject) => setTimeout(() => fulfill(document.documentElement.outerHTML), 1000))`,
      awaitPromise: true
    });
    console.log(result.result.value)
    // const ss = await Page.getFrameTree({format: 'mhtml', fromSurface: true});
    //
    // console.log(ss);
    //
    file.writeFile('./screenshot.html', result.result.value, 'utf8', function(err) {
      if (err) {
        console.log(err);
      }
    });

    protocol.close();
    chrome.kill();
  });

  // ЗДЕСЬ ВСЕ ПОСЛЕДУЮЩИЕ ПРИМЕРЫ КОДА
})();