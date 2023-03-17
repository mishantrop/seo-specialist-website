const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

// const smp = new SpeedMeasurePlugin()

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development'

    const isAnalyzeEnabled = env.ANALYZE === '1'
    const isAnalyzeNeedReport = env.ANALYZENEEDREPORT === '1'
    const analyzerMode = env.ANALYZERMODE || 'json'

    return {
        entry: path.resolve(__dirname, 'assets/src/js/index.ts'),
        target: [ 'web', 'es5' ],
        output: {
            path: path.resolve(__dirname, 'assets'),
            filename: 'index.js',
        },
        resolve: {
            extensions: [ '.js', '.ts' ],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.(css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        // 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 1,
                                modules: false,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin(),
            ...isAnalyzeEnabled
                ? [
                    new BundleAnalyzerPlugin({
                        generateStatsFile: isAnalyzeNeedReport,
                        analyzerMode,
                        openAnalyzer: !isAnalyzeNeedReport,
                        defaultSizes: 'gzip',
                    }),
                ]
                : [],
        ],
        stats: {
            colors: true,
        },
        devtool: isDev ? 'source-map' : undefined,
    }
}
