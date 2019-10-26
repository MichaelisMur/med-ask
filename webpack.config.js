var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './client/index.js',
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: 'index_bundle.js'
    },
    module : {
        rules : [
            {test : /\.(js)$/, use:'babel-loader'},
            {test : /\.css$/, use:['style-loader', 'css-loader']}
        ]
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
            template : './client/index.html'
        })
    ],
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3001",
                pathRewrite: {'^/api' : ''}
            }
        },
        port: 3000,
        historyApiFallback: true
    }
}