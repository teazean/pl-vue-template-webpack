/**
 * @file 测试编译环境
 * @author {{ author }}
 */
'use strict';
const merge = require('webpack-merge');
const devEnv = require('./dev.env');

module.exports = merge(devEnv, {
    NODE_ENV: '"production"',
    BUILD_ENV: '"qa"'
});
