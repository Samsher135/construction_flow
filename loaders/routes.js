module.exports = function (app) {

    const helmet = require('helmet');
    const cors = require('cors');
    const error = require('../middleware/error');

    app.use(cors());
    app.use(helmet());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    //// Sets "X-Frame-Options: DENY".
    app.use(helmet.frameguard({
        action: 'deny'
    }))

    //// hides the x-powerd-by
    app.use(helmet.hidePoweredBy())


    var index = require('../routes/index')
    var user = require('../routes/user')
    var tendor = require('../routes/tendor')

    // var user = require('../routes/order')
    var product = require('../routes/product')
    // var user = require('../routes/productspage');
    // var vendor=require('../routes/vendor')
    app.use('/product', product);

    app.use('/', index);
    app.use('/user', user);
    app.use('/tendor', tendor);
    // app.use('/order', order);
    // app.use('/productspage',productspage);
    // app.use('/user', vendor);

    app.use(error);

    app.get('*', function (req, res) {
        res.redirect('/');
        return;
    });


    return app;
}