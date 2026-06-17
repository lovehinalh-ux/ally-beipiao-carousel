const fs = require('fs');
const path = require('path');
const playwright = require('/Users/leonchen/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');

const htmlPath = path.join(__dirname, 'index.html');
const outDir = path.join(__dirname, 'output');
const url = `file://${htmlPath}`;

(async () => {
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await playwright.chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1200, height: 2000 },
    deviceScaleFactor: 4,
  });
  const page = await context.newPage();

  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(2000);

  const slides = await page.$$('.slide');
  if (slides.length === 0) {
    throw new Error('找不到 .slide 元素');
  }

  for (let i = 0; i < slides.length; i += 1) {
    const filename = `slide-${String(i + 1).padStart(2, '0')}.png`;
    const outPath = path.join(outDir, filename);
    await slides[i].screenshot({ path: outPath });
    const sizeMb = (fs.statSync(outPath).size / 1024 / 1024).toFixed(2);
    console.log(`${filename}: ${sizeMb}MB`);
  }

  await browser.close();
  console.log(`輸出：${outDir}`);
})();
