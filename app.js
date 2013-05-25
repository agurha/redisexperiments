/**
 * Created with JetBrains WebStorm.
 * User: agurha
 * Date: 24/05/2013
 * Time: 15:35
 * To change this template use File | Settings | File Templates.
 */

var express = require('express')
  , http = require('http')
  , passport = require('passport')
  , config = require('config')
  , redis = require('redis')
  , RedisStore = require('connect-redis')(express);


// Create a redis client
var redisClient = exports.redisClient = redis.createClient(config.redis.port, config.redis.hostname);

var sessionStore = exports.sessionStore = new RedisStore({client: redisClient});

var app = exports.app = express();

app.configure(function(){

  app.set('port', process.env.PORT || config.node.Port || 3000);
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.cookieParser(config.session.secret));
  app.use(express.session({
    key: 'agurha',
    sessionStore: sessionStore

  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);

});

require('./routes');

exports.server = http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server started on port %d', app.get('port'));
});

process.on('uncaughtException', function(err){
  console.log('Exception: ' + err.stack);
});