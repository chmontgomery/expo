var koa = require('koa'),
  common = require('koa-common'),
  http = require('http'),
  //https = require('https'),
  route = require('koa-route'), // todo koa-router?
  render = require(__dirname + '/src/lib/render'),
  serve = require('koa-static'),
  path = require('path'),
  app = koa();

app.use(common.logger());
app.use(common.responseTime());

app.use(serve(path.join(__dirname, '/dist')));

app.use(route.get('/', home));

function *home() {
  this.body = yield render('index', {});
}

http.createServer(app.callback()).listen(3000);
//https.createServer(app.callback()).listen(3001);
console.log('listening on port 3000');