const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        common: [
            './src/common/svg-load.js',
            'babel-polyfill',
            './src/common/common.js',
            './src/pages/index/index.js',
            './src/pages/directions/directions.js',
            './src/pages/phonon/phonon.js',
            './src/pages/contacts/contacts.js',
            './src/pages/reviews/reviews.js',
            './src/pages/company/company.js',
            './src/pages/cases/cases.js',
            './src/pages/case_total/case_total.js',
            './src/pages/case_gazprom/case_gazprom.js',
            './src/pages/case_cuulong/case_cuulong.js',
            './src/pages/case_petronas/case_petronas.js',
            './src/pages/404/404.js',
            './src/common/common-after.js',
        ]
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].[hash:8].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'css/[name].[hash:8].css',
                        }
                    },
                    'extract-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['link:href', ':src', ':data-end-frame', 'object:data', ':data-icon'],
                            interpolate: true,
                        }
                    },
                    'pug-html-loader',
                ]
            },
            {
                exclude: /\.(js|s?css|pug|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'media/[name].[hash:8].[ext]'
                    }
                }
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: 'image-webpack-loader',
                enforce: 'pre',
            },
            {
                test: /\.svg$/,
                use: [{
                    loader: 'svg-sprite-loader',
                }],
            },
        ]
    },
    resolve: {
        alias: {
            mapael: path.resolve(__dirname, 'node_modules/jquery-mapael'),
            mousewheel: path.resolve(__dirname, 'node_modules/jquery-mousewheel'),
        }
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            title: 'Главная',
            filename: 'index.html',
            template: 'src/pages/index/index.pug',
            chunks: ['common', 'index']
        }),
        new HtmlWebpackPlugin({
            title: 'Услуги',
            filename: 'directions.html',
            template: 'src/pages/directions/directions.pug',
            chunks: ['common', 'directions']
        }),
        new HtmlWebpackPlugin({
            title: 'О компании',
            filename: 'company.html',
            template: 'src/pages/company/company.pug',
            chunks: ['common', 'company']
        }),
        new HtmlWebpackPlugin({
            title: 'Метод фононной диагностики',
            filename: 'phonon.html',
            template: 'src/pages/phonon/phonon.pug',
            chunks: ['common', 'phonon']
        }),
        new HtmlWebpackPlugin({
            title: 'Контакты',
            filename: 'contacts.html',
            template: 'src/pages/contacts/contacts.pug',
            chunks: ['common', 'contacts']
        }),
        new HtmlWebpackPlugin({
            title: 'Отзывы',
            filename: 'reviews.html',
            template: 'src/pages/reviews/reviews.pug',
            chunks: ['common', 'reviews']
        }),
        new HtmlWebpackPlugin({
            title: 'Тотал',
            filename: 'case_total.html',
            template: 'src/pages/case_total/case_total.pug',
            chunks: ['common', 'case_total']
        }),
        new HtmlWebpackPlugin({
            title: 'Газпром',
            filename: 'case_gazprom.html',
            template: 'src/pages/case_gazprom/case_gazprom.pug',
            chunks: ['common', 'case_gazprom']
        }),
        new HtmlWebpackPlugin({
            title: 'Куу лонг',
            filename: 'case_cuulong.html',
            template: 'src/pages/case_cuulong/case_cuulong.pug',
            chunks: ['common', 'case_cuulong']
        }),
        new HtmlWebpackPlugin({
            title: 'Петронас',
            filename: 'case_petronas.html',
            template: 'src/pages/case_petronas/case_petronas.pug',
            chunks: ['common', 'case_petronas']
        }),
        new HtmlWebpackPlugin({
            title: 'Кейсы',
            filename: 'cases.html',
            template: 'src/pages/cases/cases.pug',
            chunks: ['common', 'cases']
        }),
        new HtmlWebpackPlugin({
            title: 'Данная страница не найдена',
            filename: '404.html',
            template: 'src/pages/404/404.pug',
            chunks: ['common', '404']
        }),
    ],
    devServer: {
        host: 'localhost',
        setup(app) {
            app.post('*', (req, res) => {
                res.send('POST res sent from webpack dev server');
            });
        },
    }
};
