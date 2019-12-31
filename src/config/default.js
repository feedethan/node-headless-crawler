const path = require('path');
const os=require('os');

module.exports = {
    screenshot: path.resolve(__dirname, '../../screenshot'),
    // mn: path.resolve(__dirname, '../../mn'),
    mn: path.join(os.homedir(), 'Desktop/MN'),
    keyword: '狗',
}