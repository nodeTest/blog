
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/u/:user', routes.user);
app.post('/post',routes.post);
app.get('/reg',routes.reg);
app.post('/reg',routes.doReg);
app.get('/login',routes.login);
app.post('/login',routes.doLogin);
app.get('/logout',routes.logout);


/***test**
var zhanghaiyang=require('./routes/zhanghaiyang');
app.get('/zhanghaiyang',zhanghaiyang.test);

var users={
		'zhanghaiyang':{
			age:25,
			sex:'man'
		}
	},
	reg=/\/users\/([^\/]+)\/?/

app.all(reg,function(req,res,next){
	if(users[req.params[0]]){
		next();
	}
	else{
		next(new Error('here has no '+req.params[0]));
	}
})
app.get(reg,function(req,res){
	res.send(JSON.stringify(users[req.params[0]]));
});
app.get(reg,function(req,res,next){
	console.log('end');
});

var test=require('./routes/test');
app.get('/test',test.test);
**test end**/

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
