const puppeteer = require("puppeteer");
const { screenshot } = require("./config/default");

(async () => {
  // {headless: false} 是否打开浏览器
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto("https://image.baidu.com");
  // 截屏
  await page.screenshot({ path: `${screenshot}/${Date.now()}.png` });

  // 关闭浏览器
  await browser.close();
})();
