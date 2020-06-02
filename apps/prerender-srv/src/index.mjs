
import preRender from 'prerender';
import cache from 'prerender-memory-cache';

const server = preRender({
  chromeLocation: "/usr/bin/chromium-browser",
  logRequests: true,
  chromeFlags: [
    "--headless",
    "--disable-gpu",
    "--remote-debugging-port=9222",
    "--hide-scrollbars",
    "--no-sandbox"
  ]
});

server.use(preRender.sendPrerenderHeader());
server.use(preRender.blockResources());
server.use(preRender.removeScriptTags());
server.use(preRender.httpHeaders());
server.use(cache);

server.start();
