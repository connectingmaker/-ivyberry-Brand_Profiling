var i18n = require("i18n");

i18n.configure({
    locales: ['en', 'ko', 'ch'],
    directory: __dirname + '/locales',
    defaultLocale: 'ko',
    cookie : 'lang'
});


module.exports = function(req, res, next) {
    i18n.init(req, res);
    res.locales.__ = res.__;

}