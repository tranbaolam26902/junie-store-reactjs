module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'prettier'
    ],
    ignorePatterns: ['.eslintrc.js'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react-refresh', 'prettier'],
    rules: {
        'prettier/prettier': ['error', { trailingComma: 'none', endOfLine: 'auto' }]
    }
};
