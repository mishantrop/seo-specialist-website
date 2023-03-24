module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'standard',
    ],
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },
    rules: {
        'array-bracket-spacing': [ 'error', 'always' ],
        'comma-dangle': [ 'error', 'always-multiline' ],
        'space-before-function-paren': [ 'error', 'never' ],
        semi: [ 1, 'never' ],
        indent: [ 'warn', 4 ],
    },
}
