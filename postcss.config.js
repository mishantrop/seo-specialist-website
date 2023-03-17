module.exports = () => ({
    plugins: {
        'postcss-import': {},
        'postcss-custom-properties': { preserve: false },
        'postcss-custom-media': {},
        'postcss-mixins': {},
        'postcss-nested': {},
        autoprefixer: {},
    },
})
