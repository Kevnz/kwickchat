var express = require('express'),
    exphbs  = require('express3-handlebars'),
    routes = require('./routes'),
    websockets = require('./websockets'),
    http = require('http'),
    path = require('path'),
    expstate = require('express-state'),
    app = express(),
    authRoutes = require('./routes/auth'),
    Primus = require('primus');

expstate.extend(app);

app.configure(function(){
    app.set('port', process.env.PORT || 3456);
    app.set('views', __dirname + '/views'); 
    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
    app.locals.pretty = true;
});

app.get('/', routes.index);

authRoutes.routes(app);

var server = http.createServer(app), 
    primus = new Primus(server,  { transformer: 'engine.io' });

websockets.init(primus);

server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port') + " in " + app.get('env') +" mode");
});