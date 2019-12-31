const puppeteer = require("puppeteer");
const conf = require("./config/default");
const srcToImg = require("./helper/srcToImg");

/**
 * 获取百度图片
 */
class Crawler {
  constructor(config) {
    console.log(JSON.stringify(conf));
    this.conf = Object.assign({}, conf, config);
  }

  start() {
    (async () => {
      const browser = await puppeteer.launch({ headless: false });
      // const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setViewport({
        width: 1920,
        height: 2080,
        deviceScaleFactor: 1
      });
      const url = "https://image.baidu.com";
      // const keyword = "狗";
      await page.goto(url);
      console.log(`go to ${url}`);
      // input获取焦点
      await page.focus("#kw");
      // input输入字符
      await page.keyboard.sendCharacter(this.conf.keyword);
      console.log(`输入 ${this.conf.keyword}`);
      // 触发元素点击
      await page.click(".s_search");
      // js加载完以后
      page.on("load", async () => {
        // 创建一个js执行环境 可用page.$$eval获取多个集合  page.$eval 获取单个
        const srcs = await page.evaluate(() => {
          const images = document.querySelectorAll("img.main_img");
          return Array.prototype.map.call(images, img => img.src);
        });
        console.log(`get ${srcs.length} imgs`);
        srcs.forEach(async src => {
          // 降低频率防止反爬虫
          await page.waitFor(1000);
          if (/\.(jpg|png|gif)$/.test(src)) {
            console.log(src, this.conf.mn);
          }

          srcToImg(src, this.conf.mn);
        });
        await browser.close();
      });

      
    })();
  }
}

module.exports = Crawler;

