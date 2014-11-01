var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session)

var routes = require('./routes/index');
var users = require('./routes/users');
var cards = require('./routes/cards');

var app = express();
var dbUrl = 'mongodb://localhost/reimal';
mongoose.connect(dbUrl);
app.locals.moment = require('moment');

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(express.multipart());
/*app.use(session({
    secret: 'reimal',
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
        url: dbUrl,
        db: 'reimal',
        collection: 'sessions'
    })
}));*/
app.use(express.static(path.join(__dirname, 'public')));
/*app.use(function(req, res, next) {
    app.locals.user = req.session.user;
    console.log(req.session.user);
    next();
});*/

app.use('/', routes);
app.use('/users', users);
app.use('/cards', cards);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var mongoStore = new mongoStore({
    url: dbUrl,
    db: 'reimal',
    collection: 'sessions'
}, function(e) {
    app.use(session({
        secret: 'reimal',
        resave: true,
        saveUninitialized: true,
        store: mongoStore
    }));
    app.use(function(req, res, next) {
        app.locals.user = req.session.user;
        console.log(req.session.user);
        next();
    });
    app.set('port', process.env.PORT || 3000);

    var server = app.listen(app.get('port'), function() {
      debug('Express server listening on port ' + server.address().port);
    });
});

//module.exports = app;
