const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const modes = {
    development: 'development',
    production: 'production'
}

module.exports = {
    mode: modes.production,
    entry: './src/index.js',
    devtool: 'source-map',
    stats: {
        warnings: false,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules', './src'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'build'),
            watch: true
        },
        client: {
            overlay: {
                errors: true,
                warnings: false,
                runtimeErrors: true,
            },
        },
        proxy: {
            '/api': {
                target: 'https://jsonplaceholder.typicode.com/',
                pathRewrite: { '^/api': '' },
                secure: false,
                changeOrigin: true
            }
        },
        liveReload: true,
        historyApiFallback: true,
        port: 3000,
        host: '0.0.0.0',
    },
    output: {
        filename: path.join('[contenthash].js'),
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join('public', 'index.html'),
            favicon: path.join('public', 'favicon.ico'),
            filename: 'index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public', 'robots.txt'),
                    to: 'robots.txt',
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.(js)$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: path.join('media', '[name][ext]'),
                }
            }
        ]
    }
};
