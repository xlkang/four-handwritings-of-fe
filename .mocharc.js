module.exports = {
    package: './package.json',
    timeout: 2000,
    slow: 100,
    require: '@babel/register',
    'watch-files': ['test/*.test.js'],
    recursive: true
}