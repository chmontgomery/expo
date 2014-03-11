var koa = require('koa'),
  common = require('koa-common'),
  http = require('http'),
  //https = require('https'),
  app = koa();

app.use(common.logger());
app.use(common.responseTime());

app.use(function *(){
  this.body = 'Hello World';
});

http.createServer(app.callback()).listen(3000);
//https.createServer(app.callback()).listen(3001);