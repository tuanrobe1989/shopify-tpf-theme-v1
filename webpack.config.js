const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MediaQueryPlugin = require('media-query-plugin');
const BUILD_DIR = path.resolve(__dirname, './assets');
const IMG_DIR = path.resolve(__dirname, './assets/images');

let mode = "development";
let target = "web";
const output = {
    path: BUILD_DIR,
    filename: '[name].js',
    // assetModuleFilename: 'aaaaaaaaaaa/[name][ext][query]'
};
const entry = {
    scripts: './src/scripts.js',
    // cover_iframe: './src/cover_iframe.js',
};
let plugins = [
    new webpack.ProvidePlugin(
        {$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'}
    ),
    new MiniCssExtractPlugin(
        {filename: 'styles.css'}
    ),
    // new MediaQueryPlugin(
    //     {
    //         include: ['index','styles'],
    //         queries: {
    //             '(min-width: 992px)': 'desktop',
    //             '(min-width: 768px)': 'tablet'
    //         }
    //     }
    // ),
    // new BrowserSyncPlugin(
    //     {
    //         // host: 'motor-sport-outlet.myshopify.com',
    //         // proxy: 'localhost',
    //         // port: 9999,
    //         server: {
    //             baseDir: ['./dist']
    //         },
    //         // https: true,
    //         injectChanges: true,
    //         open: 'external',
    //         files: [
    //             "./**/**/*.css", "./**/**/*.js", {
    //                 match: [
    //                     "./**/**/*.html", "./**/**/*.php"
    //                 ],
    //                 // fn:    function (event, file) {
    //                 //     /** Custom event handler **/
    //                 // }
    //             }
    //         ]

    //     },
    //     {reload: false}
    // )
];

if (process.env.NODE_ENV === "production") {
    mode = "production";
    // target = "brwoserslist"
}
module.exports = [{
        mode: mode,
        output: output,
        entry: entry,
        devtool: "source-map",
        target: target,
        resolve: {
            alias: {
                'images': IMG_DIR
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"

                    }
                },
                {
                    test: /\.(s[ac]|c)ss*/i,
                    use: [
                        MiniCssExtractPlugin.loader, 'css-loader',
                        // MediaQueryPlugin.loader,
                        'postcss-loader',
                        'sass-loader',
                    ]
                },
                {
                    test: /\.(gif|jpg|jpeg|png)$/,
                    loader: 'file-loader',
                    // options: {
                    //     outputPath: './'
                    // },
                    // type: 'asset/resource',
                    generator: {
                        filename: '[name][ext][query]'
                    }
                },
                // {
                //     test: /\.html$/i,
                //     loader: "html-loader",
                //     options: {
                //         sources: {
                //             list: [
                //                 { // Attribute name
                //                     attribute: "src",
                //                     // Type of processing, can be `src` or `scrset`
                //                     type: "src",
                //                     // Allow to filter some attributes (optional)
                //                     filter: (tag, attribute, attributes, resourcePath) => {
                //                         // The `tag` argument contains a name of the HTML tag.
                //                         // The `attribute` argument contains a name of the HTML attribute.
                //                         // The `attributes` argument contains all attributes of the tag.
                //                         // The `resourcePath` argument contains a path to the loaded HTML file.

                //                         // choose all HTML tags except img tag
                //                         return tag.toLowerCase() !== "img";
                //                     }
                //                 },
                //             ]
                //         }
                //     }
                // },
                // {
                //     test: /\.(png|svg)$/,
                //     type: 'asset/inline'
                // },
            ]
        },

        plugins: plugins,

        externals: {
            jquery: 'jQuery'
        }

    },]
