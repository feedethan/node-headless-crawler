const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { logError, logWarn, logSuc } = require("./log");
const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);
module.exports = async (src, dir) => {
  if (/\.(jpg|png|gif)$/.test(src)) {
    await urlToImg(src, dir);
  } else {
    await base64ToImg(src, dir);
  }
};

/**
 * url => img 通过url获取文件并保存
 * @param {*} url
 * @param {*} dir
 * @param {*} callback
 */
const urlToImg = promisify((url, dir, callback) => {
  const mod = /^http:/.test(url) ? http : https;
  const ext = path.extname(url);
  const file = path.join(dir, `${Date.now()}${ext}`);
  mod.get(url, res => {
    res.pipe(fs.createWriteStream(file)).on("finish", () => {
      callback();
      logSuc(`获取 ${file}`);
    });
  });
});

const base64ToImg = async (base64Str, img) => {
  try {
    const matchs = base64Str.match(/^data:(.+?);base64,(.+)$/);
    const ext = matchs[1].split("/")[1].replace("jpeg", "jpg");
    const file = path.join(dir, `${dir}.${ext}`);
    await writeFile(file, matchs[2], "base64");
  } catch (ex) {
    logWarn("非法base64");
  }
};
