var koa = require('koa'),
  common = require('koa-common'),
  http = require('http'),
  //https = require('https'),
  route = require('koa-route'), // todo koa-router?
  render = require('./lib/render'),
  serve = require('koa-static'),
  app = koa();

app.use(common.logger());
app.use(common.responseTime());

app.use(serve('bower_components'));

app.use(route.get('/', home));
app.use(route.get('/calendar', calendar));

function *home() {
  this.body = yield render('index', {});
}

function *calendar() {
  this.body = yield render('calendar', {});
}

app.use(function *(){
  this.body = 'Hello World';
});

http.createServer(app.callback()).listen(3000);
//https.createServer(app.callback()).listen(3001);
console.log('listening on port 3000');