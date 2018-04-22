/**
 * @file 基础环境编译配置
 * @author {{ author }}
 */
'use strict';
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            {{#if_eq build "standalone"}}
            'vue$': 'vue/dist/vue.esm.js',
            {{/if_eq}}
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {{#lint}}
            ...(config.dev.useEslint ? [{
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')],
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    emitWarning: !config.dev.showEslintErrorsInOverlay
                }
            }] : []),
            {{/lint}}
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    resolve('src'),
                    resolve('test'),
                    resolve('node_modules/@baidu/lego-events-base'),
                    resolve('node_modules/@baidu/lego-events-zhishu'),
                    resolve('node_modules/@baidu/lego-events-box'),
                    resolve('node_modules/@baidu/lego-events-map')
                ]
            },
            {
                test: /node_modules\/zepto/,
                oneOf: [
                    {
                        test: /deferred/,
                        /* eslint-disable */
                        loader: 'imports-loader?this=>window,define=>false,$.Callbacks=zepto/src/callbacks!exports-loader?window.Zepto'
                        /* eslint-enable */
                    },
                    {
                        test: /.*/,
                        loader: 'imports-loader?this=>window,define=>false!exports-loader?window.Zepto'
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 2000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
};
