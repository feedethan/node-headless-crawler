const path = require('path');
const os=require('os');

module.exports = {
    screenshot: path.resolve(__dirname, '../../screenshot'),
    // mn: path.resolve(__dirname, '../../mn'),
    dir: path.join(os.homedir(), 'Desktop/MN'),  // 默认的图片保存目录
    keyword: '狗', // 输入的关键字
}