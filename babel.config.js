const presets = [
    [
        '@babel/env',
        {
            corejs: {
                version: 3,
                proposals: true,
            },
            modules: false,
            useBuiltIns: 'usage',
        },
    ],
    '@babel/preset-typescript',
]

const plugins = [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-dynamic-import',
    [ '@babel/plugin-proposal-class-properties', { loose: true } ],
    [ '@babel/plugin-proposal-export-namespace-from' ],
]

module.exports = {
    // sourceType: 'unambiguous',
    presets,
    plugins,
}
