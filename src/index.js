/**
 * bin 执行的文件
 */
const path = require("path");
const os = require("os");
const commander = require("commander");
const program = new commander.Command();
const Crawler = require("./mn");
const pkg = require("../package.json");

const version = pkg.version;
program
  .name("百度图片爬虫")
  .usage("[options] 选项配置")
  .version(version, "-v, --vers", "查看当前版本")
  .option("-i, --input <keyword>", "输入要搜索的词")
  .option("-d, --directory <keyword>", "替换默认的下载目录，相对于根目录");

program.parse(process.argv);

let config = {};

if (program.input) {
  // console.log(`${program.input}`);
  config = {
    ...config,
    keyword: program.input
  }
}
if (program.directory) {
  // console.log(`${program.directory}`);
  config={
    ...config,
    dir: path.join(os.homedir(), `${program.directory}`)
  }
}

const crawler = new Crawler(config);
crawler.start();
