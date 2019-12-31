/**
 * bin 执行的文件
 */
const commander = require("commander");
const program = new commander.Command();
const Crawler = require("./mn");

program
  .name("百度图片爬虫")
  .usage("[options] 选项配置")
  .version("0.0.1", "-v, --vers", "打印当前版本")
  .option("-i, --input <keyword>", "输入要搜索的词");

program.parse(process.argv);

let config = {};

if (program.input) {
  console.log(`${program.input}`);
  config = {
    keyword: program.input
  }
}
const crawler = new Crawler(config);
crawler.start();
