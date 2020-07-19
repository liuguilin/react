const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 自动清除沉余js
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 自动生成 html 插件
const OpenBrowserPlugin = require("open-browser-webpack-plugin");

const webpack = require("webpack");

const ROOT_PATH = path.resolve(__dirname);
const ENTRY_PATH = path.resolve(ROOT_PATH, "app");

module.exports = {
    entry: {
        index: [
            "react-hot-loader/patch",
            "webpack-hot-middleware/client",
            "@babel/polyfill",
            path.resolve(ENTRY_PATH, "index.jsx"),
        ],
        vendor: ["react", "react-dom", "react-router-dom"],
    },
    output: {
        filename: "bundle.[hash].js", // 默认为main.js  [hash]是为了避免js缓存
        path: path.resolve(__dirname, "./dist"), // path为绝对路径，用node path模块转化
    },
    mode: "development", // 开发模式, 生产模式 'production' 会压缩代码
    module: {
        // 加载 css less
        rules: [{
                test: /\.css$/, // js 中 require css
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.less$/,
                // 注意顺序
                use: ["style-loader", "css-loader", "less-loader"],
            },
            {
                test: /(\.jsx|\.js)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            // es6 内置函数转换
                            "@babel/plugin-transform-runtime",
                        ],
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif|m4a)$/, // 加载js img 对象、css 中的图片、音频等资源
                use: [{
                    loader: "url-loader",
                    options: {
                        //图片大小小于等于limit值，则会以base64形式加载，不会发请求，大于这个值则用file-loader加载
                        limit: 200 * 1024,
                    },
                }, ],
            },
            {
                test: /\.html$/, // 加载 img 标签中的图片
                use: [{
                    loader: "html-withimg-loader",
                    options: {},
                }, ],
            },
        ],
    },
    devtool: "inline-source-map", // 加上对应的配置

    plugins: [
        // 存放插件
        new HtmlWebpackPlugin({
            template: "./app/index.html", // 模板
            filename: "index.html", // 默认也是index.html
            minify: {
                removeAttributeQuotes: true, // 删除标签属性的双引号
                collapseInlineTagWhitespace: true, // 删除多余空格
            },
            hash: true, // 增加hash，避免缓存
        }),
        new webpack.NoEmitOnErrorsPlugin(), //保证出错时页面不阻塞，且会在编译结束后报错
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({
            url: "http://localhost:3000",
        }),
    ],

    resolve: {
        extensions: [".js", ".json", ".sass", ".scss", ".less", "jsx"],
    },
};